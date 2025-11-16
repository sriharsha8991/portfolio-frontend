"""
Test script for Chat API with Gemini Tool Calling
Run this to test the chat endpoint with various queries
"""

import asyncio
import sys
import os
from dotenv import load_dotenv

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.api.chat import chat, ChatRequest


async def test_chat_with_tools():
    """Test chat endpoint with various queries that trigger different tools"""
    
    # Load environment variables
    load_dotenv()
    
    # Check if API keys exist
    gemini_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    github_token = os.getenv("GITHUB_TOKEN")
    
    if not gemini_key:
        print("❌ GOOGLE_API_KEY or GEMINI_API_KEY not found in .env file!")
        return
    
    if not github_token:
        print("⚠️  GITHUB_TOKEN not found - GitHub tools may have rate limits")
    
    print("✅ API keys loaded!")
    print("\n" + "="*70)
    print("Testing Chat API with Gemini Tool Calling")
    print("="*70 + "\n")
    
    # Test queries that should trigger different tools
    test_queries = [
        {
            "message": "Tell me about Sriharsha's professional background and experience",
            "description": "Should trigger get_sriharsha_profile()",
            "expected_tool": "get_sriharsha_profile"
        },
        {
            "message": "What are Sriharsha's skills in AI and GenAI?",
            "description": "Should trigger get_sriharsha_profile()",
            "expected_tool": "get_sriharsha_profile"
        },
        {
            "message": "Show me Sriharsha's GitHub profile",
            "description": "Should trigger get_github_profile()",
            "expected_tool": "get_github_profile"
        },
        {
            "message": "What are Sriharsha's most recent GitHub repositories?",
            "description": "Should trigger get_github_repositories()",
            "expected_tool": "get_github_repositories"
        },
        {
            "message": "What are Sriharsha's GitHub statistics and achievements?",
            "description": "Should trigger get_github_stats()",
            "expected_tool": "get_github_stats"
        },
        {
            "message": "Find Sriharsha's Python projects on GitHub",
            "description": "Should trigger search_github_repositories()",
            "expected_tool": "search_github_repositories"
        },
        {
            "message": "Tell me about Sriharsha's work at DatasmithAI and show his GitHub projects",
            "description": "Should trigger multiple tools",
            "expected_tool": "multiple"
        }
    ]
    
    for i, test in enumerate(test_queries, 1):
        print(f"\n{'='*70}")
        print(f"Test {i}: {test['description']}")
        print(f"{'='*70}")
        print(f"Query: {test['message']}\n")
        
        try:
            request = ChatRequest(
                message=test['message'],
                conversation_history=[]
            )
            
            response = await chat(request)
            
            print(f"✅ Response received!")
            print(f"🔧 Tools used: {response.tools_used or 'None'}")
            print(f"\n💬 Response:\n{response.response}\n")
            
            # Check if expected tool was used
            if response.tools_used:
                if test['expected_tool'] == 'multiple':
                    if len(response.tools_used) > 1:
                        print(f"✅ Multiple tools used as expected")
                    else:
                        print(f"⚠️  Expected multiple tools, got: {response.tools_used}")
                elif test['expected_tool'] in response.tools_used:
                    print(f"✅ Expected tool '{test['expected_tool']}' was used")
                else:
                    print(f"⚠️  Expected '{test['expected_tool']}', but got: {response.tools_used}")
            else:
                print(f"⚠️  No tools were used (expected: {test['expected_tool']})")
                
        except Exception as e:
            print(f"❌ Error: {str(e)}")
        
        # Small delay between requests
        await asyncio.sleep(1)
    
    print("\n" + "="*70)
    print("✅ All tests completed!")
    print("="*70)


async def test_conversation_with_history():
    """Test chat with conversation history"""
    
    print("\n" + "="*70)
    print("Testing Conversation with History")
    print("="*70 + "\n")
    
    conversation_history = []
    
    # First message
    print("👤 User: Tell me about Sriharsha's experience")
    request1 = ChatRequest(
        message="Tell me about Sriharsha's experience",
        conversation_history=[]
    )
    
    try:
        response1 = await chat(request1)
        print(f"🤖 Assistant: {response1.response[:200]}...")
        print(f"🔧 Tools used: {response1.tools_used}\n")
        
        # Add to history
        conversation_history.append({
            "user": "Tell me about Sriharsha's experience",
            "assistant": response1.response
        })
        
        # Second message (follow-up)
        await asyncio.sleep(1)
        print("👤 User: What about his GitHub projects?")
        request2 = ChatRequest(
            message="What about his GitHub projects?",
            conversation_history=conversation_history
        )
        
        response2 = await chat(request2)
        print(f"🤖 Assistant: {response2.response[:200]}...")
        print(f"🔧 Tools used: {response2.tools_used}\n")
        
        print("✅ Conversation with history test completed!")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")


if __name__ == "__main__":
    # Run basic tests
    asyncio.run(test_chat_with_tools())
    
    # Run conversation test
    asyncio.run(test_conversation_with_history())
