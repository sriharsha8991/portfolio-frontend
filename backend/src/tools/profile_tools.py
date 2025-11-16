"""
Profile Tools - Tools for accessing Sriharsha's professional profile
"""
import json
from pathlib import Path
from typing import Dict, Any

# Load resume data once at module level
BASE_DIR = Path(__file__).resolve().parent.parent
RESUME_FILE = BASE_DIR / "prompts" / "resume_context.json"

with open(RESUME_FILE, 'r', encoding='utf-8') as f:
    RESUME_DATA = json.load(f)


async def get_sriharsha_profile() -> Dict[str, Any]:
    """
    Get Sriharsha Velicheti's complete professional profile including personal info,
    summary, skills, experience, projects, education, and accomplishments.
    
    Returns:
        Complete professional profile data
    """
    return RESUME_DATA


# Tool declaration for Gemini
PROFILE_TOOL_DECLARATION = {
    "name": "get_sriharsha_profile",
    "description": "Get Sriharsha Velicheti's complete professional profile including personal information, professional summary, skills, work experience, projects, education, and accomplishments. Use this tool when users ask about Sriharsha's background, experience, skills, or career.",
    "parameters": {
        "type": "object",
        "properties": {},
        "required": []
    }
}
