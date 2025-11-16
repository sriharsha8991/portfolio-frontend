"""
GitHub API Router - Endpoints for fetching GitHub profile and repository data
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from src.services.github_service import GitHubService
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/github", tags=["GitHub"])

# Initialize GitHub service
github_service = GitHubService()


@router.get("/profile")
async def get_github_profile(username: Optional[str] = Query(None, description="GitHub username")):
    """
    Get GitHub user profile information
    
    Args:
        username: GitHub username (optional, uses authenticated user if not provided)
        
    Returns:
        User profile data
    """
    try:
        profile = await github_service.get_user_profile(username)
        if not profile:
            raise HTTPException(status_code=404, detail="User not found or API error")
        return {"success": True, "data": profile}
    except Exception as e:
        logger.error(f"Error fetching profile: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching profile: {str(e)}")


@router.get("/repositories")
async def get_repositories(
    username: Optional[str] = Query(None, description="GitHub username"),
    sort: str = Query("updated", description="Sort by: created, updated, pushed, full_name"),
    per_page: int = Query(100, ge=1, le=100, description="Results per page")
):
    """
    Get user's repositories
    
    Args:
        username: GitHub username (optional)
        sort: Sort order
        per_page: Number of results
        
    Returns:
        List of repositories
    """
    try:
        repos = await github_service.get_repositories(username, sort, per_page)
        return {
            "success": True, 
            "data": repos,
            "count": len(repos)
        }
    except Exception as e:
        logger.error(f"Error fetching repositories: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching repositories: {str(e)}")


@router.get("/repositories/{owner}/{repo}/languages")
async def get_repository_languages(owner: str, repo: str):
    """
    Get languages used in a specific repository
    
    Args:
        owner: Repository owner
        repo: Repository name
        
    Returns:
        Dictionary of languages and byte counts
    """
    try:
        languages = await github_service.get_repository_languages(owner, repo)
        if not languages:
            raise HTTPException(status_code=404, detail="Repository not found or no languages detected")
        
        # Calculate percentages
        total = sum(languages.values())
        language_percentages = {
            lang: {
                "bytes": count,
                "percentage": round((count / total) * 100, 2)
            }
            for lang, count in languages.items()
        }
        
        return {
            "success": True,
            "data": language_percentages,
            "total_bytes": total
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching languages: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching languages: {str(e)}")


@router.get("/stats/{username}")
async def get_user_stats(username: str):
    """
    Get comprehensive statistics for a GitHub user
    
    Args:
        username: GitHub username
        
    Returns:
        User statistics including repos, stars, languages, etc.
    """
    try:
        stats = await github_service.get_user_stats(username)
        if not stats:
            raise HTTPException(status_code=404, detail="User not found or API error")
        return {"success": True, "data": stats}
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")


@router.get("/events/{username}")
async def get_user_events(
    username: str,
    per_page: int = Query(30, ge=1, le=100, description="Results per page")
):
    """
    Get recent public events for a user
    
    Args:
        username: GitHub username
        per_page: Number of results
        
    Returns:
        List of public events
    """
    try:
        events = await github_service.get_user_events(username, per_page)
        return {
            "success": True,
            "data": events,
            "count": len(events)
        }
    except Exception as e:
        logger.error(f"Error fetching events: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching events: {str(e)}")


@router.get("/gists/{username}")
async def get_user_gists(
    username: str,
    per_page: int = Query(30, ge=1, le=100, description="Results per page")
):
    """
    Get user's public gists
    
    Args:
        username: GitHub username
        per_page: Number of results
        
    Returns:
        List of gists
    """
    try:
        gists = await github_service.get_user_gists(username, per_page)
        return {
            "success": True,
            "data": gists,
            "count": len(gists)
        }
    except Exception as e:
        logger.error(f"Error fetching gists: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching gists: {str(e)}")


@router.get("/repositories/{owner}/{repo}/commits")
async def get_repository_commits(
    owner: str,
    repo: str,
    per_page: int = Query(30, ge=1, le=100, description="Results per page")
):
    """
    Get commits for a specific repository
    
    Args:
        owner: Repository owner
        repo: Repository name
        per_page: Number of results
        
    Returns:
        List of commits
    """
    try:
        commits = await github_service.get_repository_commits(owner, repo, per_page)
        return {
            "success": True,
            "data": commits,
            "count": len(commits)
        }
    except Exception as e:
        logger.error(f"Error fetching commits: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching commits: {str(e)}")


@router.get("/search/repositories")
async def search_repositories(
    q: str = Query(..., description="Search query"),
    sort: str = Query("stars", description="Sort by: stars, forks, help-wanted-issues, updated"),
    order: str = Query("desc", description="Order: asc or desc"),
    per_page: int = Query(30, ge=1, le=100, description="Results per page")
):
    """
    Search GitHub repositories
    
    Args:
        q: Search query (e.g., "user:username language:python")
        sort: Sort field
        order: Sort order
        per_page: Number of results
        
    Returns:
        List of matching repositories
    """
    try:
        repos = await github_service.search_repositories(q, sort, order, per_page)
        return {
            "success": True,
            "data": repos,
            "count": len(repos)
        }
    except Exception as e:
        logger.error(f"Error searching repositories: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error searching repositories: {str(e)}")
