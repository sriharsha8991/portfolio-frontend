"""
GitHub Service for fetching user profile, repositories, and statistics
"""

import os
import aiohttp
from typing import Dict, List, Optional, Any
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class GitHubService:
    """Service to interact with GitHub API"""
    
    BASE_URL = "https://api.github.com"
    
    def __init__(self):
        """Initialize GitHub service with token from environment"""
        self.token = os.getenv("GITHUB_TOKEN")
        if not self.token:
            logger.warning("GITHUB_TOKEN not found in environment variables")
        
        self.headers = {
            "Accept": "application/vnd.github.v3+json",
            "Authorization": f"token {self.token}" if self.token else ""
        }
    
    async def _make_request(self, endpoint: str) -> Optional[Dict]:
        """
        Make an async HTTP request to GitHub API
        
        Args:
            endpoint: API endpoint (e.g., '/user', '/users/username')
            
        Returns:
            JSON response as dictionary or None if error
        """
        url = f"{self.BASE_URL}{endpoint}"
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=self.headers) as response:
                    if response.status == 200:
                        return await response.json()
                    else:
                        logger.error(f"GitHub API error: {response.status} for {endpoint}")
                        return None
        except Exception as e:
            logger.error(f"Request error for {endpoint}: {str(e)}")
            return None
    
    async def get_user_profile(self, username: Optional[str] = None) -> Optional[Dict]:
        """
        Get GitHub user profile
        
        Args:
            username: GitHub username (if None, gets authenticated user)
            
        Returns:
            User profile data including bio, location, company, etc.
        """
        endpoint = f"/users/{username}" if username else "/user"
        data = await self._make_request(endpoint)
        
        if data:
            return {
                "username": data.get("login"),
                "name": data.get("name"),
                "bio": data.get("bio"),
                "avatar_url": data.get("avatar_url"),
                "location": data.get("location"),
                "company": data.get("company"),
                "blog": data.get("blog"),
                "email": data.get("email"),
                "twitter_username": data.get("twitter_username"),
                "public_repos": data.get("public_repos"),
                "public_gists": data.get("public_gists"),
                "followers": data.get("followers"),
                "following": data.get("following"),
                "created_at": data.get("created_at"),
                "updated_at": data.get("updated_at"),
                "html_url": data.get("html_url")
            }
        return None
    
    async def get_repositories(
        self, 
        username: Optional[str] = None,
        sort: str = "updated",
        per_page: int = 100
    ) -> List[Dict]:
        """
        Get user's repositories
        
        Args:
            username: GitHub username (if None, gets authenticated user's repos)
            sort: Sort by 'created', 'updated', 'pushed', 'full_name'
            per_page: Number of results per page (max 100)
            
        Returns:
            List of repository data
        """
        endpoint = f"/users/{username}/repos?sort={sort}&per_page={per_page}" if username else f"/user/repos?sort={sort}&per_page={per_page}"
        data = await self._make_request(endpoint)
        
        if data:
            return [
                {
                    "name": repo.get("name"),
                    "full_name": repo.get("full_name"),
                    "description": repo.get("description"),
                    "html_url": repo.get("html_url"),
                    "homepage": repo.get("homepage"),
                    "language": repo.get("language"),
                    "languages_url": repo.get("languages_url"),
                    "stargazers_count": repo.get("stargazers_count"),
                    "watchers_count": repo.get("watchers_count"),
                    "forks_count": repo.get("forks_count"),
                    "open_issues_count": repo.get("open_issues_count"),
                    "size": repo.get("size"),
                    "default_branch": repo.get("default_branch"),
                    "topics": repo.get("topics", []),
                    "visibility": repo.get("visibility"),
                    "is_fork": repo.get("fork"),
                    "created_at": repo.get("created_at"),
                    "updated_at": repo.get("updated_at"),
                    "pushed_at": repo.get("pushed_at"),
                }
                for repo in data
            ]
        return []
    
    async def get_repository_languages(self, owner: str, repo: str) -> Dict[str, int]:
        """
        Get languages used in a repository
        
        Args:
            owner: Repository owner
            repo: Repository name
            
        Returns:
            Dictionary of languages and their byte counts
        """
        endpoint = f"/repos/{owner}/{repo}/languages"
        data = await self._make_request(endpoint)
        return data if data else {}
    
    async def get_user_events(
        self, 
        username: str,
        per_page: int = 100
    ) -> List[Dict]:
        """
        Get recent public events for a user
        
        Args:
            username: GitHub username
            per_page: Number of results per page (max 100)
            
        Returns:
            List of public events
        """
        endpoint = f"/users/{username}/events/public?per_page={per_page}"
        data = await self._make_request(endpoint)
        
        if data:
            return [
                {
                    "type": event.get("type"),
                    "repo": event.get("repo", {}).get("name"),
                    "created_at": event.get("created_at"),
                    "payload": event.get("payload")
                }
                for event in data
            ]
        return []
    
    async def get_user_stats(self, username: str) -> Dict[str, Any]:
        """
        Get comprehensive statistics for a user
        
        Args:
            username: GitHub username
            
        Returns:
            Dictionary with various statistics
        """
        profile = await self.get_user_profile(username)
        repos = await self.get_repositories(username)
        
        if not profile or not repos:
            return {}
        
        # Calculate statistics
        total_stars = sum(repo.get("stargazers_count", 0) for repo in repos)
        total_forks = sum(repo.get("forks_count", 0) for repo in repos)
        
        # Language statistics
        language_stats = {}
        for repo in repos:
            lang = repo.get("language")
            if lang:
                language_stats[lang] = language_stats.get(lang, 0) + 1
        
        # Get top languages by usage
        top_languages = sorted(
            language_stats.items(), 
            key=lambda x: x[1], 
            reverse=True
        )[:5]
        
        # Repository types
        original_repos = [repo for repo in repos if not repo.get("is_fork")]
        forked_repos = [repo for repo in repos if repo.get("is_fork")]
        
        # Most starred repos
        top_repos = sorted(
            repos, 
            key=lambda x: x.get("stargazers_count", 0), 
            reverse=True
        )[:5]
        
        return {
            "profile": profile,
            "statistics": {
                "total_repos": len(repos),
                "original_repos": len(original_repos),
                "forked_repos": len(forked_repos),
                "total_stars": total_stars,
                "total_forks": total_forks,
                "followers": profile.get("followers"),
                "following": profile.get("following")
            },
            "languages": {
                "top_languages": [{"name": lang, "count": count} for lang, count in top_languages],
                "all_languages": language_stats
            },
            "top_repositories": [
                {
                    "name": repo.get("name"),
                    "description": repo.get("description"),
                    "stars": repo.get("stargazers_count"),
                    "forks": repo.get("forks_count"),
                    "language": repo.get("language"),
                    "url": repo.get("html_url")
                }
                for repo in top_repos
            ]
        }
    
    async def get_repository_commits(
        self, 
        owner: str, 
        repo: str,
        per_page: int = 100
    ) -> List[Dict]:
        """
        Get commits for a repository
        
        Args:
            owner: Repository owner
            repo: Repository name
            per_page: Number of results per page (max 100)
            
        Returns:
            List of commits
        """
        endpoint = f"/repos/{owner}/{repo}/commits?per_page={per_page}"
        data = await self._make_request(endpoint)
        
        if data:
            return [
                {
                    "sha": commit.get("sha"),
                    "message": commit.get("commit", {}).get("message"),
                    "author": commit.get("commit", {}).get("author", {}).get("name"),
                    "date": commit.get("commit", {}).get("author", {}).get("date"),
                    "url": commit.get("html_url")
                }
                for commit in data
            ]
        return []
    
    async def get_user_gists(self, username: str, per_page: int = 100) -> List[Dict]:
        """
        Get user's public gists
        
        Args:
            username: GitHub username
            per_page: Number of results per page (max 100)
            
        Returns:
            List of gists
        """
        endpoint = f"/users/{username}/gists?per_page={per_page}"
        data = await self._make_request(endpoint)
        
        if data:
            return [
                {
                    "id": gist.get("id"),
                    "description": gist.get("description"),
                    "public": gist.get("public"),
                    "html_url": gist.get("html_url"),
                    "files": list(gist.get("files", {}).keys()),
                    "created_at": gist.get("created_at"),
                    "updated_at": gist.get("updated_at")
                }
                for gist in data
            ]
        return []
    
    async def search_repositories(
        self, 
        query: str,
        sort: str = "stars",
        order: str = "desc",
        per_page: int = 30
    ) -> List[Dict]:
        """
        Search GitHub repositories
        
        Args:
            query: Search query (e.g., "user:username language:python")
            sort: Sort by 'stars', 'forks', 'help-wanted-issues', 'updated'
            order: Order 'asc' or 'desc'
            per_page: Number of results per page (max 100)
            
        Returns:
            List of matching repositories
        """
        endpoint = f"/search/repositories?q={query}&sort={sort}&order={order}&per_page={per_page}"
        data = await self._make_request(endpoint)
        
        if data and "items" in data:
            return [
                {
                    "name": repo.get("name"),
                    "full_name": repo.get("full_name"),
                    "description": repo.get("description"),
                    "html_url": repo.get("html_url"),
                    "language": repo.get("language"),
                    "stargazers_count": repo.get("stargazers_count"),
                    "forks_count": repo.get("forks_count"),
                    "topics": repo.get("topics", []),
                }
                for repo in data["items"]
            ]
        return []
