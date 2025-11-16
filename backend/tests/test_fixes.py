"""
Quick test for the fixed chat tool calling
Tests the problematic scenarios that were causing errors
"""

import asyncio
import sys
import os
from dotenv import load_dotenv

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.api.chat import chat, ChatRequest


async def test_repository_tools():
    """Test the tools that were causing validation errors"""
    
    load_dotenv()
    
    if not (os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")):
        print("❌ GOOGLE_API_KEY not found in .env file!")
        return
    
    print("="*70)
    print("Testing Fixed Tool Calling Issues")
    print("="*70 + "\n")
    
    test_cases = [
        {
            "name": "Profile Test",
            "message": "What are Sriharsha's skills in AI and GenAI?",
            "expected_tool": "get_sriharsha_profile"
        },
        {
            "name": "Get GitHub Repositories",
            "message": "Show me Sriharsha's GitHub repositories",
            "expected_tool": "get_github_repositories"
        },
        {
            "name": "Search Python Projects",
            "message": "Find Sriharsha's Python projects on GitHub",
            "expected_tool": "search_github_repositories"
        },
        {
            "name": "GitHub Statistics",
            "message": "What are Sriharsha's GitHub statistics?",
            "expected_tool": "get_github_stats"
        },
    ]
    
    for i, test in enumerate(test_cases, 1):
        print(f"\n{'='*70}")
        print(f"Test {i}: {test['name']}")
        print(f"{'='*70}")
        print(f"Query: {test['message']}\n")
        
        try:
            request = ChatRequest(
                message=test['message'],
                conversation_history=[]
            )
            
            print("⏳ Sending request...")
            response = await chat(request)
            
            print(f"✅ Response received!")
            print(f"🔧 Tools used: {response.tools_used or 'None'}")
            print(f"\n💬 Response preview:")
            response_preview = response.response[:400] if len(response.response) > 400 else response.response
            print(f"{response_preview}...")
            
            if 'expected_tool' in test and response.tools_used:
                if test['expected_tool'] in response.tools_used:
                    print(f"\n✅ SUCCESS: Expected tool '{test['expected_tool']}' was used")
                else:
                    print(f"\n⚠️  Expected '{test['expected_tool']}', but got: {response.tools_used}")
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            import traceback
            traceback.print_exc()
        
        await asyncio.sleep(2)
    
    print("\n" + "="*70)
    print("Basic tests completed! Now testing conversation history...")
    print("="*70)


async def test_conversation_history():
    """Test conversation with history"""
    
    print("\n" + "="*70)
    print("Testing Conversation History")
    print("="*70 + "\n")
    
    # First message
    print("👤 User: Tell me about Sriharsha's experience at DatasmithAI")
    request1 = ChatRequest(
        message="Tell me about Sriharsha's experience at DatasmithAI",
        conversation_history=[]
    )
    
    try:
        print("⏳ Sending first message...")
        response1 = await chat(request1)
        print(f"✅ Response 1 received!")
        print(f"🔧 Tools used: {response1.tools_used}")
        print(f"💬 Response preview: {response1.response[:200]}...\n")
        
        # Second message (follow-up with history)
        await asyncio.sleep(2)
        print("👤 User: What about his GitHub projects?")
        
        conversation_history = [
            {
                "user": "Tell me about Sriharsha's experience at DatasmithAI",
                "assistant": response1.response
            }
        ]
        
        request2 = ChatRequest(
            message="What about his GitHub projects?",
            conversation_history=conversation_history
        )
        
        print("⏳ Sending second message with history...")
        response2 = await chat(request2)
        print(f"✅ Response 2 received!")
        print(f"🔧 Tools used: {response2.tools_used}")
        print(f"💬 Response preview: {response2.response[:200]}...\n")
        
        print("✅ Conversation with history test completed successfully!")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()


async def test_multi_tool_query():
    """Test a query that requires multiple tools"""
    
    print("\n" + "="*70)
    print("Testing Multi-Tool Query")
    print("="*70 + "\n")
    
    print("👤 User: Tell me about Sriharsha's work experience and show his GitHub statistics")
    
    request = ChatRequest(
        message="Tell me about Sriharsha's work experience and show his GitHub statistics",
        conversation_history=[]
    )
    
    try:
        print("⏳ Sending multi-tool request...")
        response = await chat(request)
        
        print(f"✅ Response received!")
        print(f"🔧 Tools used: {response.tools_used}")
        print(f"💬 Response preview: {response.response[:300]}...\n")
        
        if response.tools_used and len(response.tools_used) > 1:
            print(f"✅ SUCCESS: Multiple tools used as expected ({len(response.tools_used)} tools)")
        else:
            print(f"⚠️  Expected multiple tools, got: {response.tools_used}")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()


async def run_all_tests():
    """Run all tests"""
    await test_repository_tools()
    await test_conversation_history()
    await test_multi_tool_query()
    
    print("\n" + "="*70)
    print("✅ All tests completed!")
    print("="*70)
    print("\nIf all tests passed without errors, the implementation is working correctly!")
    print("You can now start the server with: python main.py")


if __name__ == "__main__":
    asyncio.run(run_all_tests())
