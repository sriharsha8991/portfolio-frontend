"""
GitHub Tools - Tools for accessing GitHub data via GitHub service
"""
from typing import Dict, Any, List
from src.services.github_service import GitHubService

# Initialize GitHub service once at module level
github_service = GitHubService()


async def get_github_profile(username: str = "sriharsha8991") -> Dict[str, Any]:
    """
    Get GitHub profile information for Sriharsha Velicheti or any GitHub user.
    
    Args:
        username: GitHub username (default: sriharsha8991)
        
    Returns:
        GitHub profile data including bio, followers, repos count, etc.
    """
    profile = await github_service.get_user_profile(username)
    return profile if profile else {"error": "Profile not found"}


async def get_github_repositories(
    username: str = "sriharsha8991",
    sort: str = "updated",
    limit: int = 10
) -> List[Dict[str, Any]]:
    """
    Get GitHub repositories for Sriharsha Velicheti or any GitHub user.
    
    Args:
        username: GitHub username (default: sriharsha8991)
        sort: Sort by 'created', 'updated', 'pushed', or 'full_name'
        limit: Number of repositories to return (max 100)
        
    Returns:
        List of repository data
    """
    repos = await github_service.get_repositories(username, sort, min(limit, 100))
    return repos[:limit] if repos else []


async def get_github_stats(username: str = "sriharsha8991") -> Dict[str, Any]:
    """
    Get comprehensive GitHub statistics for Sriharsha Velicheti including
    total repos, stars, forks, top languages, and top repositories.
    
    Args:
        username: GitHub username (default: sriharsha8991)
        
    Returns:
        Comprehensive GitHub statistics
    """
    stats = await github_service.get_user_stats(username)
    return stats if stats else {"error": "Stats not available"}


async def search_github_repositories(
    query: str,
    sort: str = "stars",
    limit: int = 10
) -> List[Dict[str, Any]]:
    """
    Search GitHub repositories with a query. Useful for finding specific projects
    or repositories matching certain criteria.
    
    Args:
        query: Search query (e.g., "user:sriharsha8991 language:python")
        sort: Sort by 'stars', 'forks', 'help-wanted-issues', or 'updated'
        limit: Number of results to return (max 100)
        
    Returns:
        List of matching repositories
    """
    repos = await github_service.search_repositories(query, sort, "desc", min(limit, 100))
    return repos[:limit] if repos else []


# Tool declarations for Gemini
GITHUB_TOOL_DECLARATIONS = [
    {
        "name": "get_github_profile",
        "description": "Get GitHub profile information including bio, location, followers, following, and repository counts. Use this when users ask about Sriharsha's GitHub profile or want to see his GitHub statistics.",
        "parameters": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string",
                    "description": "GitHub username (default: sriharsha8991 for Sriharsha Velicheti)"
                }
            },
            "required": []
        }
    },
    {
        "name": "get_github_repositories",
        "description": "Get GitHub repositories with details like name, description, stars, forks, languages, and topics. Use this when users want to see Sriharsha's projects, repositories, or coding work on GitHub.",
        "parameters": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string",
                    "description": "GitHub username (default: sriharsha8991)"
                },
                "sort": {
                    "type": "string",
                    "description": "Sort repositories by: 'created', 'updated', 'pushed', or 'full_name'",
                    "enum": ["created", "updated", "pushed", "full_name"]
                },
                "limit": {
                    "type": "integer",
                    "description": "Number of repositories to return (1-100)",
                    "minimum": 1,
                    "maximum": 100
                }
            },
            "required": []
        }
    },
    {
        "name": "get_github_stats",
        "description": "Get comprehensive GitHub statistics including total repositories, total stars received, total forks, top programming languages used, and most popular repositories. Use this for overview statistics and achievements on GitHub.",
        "parameters": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string",
                    "description": "GitHub username (default: sriharsha8991)"
                }
            },
            "required": []
        }
    },
    {
        "name": "search_github_repositories",
        "description": "Search GitHub repositories with specific criteria like language, topics, or keywords. Use this when users want to find specific types of projects or repositories matching certain criteria.",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Search query (e.g., 'user:sriharsha8991 language:python' or 'user:sriharsha8991 topic:ai')"
                },
                "sort": {
                    "type": "string",
                    "description": "Sort results by",
                    "enum": ["stars", "forks", "help-wanted-issues", "updated"]
                },
                "limit": {
                    "type": "integer",
                    "description": "Number of results (1-100)",
                    "minimum": 1,
                    "maximum": 100
                }
            },
            "required": ["query"]
        }
    }
]
