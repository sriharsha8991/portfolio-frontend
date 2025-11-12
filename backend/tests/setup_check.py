"""
Quick Setup Script for Backend with Tool Calling
Run this to verify your setup and test the new features
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

def check_environment():
    """Check if environment variables are set up correctly"""
    print("🔍 Checking environment setup...\n")
    
    load_dotenv()
    
    checks = {
        "GOOGLE_API_KEY": os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY"),
        "GITHUB_TOKEN": os.getenv("GITHUB_TOKEN")
    }
    
    all_good = True
    
    # Required checks
    if checks["GOOGLE_API_KEY"]:
        print("✅ Gemini API key found")
    else:
        print("❌ GOOGLE_API_KEY not found in .env")
        print("   Get one from: https://makersuite.google.com/app/apikey")
        all_good = False
    
    # Optional checks
    if checks["GITHUB_TOKEN"]:
        print("✅ GitHub token found (5000 req/hour)")
    else:
        print("⚠️  GITHUB_TOKEN not found in .env (60 req/hour limit)")
        print("   Get one from: https://github.com/settings/tokens")
        print("   Optional but recommended for better rate limits")
    
    return all_good

def check_dependencies():
    """Check if required packages are installed"""
    print("\n🔍 Checking dependencies...\n")
    
    required = [
        ("fastapi", "FastAPI"),
        ("uvicorn", "Uvicorn"),
        ("google.genai", "Google GenAI SDK"),
        ("aiohttp", "aiohttp"),
        ("pydantic", "Pydantic"),
        ("dotenv", "python-dotenv")
    ]
    
    all_installed = True
    
    for module, name in required:
        try:
            __import__(module)
            print(f"✅ {name} installed")
        except ImportError:
            print(f"❌ {name} not installed")
            all_installed = False
    
    return all_installed

def check_files():
    """Check if all required files exist"""
    print("\n🔍 Checking files...\n")
    
    required_files = [
        "main.py",
        ".env",
        "src/api/chat.py",
        "src/api/github.py",
        "src/services/github_service.py",
        "src/prompts/system_prompts.json",
        "src/prompts/resume_context.json"
    ]
    
    all_exist = True
    
    for file_path in required_files:
        path = Path(file_path)
        if path.exists():
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} not found")
            all_exist = False
    
    return all_exist

def print_next_steps(env_ok, deps_ok, files_ok):
    """Print next steps based on checks"""
    print("\n" + "="*70)
    
    if env_ok and deps_ok and files_ok:
        print("🎉 Setup Complete! Everything looks good!\n")
        print("Next steps:")
        print("  1. Run the server:")
        print("     python main.py")
        print()
        print("  2. Test GitHub service:")
        print("     python test_github.py")
        print()
        print("  3. Test chat with tools:")
        print("     python test_chat_tools.py")
        print()
        print("  4. Access API docs:")
        print("     http://localhost:8000/docs")
        print()
        print("  5. Try the chat endpoint:")
        print("     curl -X POST http://localhost:8000/api/chat \\")
        print("       -H 'Content-Type: application/json' \\")
        print("       -d '{\"message\": \"What are Sriharsha's skills?\", \"conversation_history\": []}'")
    else:
        print("⚠️  Setup Incomplete\n")
        
        if not env_ok:
            print("❌ Environment variables missing")
            print("   1. Copy .env.example to .env")
            print("   2. Add your GOOGLE_API_KEY")
            print("   3. Optionally add GITHUB_TOKEN")
            print()
        
        if not deps_ok:
            print("❌ Dependencies missing")
            print("   Run: pip install -r requirements.txt")
            print()
        
        if not files_ok:
            print("❌ Required files missing")
            print("   Make sure you're in the backend directory")
            print()
    
    print("="*70)

def main():
    """Main setup check"""
    print("="*70)
    print("Backend Setup Verification")
    print("Tool Calling + GitHub Service Integration")
    print("="*70)
    
    env_ok = check_environment()
    deps_ok = check_dependencies()
    files_ok = check_files()
    
    print_next_steps(env_ok, deps_ok, files_ok)

if __name__ == "__main__":
    main()
