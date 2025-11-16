"""
Chat API - Dual LLM endpoint using separate services (Sequential Execution)
LLM Instance 1 (NavigationService): Determines navigation first (fast decision)
LLM Instance 2 (AnswerService): Answers questions with tools (detailed response)
Calls are sequential: Navigation → Answer
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from src.services import AnswerService, NavigationService

router = APIRouter(prefix="/api", tags=["chat"])

# Initialize both services (each with their own LLM instance, prompts, and tools)
answer_service = AnswerService()
navigation_service = NavigationService()


# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = []


class ChatResponse(BaseModel):
    response: str
    timestamp: str = datetime.now().isoformat()
    tools_used: Optional[List[str]] = []
    actions: Optional[List[Dict[str, Any]]] = []


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Dual LLM Chat Endpoint - Sequential Execution
    
    Architecture:
    ┌─────────────────────────────────────────────────────────┐
    │                    Chat Request                          │
    │               "Show me your projects"                    │
    └────────────────┬────────────────────────────────────────┘
                     │
                     │ Step 1: Navigation Decision (Fast)
                     ▼
            ┌─────────────────┐
            │     LLM #1      │
            │  Navigation     │
            │   Service       │
            │                 │
            │ Tools:          │
            │ - nav_home      │
            │ - nav_about     │
            │ - nav_projects  │
            │ - nav_skills    │
            │ - ...etc        │
            └────────┬────────┘
                     │
                     │ Navigation Action
                     │ (section_id determined)
                     ▼
                     │ Step 2: Answer Question (Detailed)
                     ▼
            ┌─────────────────┐
            │     LLM #2      │
            │    Answer       │
            │    Service      │
            │                 │
            │ Tools:          │
            │ - Profile       │
            │ - GitHub        │
            │ - Repositories  │
            │ - Stats         │
            └────────┬────────┘
                     │
                     │ Answer Text + Tools Used
                     ▼
            ┌────────────────┐
            │   Combined     │
            │  ChatResponse  │
            │                │
            │ - response     │
            │ - tools_used   │
            │ - actions      │
            └────────────────┘
    
    Sequential Flow:
    User: "Show me your Python projects"
    
    1. NavigationService (LLM #1) - Called FIRST:
       - Quick decision: "projects" keyword detected
       - Calls navigate_to_projects()
       - Returns: [{type: "navigate", section_id: "projects"}]
       - ⏱️ ~500ms
    
    2. AnswerService (LLM #2) - Called SECOND:
       - Detailed answer: Searches GitHub repos
       - Calls search_github_repositories("Python")
       - Returns: "Sriharsha has several Python projects including..."
       - Tools Used: ["search_github_repositories"]
       - ⏱️ ~2-3s
    
    3. Combined Response:
       - Frontend receives navigation action FIRST (can start scrolling)
       - Then receives full answer (displays in chat)
       - User sees smooth navigation + detailed information
    
    Benefits of Sequential:
    - Navigation happens immediately (faster UX)
    - Answer service can take its time with complex queries
    - Clear execution order for debugging
    - Frontend can show "Navigating to..." indicator first
    """
    try:
        # Step 1: Get navigation decision FIRST (fast)
        actions = await navigation_service.get_navigation_decision(
            user_message=request.message
        )
        print(f"Navigation Actions: {actions}")
        # Step 2: Get detailed answer SECOND (may take longer)
        answer_text, tools_used = await answer_service.get_response(
            user_message=request.message,
            conversation_history=request.conversation_history
        )
        
        return ChatResponse(
            response=answer_text,
            tools_used=tools_used if tools_used else None,
            actions=actions if actions else None
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")
