"""
FastAPI Backend for Portfolio Chat with Gemini AI
Minimal structure with only chat endpoint
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.chat import router as chat_router
from src.api.github import router as github_router

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio Chat API",
    description="AI-powered chat assistant for Sriharsha Velicheti's portfolio",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router)
app.include_router(github_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
