"""
Tool Registry - Central registry of all available tools and their declarations
"""
from .profile_tools import get_sriharsha_profile, PROFILE_TOOL_DECLARATION
from .github_tools import (
    get_github_profile,
    get_github_repositories,
    get_github_stats,
    search_github_repositories,
    GITHUB_TOOL_DECLARATIONS
)
from .navigation_tools import (
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

# Combined tool declarations for Gemini
TOOLS = [
    {
        "function_declarations": [
            PROFILE_TOOL_DECLARATION,
            *GITHUB_TOOL_DECLARATIONS,
            *NAVIGATION_TOOL_DECLARATIONS
        ]
    }
]

# Tool function mapping for execution
TOOL_FUNCTIONS = {
    "get_sriharsha_profile": get_sriharsha_profile,
    "get_github_profile": get_github_profile,
    "get_github_repositories": get_github_repositories,
    "get_github_stats": get_github_stats,
    "search_github_repositories": search_github_repositories,
    "navigate_to_home": navigate_to_home,
    "navigate_to_about": navigate_to_about,
    "navigate_to_experience": navigate_to_experience,
    "navigate_to_projects": navigate_to_projects,
    "navigate_to_skills": navigate_to_skills,
    "navigate_to_github": navigate_to_github,
    "navigate_to_education": navigate_to_education,
    "navigate_to_contact": navigate_to_contact,
}
