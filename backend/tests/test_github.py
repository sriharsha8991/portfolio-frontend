"""
Test script for GitHub Service
Run this to test the GitHub service functionality
"""

import asyncio
import sys
import os
from dotenv import load_dotenv

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.services.github_service import GitHubService


async def test_github_service():
    """Test various GitHub service methods"""
    
    # Load environment variables
    load_dotenv()
    
    # Check if token exists
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        print("❌ GITHUB_TOKEN not found in .env file!")
        print("Please add your GitHub personal access token to the .env file")
        return
    
    print("✅ GitHub token found!")
    print("\n" + "="*60)
    print("Testing GitHub Service")
    print("="*60 + "\n")
    
    # Initialize service
    github = GitHubService()
    
    # Test 1: Get authenticated user profile
    print("1️⃣  Testing: Get authenticated user profile...")
    profile = await github.get_user_profile()
    if profile:
        print(f"   ✅ Success! Username: {profile.get('username')}")
        print(f"   📊 Repos: {profile.get('public_repos')}, Followers: {profile.get('followers')}")
        username = profile.get('username')
    else:
        print("   ❌ Failed to fetch profile")
        return
    
    print()
    
    # Test 2: Get repositories
    print("2️⃣  Testing: Get repositories...")
    repos = await github.get_repositories(username, per_page=5)
    if repos:
        print(f"   ✅ Success! Found {len(repos)} repositories")
        for repo in repos[:3]:
            print(f"   📦 {repo.get('name')} - ⭐ {repo.get('stargazers_count')} stars")
    else:
        print("   ❌ Failed to fetch repositories")
    
    print()
    
    # Test 3: Get user statistics
    print("3️⃣  Testing: Get user statistics...")
    stats = await github.get_user_stats(username)
    if stats:
        print("   ✅ Success!")
        statistics = stats.get('statistics', {})
        print(f"   📊 Total repos: {statistics.get('total_repos')}")
        print(f"   ⭐ Total stars: {statistics.get('total_stars')}")
        print(f"   🍴 Total forks: {statistics.get('total_forks')}")
        
        languages = stats.get('languages', {}).get('top_languages', [])
        if languages:
            print("   💻 Top languages:")
            for lang in languages[:3]:
                print(f"      - {lang.get('name')}: {lang.get('count')} repos")
    else:
        print("   ❌ Failed to fetch statistics")
    
    print()
    
    # Test 4: Get repository languages (if repos exist)
    if repos:
        first_repo = repos[0]
        owner = first_repo.get('full_name').split('/')[0]
        repo_name = first_repo.get('name')
        
        print(f"4️⃣  Testing: Get languages for {owner}/{repo_name}...")
        languages = await github.get_repository_languages(owner, repo_name)
        if languages:
            print("   ✅ Success!")
            total = sum(languages.values())
            for lang, bytes_count in list(languages.items())[:5]:
                percentage = (bytes_count / total) * 100
                print(f"   💻 {lang}: {percentage:.1f}%")
        else:
            print("   ⚠️  No languages found or repository has no code")
    
    print()
    
    # Test 5: Get recent events
    print("5️⃣  Testing: Get recent events...")
    events = await github.get_user_events(username, per_page=5)
    if events:
        print(f"   ✅ Success! Found {len(events)} recent events")
        for event in events[:3]:
            print(f"   📅 {event.get('type')} on {event.get('repo')}")
    else:
        print("   ⚠️  No recent events found")
    
    print()
    print("="*60)
    print("✅ All tests completed!")
    print("="*60)


if __name__ == "__main__":
    asyncio.run(test_github_service())
