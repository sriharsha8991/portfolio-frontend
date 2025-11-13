"""
Navigation Tools for Portfolio Section Navigation
Provides Gemini AI with tools to navigate users to specific portfolio sections
"""

from typing import Dict, Any
import json


def load_sections():
    """Load sections configuration from sections.json"""
    try:
        with open('sections.json', 'r') as f:
            data = json.load(f)
            return data['sections']
    except FileNotFoundError:
        # Fallback sections if file not found
        return [
            {"id": "home", "name": "Home", "description": "Hero section"},
            {"id": "about", "name": "About", "description": "Professional background"},
            {"id": "experience", "name": "Experience", "description": "Work history"},
            {"id": "projects", "name": "Projects", "description": "Portfolio projects"},
            {"id": "skills", "name": "Skills", "description": "Technical skills"},
            {"id": "github", "name": "GitHub", "description": "GitHub activity"},
            {"id": "education", "name": "Education", "description": "Academic background"},
            {"id": "contact", "name": "Contact", "description": "Contact information"}
        ]


# Load sections at module level
SECTIONS = load_sections()
SECTION_IDS = [section['id'] for section in SECTIONS]


async def navigate_to_home(reason: str = "") -> Dict[str, Any]:
    """
    Navigate to the Home section (Hero section introducing Sriharsha Velicheti)
    
    Args:
        reason: Optional explanation for why navigating to this section
    
    Returns:
        Navigation action with section details
    """
    return {
        "action": "navigate",
        "section_id": "home",
        "section_name": "Home",
        "reason": reason or "User wants to view the home/hero section",
        "success": True,
        "message": "Navigating to Home section",
        "audio_text": "hi there Let's head to the home page and see what Sriharsha is all about!"
    }


async def navigate_to_about(reason: str = "") -> Dict[str, Any]:
    """
    Navigate to the About section (Professional background, expertise, and statistics)
    
    Args:
        reason: Optional explanation for why navigating to this section
    
    Returns:
        Navigation action with section details
    """
    return {
        "action": "navigate",
        "section_id": "about",
        "section_name": "About",
        "reason": reason or "User wants to learn about professional background",
        "success": True,
        "message": "Navigating to About section",
        "audio_text": "Great! Let me show you more about Sriharsha's background and expertise."
    }


async def navigate_to_experience(reason: str = "") -> Dict[str, Any]:
    """
    Navigate to the Experience section (Work history timeline with roles and responsibilities)
    
    Args:
        reason: Optional explanation for why navigating to this section
    
    Returns:
        Navigation action with section details
    """
    return {
        "action": "navigate",
        "section_id": "experience",
        "section_name": "Experience",
        "reason": reason or "User wants to view work experience",
        "success": True,
        "message": "Navigating to Experience section",
        "audio_text": "Taking you to Sriharsha's professional journey and work experience!"
    }


async def navigate_to_projects(reason: str = "") -> Dict[str, Any]:
    """
    Navigate to the Projects section (Showcase of notable projects and implementations)
    
    Args:
        reason: Optional explanation for why navigating to this section
    
    Returns:
        Navigation action with section details
    """
    return {
        "action": "navigate",
        "section_id": "projects",
        "section_name": "Projects",
        "reason": reason or "User wants to see portfolio projects",
        "success": True,
        "message": "Navigating to Projects section",
        "audio_text": "Here are some amazing projects that Sriharsha has built. Check them out!"
    }


async def navigate_to_skills(reason: str = "") -> Dict[str, Any]:
    """
    Navigate to the Skills section (Technical skills categorized by AI/ML, Programming, and Cloud)
    
    Args:
        reason: Optional explanation for why navigating to this section
    
    Returns:
        Navigation action with section details
    """
    return {
        "action": "navigate",
        "section_id": "skills",
        "section_name": "Skills",
        "reason": reason or "User wants to view technical skills",
        "success": True,
        "message": "Navigating to Skills section",
        "audio_text": "Let's explore the technical skills and expertise Sriharsha brings to the table."
    }


async def navigate_to_github(reason: str = "") -> Dict[str, Any]:
    """
    Navigate to the GitHub section (GitHub activity statistics and repositories)
    
    Args:
        reason: Optional explanation for why navigating to this section
    
    Returns:
        Navigation action with section details
    """
    return {
        "action": "navigate",
        "section_id": "github",
        "section_name": "GitHub",
        "reason": reason or "User wants to see GitHub activity",
        "success": True,
        "message": "Navigating to GitHub section",
        "audio_text": "Let me show you Sriharsha's GitHub activity and open source contributions!"
    }


async def navigate_to_education(reason: str = "") -> Dict[str, Any]:
    """
    Navigate to the Education section (Academic background, certifications, and accomplishments)
    
    Args:
        reason: Optional explanation for why navigating to this section
    
    Returns:
        Navigation action with section details
    """
    return {
        "action": "navigate",
        "section_id": "education",
        "section_name": "Education",
        "reason": reason or "User wants to view educational background",
        "success": True,
        "message": "Navigating to Education section",
        "audio_text": "Here's where Sriharsha learned all this amazing stuff - his educational background and accomplishments."
    }


async def navigate_to_contact(reason: str = "") -> Dict[str, Any]:
    """
    Navigate to the Contact section (Contact form and information)
    
    Args:
        reason: Optional explanation for why navigating to this section
    
    Returns:
        Navigation action with section details
    """
    return {
        "action": "navigate",
        "section_id": "contact",
        "section_name": "Contact",
        "reason": reason or "User wants to contact or get in touch",
        "success": True,
        "message": "Navigating to Contact section",
        "audio_text": "Want to get in touch? Here's how you can reach out to Sriharsha!"
    }


# Tool declarations for Gemini function calling
NAVIGATION_TOOL_DECLARATIONS = [
    {
        "name": "navigate_to_home",
        "description": "Navigate to the Home/Hero section. Use when user wants to go to the landing page, see introduction, or start from the beginning.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Optional reason for navigation (for logging and context)"
                }
            },
            "required": []
        }
    },
    {
        "name": "navigate_to_about",
        "description": "Navigate to the About section. Use when user asks about background, overview, professional summary, statistics, or wants to know more about Sriharsha generally.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Optional reason for navigation (for logging and context)"
                }
            },
            "required": []
        }
    },
    {
        "name": "navigate_to_experience",
        "description": "Navigate to the Experience section. Use when user asks about work history, job roles, companies worked at, professional experience, or career timeline.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Optional reason for navigation (for logging and context)"
                }
            },
            "required": []
        }
    },
    {
        "name": "navigate_to_projects",
        "description": "Navigate to the Projects section. Use when user wants to see portfolio projects, implementations, case studies, or specific work examples.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Optional reason for navigation (for logging and context)"
                }
            },
            "required": []
        }
    },
    {
        "name": "navigate_to_skills",
        "description": "Navigate to the Skills section. Use when user asks about technical skills, programming languages, frameworks, AI/ML tools, cloud platforms, or expertise areas.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Optional reason for navigation (for logging and context)"
                }
            },
            "required": []
        }
    },
    {
        "name": "navigate_to_github",
        "description": "Navigate to the GitHub section. Use when user wants to see GitHub activity, contribution stats, repositories overview, or coding activity.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Optional reason for navigation (for logging and context)"
                }
            },
            "required": []
        }
    },
    {
        "name": "navigate_to_education",
        "description": "Navigate to the Education section. Use when user asks about academic background, degree, university, certifications, courses, or educational accomplishments.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Optional reason for navigation (for logging and context)"
                }
            },
            "required": []
        }
    },
    {
        "name": "navigate_to_contact",
        "description": "Navigate to the Contact section. Use when user wants to get in touch, reach out, contact, send a message, or needs contact information.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Optional reason for navigation (for logging and context)"
                }
            },
            "required": []
        }
    }
]
