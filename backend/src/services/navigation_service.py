"""
Navigation Service - LLM Instance 2
Handles navigation decisions independently from question answering
"""
from google import genai
from google.genai import types
import os
import json
from pathlib import Path
from typing import List, Dict, Any
from src.tools.navigation_tools import (
    navigate_to_home,
    navigate_to_about,
    navigate_to_experience,
    navigate_to_projects,
    navigate_to_skills,
    navigate_to_github,
    navigate_to_education,
    navigate_to_contact,
    NAVIGATION_TOOL_DECLARATIONS
)


class NavigationService:
    """Service for determining which portfolio section to navigate to"""
    
    def __init__(self):
        self.model_name = 'gemini-2.5-flash'
        self.client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
        
        # Load sections data
        sections_file = Path(__file__).resolve().parent.parent.parent.parent / "sections.json"
        
        with open(sections_file, 'r', encoding='utf-8') as f:
            sections_data = json.load(f)
        
        # Build navigation-specific system prompt
        self.system_prompt = f"""You are a navigation assistant for Sriharsha Velicheti's portfolio website.

Your ONLY job is to determine which section the user wants to view based on their query.

Available sections:
{json.dumps(sections_data['sections'], indent=2)}

Navigation Guidelines:
- If user asks about skills, technologies, programming languages, or technical expertise → navigate_to_skills
- If user asks about work experience, jobs, companies, roles, or career → navigate_to_experience
- If user asks about projects, implementations, case studies, or work samples → navigate_to_projects
- If user asks about education, degree, university, or academic background → navigate_to_education
- If user asks about GitHub, repositories, contributions, or open source → navigate_to_github
- If user wants to contact, reach out, get in touch, or send message → navigate_to_contact
- If user asks about background, overview, summary, or "who is Sriharsha" → navigate_to_about
- If user wants to go to homepage, landing page, or start → navigate_to_home

CRITICAL RULES:
1. You MUST ALWAYS call a navigation tool - never respond without taking action
2. For greetings (hello, hi, hey, good morning, etc.) → navigate_to_home (hero section)
3. For casual conversation or unclear intent → navigate_to_home (hero section as default)
4. For general questions about "who", "what do you do", "introduce" → navigate_to_home (hero section introduces Sriharsha)
5. When multiple sections could apply, pick the CLOSEST match and navigate there
6. If completely unsure → navigate_to_home (safe default to hero section)

Examples:
- "Hello" → navigate_to_home (greeting → hero section)
- "Hi there" → navigate_to_home (greeting → hero section)
- "Good morning" → navigate_to_home (greeting → hero section)
- "Who are you?" → navigate_to_home (introduction in hero section)
- "Show me your projects" → navigate_to_projects
- "What programming languages do you know?" → navigate_to_skills
- "Tell me about your work experience" → navigate_to_experience
- "I want to hire you" → navigate_to_contact
- "What did you study?" → navigate_to_education
- "Nice portfolio" → navigate_to_home (general comment → hero section)
- "Thanks" → navigate_to_home (acknowledgment → stay at hero)

REMEMBER: Always pick the closest matching section. Never return without calling a navigation tool.
"""
        
        # Tool mapping for execution
        self.tool_functions = {
            "navigate_to_home": navigate_to_home,
            "navigate_to_about": navigate_to_about,
            "navigate_to_experience": navigate_to_experience,
            "navigate_to_projects": navigate_to_projects,
            "navigate_to_skills": navigate_to_skills,
            "navigate_to_github": navigate_to_github,
            "navigate_to_education": navigate_to_education,
            "navigate_to_contact": navigate_to_contact,
        }
        
        # Configure tools (navigation only - NO profile/GitHub tools)
        self.tools = types.Tool(function_declarations=NAVIGATION_TOOL_DECLARATIONS)
        
        self.config = types.GenerateContentConfig(
            temperature=0.1,  # Lower temperature for consistent decisions
            top_p=0.9,
            max_output_tokens=512,
            system_instruction=self.system_prompt,
            tools=[self.tools],
        )
    
    async def get_navigation_decision(self, user_message: str) -> List[Dict[str, Any]]:
        """
        Determine navigation actions based on user query
        
        Args:
            user_message: User's query
            
        Returns:
            List of navigation actions (usually 0 or 1 action)
        """
        try:
            # Simple single-turn prompt
            contents = [
                types.Content(role="user", parts=[types.Part(text=user_message)])
            ]
            
            actions = []
            
            # Single call to determine navigation (no multi-turn needed)
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
                    
                    # Execute navigation tool
                    if function_name in self.tool_functions:
                        try:
                            nav_result = await self.tool_functions[function_name](**function_args)
                            
                            # Build action from navigation result
                            if isinstance(nav_result, dict) and nav_result.get('action') == 'navigate':
                                actions.append({
                                    'type': 'navigate',
                                    'section_id': nav_result.get('section_id'),
                                    'section_name': nav_result.get('section_name'),
                                    'reason': nav_result.get('reason', ''),
                                    'audio_text': nav_result.get('audio_text', '')
                                })
                        except Exception as e:
                            print(f"Navigation tool execution error: {e}")
            
            return actions
            
        except Exception as e:
            print(f"Navigation decision error: {e}")
            return []
