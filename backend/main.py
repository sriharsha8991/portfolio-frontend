"""
FastAPI Backend for Portfolio Chat with Gemini AI
Provides intelligent responses about Sriharsha Velicheti's professional background
Uses Google GenAI SDK (latest standards as per Google's migration guide)
"""

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from google import genai
from google.genai import types
import os
from pathlib import Path
from datetime import datetime
# Initialize FastAPI app
app = FastAPI(
    title="Portfolio Chat API",
    description="AI-powered chat assistant for Sriharsha Velicheti's portfolio",
    version="2.0.0"
)

# CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google GenAI Client (uses GEMINI_API_KEY or GOOGLE_API_KEY env var)
# The new SDK automatically picks up the API key from environment variables
client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

# Model configuration
MODEL_NAME = 'gemini-2.5-flash'  # Using latest Gemini 2.5 model

# System prompt for the AI assistant
SYSTEM_PROMPT = """You are an intelligent AI assistant for Sriharsha Velicheti's professional portfolio. 

Your role is to:
1. Answer questions ONLY about Sriharsha Velicheti's professional career, skills, experience, education, and projects
2. Use ONLY the information provided in the resume image attached
3. Be professional, friendly, and concise
4. If asked about topics outside of Sriharsha's professional background, politely redirect: "I'm here to help you learn about Sriharsha's professional background. Please ask me about his experience, skills, projects, or education."
5. Never make up information - only use facts from the resume
6. Be enthusiastic about his achievements but factual
7. If information is not in the resume, say: "That specific information isn't available in the resume, but I can tell you about [related topic]."

Key Information Context:
- Name: Sriharsha Velicheti
- Current Role: Generative AI Engineer at DatasmithAI
- Specialization: RAG (Retrieval-Augmented Generation) and LLM orchestration
- Education: Bachelor of Technologies CSE (Data Science) from Jain University, Bengaluru (CGPA: 8.756)
- Experience: 2+ years in AI/ML
- Key Skills: Python, FastAPI, LangChain, RAG, LLM integrations, Azure Cloud, Docker
- Current Project: TenderGenie - Document Intelligence Application
- Previous: Research Intern at Siemens (Multimodel RAG application)

Remember: Stay professional, factual, and helpful. Only discuss Sriharsha's professional career."""

# Load resume image
RESUME_IMAGE_PATH = Path("../images/profile.png")  # We'll use the resume image

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    response: str
    timestamp: str

def load_resume_image():
    """
    Load resume image if needed for multimodal capabilities
    Note: The new SDK supports PIL.Image objects directly
    """
    try:
        possible_paths = [
            Path("../docs/Sriharsha Resume (13).pdf"),
            Path("../images/resume.jpg"),
            Path("../images/resume.png"),
            Path("docs/Sriharsha Resume (13).pdf"),
        ]
        
        # For now, we'll use text context
        # In future, can upload images using: client.files.upload(file='path')
        return None
    except Exception as e:
        print(f"Error loading resume image: {e}")
        return None

def create_resume_context():
    """Create a detailed text context from the resume"""
    return """
    SRIHARSHA VELICHETI (GEN AI ENGINEER)
    Email: srih8991@gmail.com | GitHub: github.com/sriharsha8991 | LinkedIn: linkedin.com/in/sriharsha-velicheti | Phone: +91 8309012139

    SUMMARY:
    Generative AI Engineer with expertise in Retrieval-Augmented Generation (RAG) and LLM orchestration, skilled in developing scalable AI assistants that extract contextual insights from unstructured data. Proficient in LangChain, Gemini AI, and cloud platforms like Azure and GCP, with a strong focus on building production-grade, efficient AI solutions. Passionate about leveraging Generative AI to solve real-world challenges in finance and manufacturing.

    SKILLS:
    - Python, FastAPI development
    - LLM integrations (Gemini, OpenAI, HuggingFace)
    - Docker (CI/CD pipelines)
    - Azure Cloud Services, Azure DevOps

    PROFESSIONAL EXPERIENCE:

    1. TenderGenie (Document Intelligence Application) | @DatasmithAI | Nov 2024 - Present
       - Overcame the challenge of manually reviewing lengthy manufacturing tenders, decreasing reading time by 10x
       - Developed and deployed retrieval-based RAG conversational assistant with document summarization, keyword extraction, and complex datasheet extraction
       - Achieved custom evaluation accuracy of 89.77%
       - Lightning-fast keyword extraction in under 10 seconds using Aho-Corasick Engine (100x efficiency improvement)
       - Tech Stack: Python, Docker, Gemini AI, Qdrant, FastAPI, Azure services

    2. Multimodel RAG Application | Research Intern @ Siemens | Jan 2024 - May 2024
       - Conducted comprehensive research on end-to-end RAG architectures
       - PDF ingestion, structured data extraction, schema-aware parsing, workflow automation
       - Executed multi-LLM response generation and benchmarking
       - Incorporated integrated PID diagrams into knowledge graphs using Graph-RAG concepts
       - Tech Stack: Python, poetry, RAGAS, SQL, pypdf2 parsers

    PERSONAL PROJECTS (POC):

    1. Resume Filtering System for HR
       - AI-powered resume management system
       - Automated filtering, ranking, and classification through agentic classification
       - NLP-based candidate analysis with skill extraction and technical proficiency scoring
       - Interactive visualizations using Plotly and Matplotlib
       - LLM as judge for assessing strengths and weaknesses

    2. Additional Projects
       - AI-driven interview question generation, market salary analysis
       - Accessibility features
       - Modular Streamlit application using Python, spaCy, scikit-learn, PyPDF2, Qdrant, Groq AI

    EDUCATION:
    - Jain University, Bengaluru | Bachelor's degree
    - Bachelor of Technologies CSE (Data Science) - CGPA 8.756
    - Period: Aug 2020 - June 2024
    - Honors in Data Science (specialization)

    ACCOMPLISHMENTS:
    - TenderGenie Product Deployed: 3 business clients in less than a year at DatasmithAI
    - Secured 3 bronze medals in Kaggle as a contributor
    - Secured 6th individual position out of 159 participants in MACHINE HACK hackathon with 92.6% accuracy (during college)
    - Successful Workshop on Generative AI at I2IT Pune College, representing DatasmithAI
    - President of Data Science Student Club (10 months)
    - Data Science Facilitator at Google Developer Student Club for a year, mentored over 100 students in AI/DS/ML
    - NPTEL certification on Python for Data Science with 69% score from IIT
    """

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "active",
        "service": "Portfolio Chat API",
        "version": "1.0.0",
        "description": "AI-powered chat about Sriharsha Velicheti's professional background"
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint - processes user messages and returns AI responses
    Uses Google GenAI SDK with centralized client pattern
    """
    try:
        # Get resume context
        resume_context = create_resume_context()
        
        # Build conversation context
        conversation = []
        for msg in request.conversation_history[-5:]:  # Keep last 5 messages for context
            conversation.append(f"User: {msg.get('user', '')}")
            conversation.append(f"Assistant: {msg.get('assistant', '')}")
        
        # Create the full prompt
        full_prompt = f"""{SYSTEM_PROMPT}

RESUME CONTENT:
{resume_context}

CONVERSATION HISTORY:
{chr(10).join(conversation) if conversation else 'No previous conversation'}

USER QUESTION: {request.message}

Provide a helpful, professional response based ONLY on the resume information above. If the question is off-topic, politely redirect."""

        # Generate response using new GenAI SDK
        # client.models.generate_content() is the new standard method
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=full_prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                top_p=0.95,
                top_k=40,
                max_output_tokens=1024,
            )
        )
        
        return ChatResponse(
            response=response.text,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    """
    WebSocket endpoint for real-time chat
    Uses Google GenAI SDK with streaming support
    """
    await websocket.accept()
    
    try:
        resume_context = create_resume_context()
        conversation_history = []
        
        # Send welcome message
        await websocket.send_json({
            "type": "welcome",
            "message": "Hi! I'm Sriharsha's AI assistant. Ask me anything about his professional experience, skills, projects, or education!"
        })
        
        while True:
            # Receive message from client
            data = await websocket.receive_json()
            user_message = data.get("message", "")
            
            if not user_message:
                continue
            
            # Build conversation context
            recent_history = conversation_history[-5:]
            conversation_text = "\n".join([
                f"User: {msg['user']}\nAssistant: {msg['assistant']}" 
                for msg in recent_history
            ])
            
            # Create prompt
            full_prompt = f"""{SYSTEM_PROMPT}

RESUME CONTENT:
{resume_context}

CONVERSATION HISTORY:
{conversation_text if conversation_text else 'No previous conversation'}

USER QUESTION: {user_message}

Provide a helpful, professional response."""

            # Generate response using new GenAI SDK
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=full_prompt,
                config=types.GenerateContentConfig(
                    temperature=0.7,
                    top_p=0.95,
                    top_k=40,
                    max_output_tokens=1024,
                )
            )
            
            # Store in history
            conversation_history.append({
                "user": user_message,
                "assistant": response.text
            })
            
            # Send response back to client
            await websocket.send_json({
                "type": "message",
                "response": response.text
            })
            
    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        await websocket.send_json({
            "type": "error",
            "message": f"An error occurred: {str(e)}"
        })

@app.get("/api/resume-summary")
async def get_resume_summary():
    """
    Returns a summary of Sriharsha's background
    """
    return {
        "name": "Sriharsha Velicheti",
        "role": "Gen AI Engineer",
        "company": "DatasmithAI",
        "specialization": "RAG and LLM Orchestration",
        "experience_years": "2+",
        "education": "B.Tech CSE (Data Science) - CGPA 8.756",
        "key_skills": [
            "Python", "FastAPI", "LangChain", "RAG", "LLM Integration",
            "Gemini AI", "OpenAI", "Azure Cloud", "Docker", "Qdrant"
        ],
        "current_project": "TenderGenie - Document Intelligence Application",
        "achievements": [
            "3 Kaggle Bronze Medals",
            "6th rank in MACHINE HACK (92.6% accuracy)",
            "Deployed TenderGenie to 3 business clients",
            "Mentored 100+ students in AI/ML"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
