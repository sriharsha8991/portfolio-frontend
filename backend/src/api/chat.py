"""
Chat API - Single endpoint for portfolio assistant with Gemini Tool Calling
"""
from fastapi import APIRouter, HTTPException
from google import genai
from google.genai import types
import os
import json
from pathlib import Path
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from src.tools import TOOLS, TOOL_FUNCTIONS

router = APIRouter(prefix="/api", tags=["chat"])

# Configuration
MODEL_NAME = 'gemini-2.5-flash'
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize Gemini client
client = genai.Client(api_key=GOOGLE_API_KEY)

# Load prompts
BASE_DIR = Path(__file__).resolve().parent.parent
PROMPTS_FILE = BASE_DIR / "prompts" / "system_prompts.json"

with open(PROMPTS_FILE, 'r', encoding='utf-8') as f:
    PROMPTS = json.load(f)


# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = []


class ChatResponse(BaseModel):
    response: str
    timestamp: str = datetime.now().isoformat()
    tools_used: Optional[List[str]] = []


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint with Gemini Tool Calling - Send a message and get AI response
    """
    try:
        # Build conversation history using proper types.Content format
        contents = []
        for msg in request.conversation_history[-3:]:  # Last 3 exchanges to avoid context overflow
            user_msg = msg.get('user') or msg.get('message')
            assistant_msg = msg.get('assistant') or msg.get('response')
            
            if user_msg:
                contents.append(
                    types.Content(role="user", parts=[types.Part(text=str(user_msg))])
                )
            if assistant_msg:
                contents.append(
                    types.Content(role="model", parts=[types.Part(text=str(assistant_msg))])
                )
        
        # Load system instruction from JSON file
        system_instruction = PROMPTS.get('system_prompt', 'You are a helpful AI assistant.')
        
        # Add current user message
        contents.append(
            types.Content(role="user", parts=[types.Part(text=request.message)])
        )
        
        # Configure tools properly
        tools = types.Tool(function_declarations=TOOLS[0]["function_declarations"])
        config = types.GenerateContentConfig(
            temperature=0.7,
            top_p=0.95,
            top_k=40,
            max_output_tokens=2048,
            system_instruction=system_instruction,
            tools=[tools],
        )
        
        # Track which tools were used
        tools_used = []
        max_iterations = 5  # Prevent infinite loops
        iteration = 0
        
        while iteration < max_iterations:
            iteration += 1
            
            # Generate response with tools
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=contents,
                config=config
            )
            
            # Check if model wants to use tools
            if response.candidates and response.candidates[0].content.parts:
                first_part = response.candidates[0].content.parts[0]
                
                if first_part.function_call:
                    function_call = first_part.function_call
                    function_name = function_call.name
                    function_args = dict(function_call.args) if function_call.args else {}
                    
                    # Track tool usage
                    tools_used.append(function_name)
                    
                    # Execute the function
                    if function_name in TOOL_FUNCTIONS:
                        try:
                            function_response = await TOOL_FUNCTIONS[function_name](**function_args)
                            
                            # Serialize the response to ensure it's JSON-compatible
                            response_data = json.loads(json.dumps(function_response, default=str))
                            
                            # Append the model's response (with function call)
                            contents.append(response.candidates[0].content)
                            
                            # Create function response using proper types
                            function_response_part = types.Part.from_function_response(
                                name=function_name,
                                response={"result": response_data}
                            )
                            
                            # Append function response
                            contents.append(
                                types.Content(role="user", parts=[function_response_part])
                            )
                            
                        except Exception as e:
                            # Handle function execution error
                            contents.append(response.candidates[0].content)
                            
                            # Create error response
                            error_response_part = types.Part.from_function_response(
                                name=function_name,
                                response={"error": str(e)}
                            )
                            
                            contents.append(
                                types.Content(role="user", parts=[error_response_part])
                            )
                    else:
                        # Function not found
                        contents.append(response.candidates[0].content)
                        
                        error_response_part = types.Part.from_function_response(
                            name=function_name,
                            response={"error": "Function not found"}
                        )
                        
                        contents.append(
                            types.Content(role="user", parts=[error_response_part])
                        )
                else:
                    # Model provided a text response - we're done
                    final_response = response.text
                    return ChatResponse(
                        response=final_response,
                        tools_used=tools_used if tools_used else None
                    )
            else:
                # No valid response
                break
        
        # If we hit max iterations or no valid response, return error message
        return ChatResponse(
            response="I apologize, but I'm having trouble processing your request. Please try rephrasing your question.",
            tools_used=tools_used if tools_used else None
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
