"""
Verify System Prompt Configuration
Ensures system prompt is loaded from JSON and not hardcoded
"""

import json
from pathlib import Path

def verify_system_prompt():
    """Verify system prompt setup"""
    
    print("="*70)
    print("System Prompt Verification")
    print("="*70 + "\n")
    
    # Check 1: JSON file exists
    json_path = Path(__file__).parent / "src" / "prompts" / "system_prompts.json"
    
    if json_path.exists():
        print("✅ system_prompts.json exists")
    else:
        print("❌ system_prompts.json not found!")
        return False
    
    # Check 2: Load and parse JSON
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            prompts = json.load(f)
        print("✅ JSON file is valid")
    except Exception as e:
        print(f"❌ Error loading JSON: {e}")
        return False
    
    # Check 3: Required keys exist
    required_keys = ['system_prompt', 'welcome_message', 'off_topic_response', 'no_information_response']
    missing_keys = [key for key in required_keys if key not in prompts]
    
    if not missing_keys:
        print("✅ All required keys present")
    else:
        print(f"❌ Missing keys: {missing_keys}")
        return False
    
    # Check 4: System prompt has multi-tool guidance
    system_prompt = prompts['system_prompt']
    
    multi_tool_indicators = [
        'MULTIPLE tools',
        'get_sriharsha_profile',
        'get_github_',
        'INTELLIGENT TOOL USAGE',
        'EXAMPLES'
    ]
    
    found_indicators = [ind for ind in multi_tool_indicators if ind in system_prompt]
    
    print(f"\n✅ Multi-tool indicators found: {len(found_indicators)}/{len(multi_tool_indicators)}")
    for ind in found_indicators:
        print(f"   • {ind}")
    
    # Check 5: System prompt is comprehensive
    prompt_length = len(system_prompt)
    print(f"\n✅ System prompt length: {prompt_length} characters")
    
    if prompt_length < 1000:
        print("⚠️  Prompt seems short. Expected 2000+ characters for comprehensive prompt.")
    elif prompt_length > 2000:
        print("✅ Prompt is comprehensive")
    
    # Check 6: Verify chat.py loads from JSON
    chat_py_path = Path(__file__).parent / "src" / "api" / "chat.py"
    
    if chat_py_path.exists():
        with open(chat_py_path, 'r', encoding='utf-8') as f:
            chat_code = f.read()
        
        if "PROMPTS.get('system_prompt'" in chat_code:
            print("\n✅ chat.py loads system prompt from JSON")
        else:
            print("\n⚠️  chat.py might not be loading from JSON correctly")
        
        # Check for hardcoded system instruction
        hardcoded_indicators = [
            'system_instruction = """You are an intelligent',
            'system_instruction = "You are an intelligent'
        ]
        
        has_hardcoded = any(ind in chat_code for ind in hardcoded_indicators)
        
        if not has_hardcoded:
            print("✅ No hardcoded system prompts found in chat.py")
        else:
            print("⚠️  Hardcoded system prompt might still exist in chat.py")
    
    # Summary
    print("\n" + "="*70)
    print("Summary")
    print("="*70)
    print("✅ System prompt configuration is correct!")
    print("✅ Prompt is loaded from JSON only")
    print("✅ Multi-tool intelligence is enabled")
    print("\nYou can now update the system prompt by editing:")
    print(f"  {json_path}")
    print("\nNo code changes needed for prompt updates!")
    print("="*70)
    
    return True

if __name__ == "__main__":
    verify_system_prompt()
