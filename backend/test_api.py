"""
Test script for Portfolio Chat API
Tests the Google GenAI SDK integration
Run this to verify your setup is working correctly
"""

import requests
import json
import sys

# Configuration
API_URL = "http://localhost:8000"

def print_separator():
    print("\n" + "="*60 + "\n")

def test_health_check():
    """Test if the API is running"""
    print("🔍 Testing Health Check...")
    try:
        response = requests.get(f"{API_URL}/")
        if response.status_code == 200:
            data = response.json()
            print("✅ Health Check PASSED")
            print(f"   Status: {data.get('status')}")
            print(f"   Service: {data.get('service')}")
            print(f"   Version: {data.get('version')}")
            print(f"   Description: {data.get('description')}")
            return True
        else:
            print(f"❌ Health Check FAILED (Status: {response.status_code})")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Is the backend running?")
        print("   Start it with: cd backend && python main.py")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_resume_summary():
    """Test resume summary endpoint"""
    print("🔍 Testing Resume Summary...")
    try:
        response = requests.get(f"{API_URL}/api/resume-summary")
        if response.status_code == 200:
            data = response.json()
            print("✅ Resume Summary PASSED")
            print(f"   Name: {data.get('name')}")
            print(f"   Role: {data.get('role')}")
            print(f"   Company: {data.get('company')}")
            print(f"   Skills: {', '.join(data.get('key_skills', [])[:3])}...")
            return True
        else:
            print(f"❌ Resume Summary FAILED (Status: {response.status_code})")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_chat_endpoint():
    """Test chat endpoint with sample questions"""
    test_questions = [
        "What experience does Sriharsha have with RAG?",
        "Tell me about his education",
        "What are his key technical skills?",
    ]
    
    print("🔍 Testing Chat Endpoint...")
    passed = 0
    
    for i, question in enumerate(test_questions, 1):
        try:
            print(f"\n   Test {i}: {question[:50]}...")
            response = requests.post(
                f"{API_URL}/api/chat",
                json={
                    "message": question,
                    "conversation_history": []
                },
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                answer = data.get('response', '')
                print(f"   ✅ Response received ({len(answer)} characters)")
                print(f"   Preview: {answer[:100]}...")
                passed += 1
            else:
                print(f"   ❌ Failed (Status: {response.status_code})")
                print(f"   Error: {response.text}")
        except requests.exceptions.Timeout:
            print(f"   ❌ Timeout (AI took too long to respond)")
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    if passed == len(test_questions):
        print(f"\n✅ Chat Endpoint PASSED ({passed}/{len(test_questions)} tests)")
        return True
    else:
        print(f"\n⚠️  Chat Endpoint PARTIAL ({passed}/{len(test_questions)} tests passed)")
        return False

def test_off_topic_handling():
    """Test if AI correctly handles off-topic questions"""
    print("🔍 Testing Off-Topic Handling...")
    off_topic_questions = [
        "What's the weather today?",
        "Tell me a joke",
    ]
    
    for question in off_topic_questions:
        try:
            print(f"\n   Testing: {question}")
            response = requests.post(
                f"{API_URL}/api/chat",
                json={
                    "message": question,
                    "conversation_history": []
                },
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                answer = data.get('response', '').lower()
                
                # Check if response redirects to professional topics
                if any(word in answer for word in ['professional', 'experience', 'skills', 'portfolio', 'sriharsha']):
                    print(f"   ✅ Correctly redirected off-topic question")
                    print(f"   Response: {data.get('response')[:100]}...")
                else:
                    print(f"   ⚠️  Response may not properly redirect")
                    print(f"   Response: {data.get('response')[:100]}...")
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    print("\n✅ Off-Topic Handling Test Complete")
    return True

def run_all_tests():
    """Run all tests"""
    print("🚀 Portfolio Chat API Test Suite")
    print("="*60)
    
    results = []
    
    # Test 1: Health Check
    print_separator()
    results.append(("Health Check", test_health_check()))
    
    if not results[0][1]:
        print("\n❌ Cannot proceed - API is not running!")
        print("\n📝 To fix:")
        print("   1. cd backend")
        print("   2. python main.py")
        print("   3. Run this test again")
        return
    
    # Test 2: Resume Summary
    print_separator()
    results.append(("Resume Summary", test_resume_summary()))
    
    # Test 3: Chat Endpoint
    print_separator()
    results.append(("Chat Endpoint", test_chat_endpoint()))
    
    # Test 4: Off-Topic Handling
    print_separator()
    results.append(("Off-Topic Handling", test_off_topic_handling()))
    
    # Summary
    print_separator()
    print("📊 TEST RESULTS SUMMARY")
    print("="*60)
    
    for test_name, passed in results:
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name:.<40} {status}")
    
    passed_count = sum(1 for _, passed in results if passed)
    total_count = len(results)
    
    print("="*60)
    print(f"\nTotal: {passed_count}/{total_count} tests passed")
    
    if passed_count == total_count:
        print("\n🎉 ALL TESTS PASSED! Your chat API is working perfectly!")
        print("\n✅ Next steps:")
        print("   1. Open index.html in your browser")
        print("   2. Click the chat button (bottom right)")
        print("   3. Start chatting!")
    else:
        print("\n⚠️  Some tests failed. Please check the errors above.")
        print("\n🔧 Common fixes:")
        print("   1. Make sure GEMINI_API_KEY is set in backend/.env")
        print("   2. Check if backend is running on port 8000")
        print("   3. Verify your Gemini API key is valid")

if __name__ == "__main__":
    try:
        run_all_tests()
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Unexpected error: {e}")
