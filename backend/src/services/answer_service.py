"""
Answer Service - LLM Instance 1
Handles question answering using profile and GitHub tools
"""
from google import genai
from google.genai import types
import os
import json
from pathlib import Path
from typing import List, Tuple, Dict, Any
from src.tools.profile_tools import get_sriharsha_profile, PROFILE_TOOL_DECLARATION
from src.tools.github_tools import (
    get_github_profile,
    get_github_repositories,
    get_github_stats,
    search_github_repositories,
    GITHUB_TOOL_DECLARATIONS
)


class AnswerService:
    """Service for answering user questions about Sriharsha's portfolio"""
    
    def __init__(self):
        self.model_name = 'gemini-2.0-flash'
        self.client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
        
        # Load system prompt
        base_dir = Path(__file__).resolve().parent.parent
        prompts_file = base_dir / "prompts" / "system_prompts.json"
        
        with open(prompts_file, 'r', encoding='utf-8') as f:
            prompts = json.load(f)
        
        self.system_prompt = prompts.get('system_prompt', 'You are a helpful AI assistant.')
        
        # Tool mapping for execution
        self.tool_functions = {
            "get_sriharsha_profile": get_sriharsha_profile,
            "get_github_profile": get_github_profile,
            "get_github_repositories": get_github_repositories,
            "get_github_stats": get_github_stats,
            "search_github_repositories": search_github_repositories,
        }
        
        # Configure tools (profile and GitHub only - NO navigation)
        self.tools = types.Tool(function_declarations=[
            PROFILE_TOOL_DECLARATION,
            *GITHUB_TOOL_DECLARATIONS
        ])
        
        self.config = types.GenerateContentConfig(
            temperature=0.7,
            top_p=0.95,
            top_k=40,
            max_output_tokens=2048,
            system_instruction=self.system_prompt,
            tools=[self.tools],
        )
    
    async def get_response(
        self, 
        user_message: str, 
        conversation_history: List[dict]
    ) -> Tuple[str, List[str]]:
        """
        Get answer response for user query
        
        Args:
            user_message: Current user message
            conversation_history: Previous conversation exchanges
            
        Returns:
            Tuple of (response_text, tools_used)
        """
        try:
            # Build conversation history
            contents = []
            for msg in conversation_history[-3:]:  # Last 3 exchanges
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
            
            # Add current message
            contents.append(
                types.Content(role="user", parts=[types.Part(text=user_message)])
            )
            
            tools_used = []
            max_iterations = 5
            iteration = 0
            
            # Tool calling loop
            while iteration < max_iterations:
                iteration += 1
                
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=contents,
                    config=self.config
                )
                
                if response.candidates and response.candidates[0].content.parts:
                    first_part = response.candidates[0].content.parts[0]
                    
                    if first_part.function_call:
                        function_call = first_part.function_call
                        function_name = function_call.name
                        function_args = dict(function_call.args) if function_call.args else {}
                        
                        tools_used.append(function_name)
                        
                        if function_name in self.tool_functions:
                            try:
                                # Execute tool function
                                function_response = await self.tool_functions[function_name](**function_args)
                                response_data = json.loads(json.dumps(function_response, default=str))
                                
                                # Append model's response with function call
                                contents.append(response.candidates[0].content)
                                
                                # Append function response
                                function_response_part = types.Part.from_function_response(
                                    name=function_name,
                                    response={"result": response_data}
                                )
                                
                                contents.append(
                                    types.Content(role="user", parts=[function_response_part])
                                )
                                
                            except Exception as e:
                                # Handle function execution error
                                contents.append(response.candidates[0].content)
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
                        # Got final text response
                        return (response.text, tools_used)
                else:
                    break
            
            # Max iterations reached
            return (
                "I apologize, but I'm having trouble processing your request. Please try rephrasing your question.",
                tools_used
            )
            
        except Exception as e:
            return (f"Error getting response: {str(e)}", [])
