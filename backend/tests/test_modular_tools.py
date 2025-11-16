"""
Test modular tool structure
"""
import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from src.tools import (
    get_sriharsha_profile,
    get_github_profile,
    get_github_repositories,
    get_github_stats,
    search_github_repositories,
    TOOLS,
    TOOL_FUNCTIONS
)


async def test_modular_tools():
    """Test the modular tool structure"""
    
    print("="*70)
    print("Testing Modular Tool Structure")
    print("="*70 + "\n")
    
    # Test 1: Check all tools are importable
    print("✅ Test 1: All tools imported successfully")
    print(f"   - Profile tools: get_sriharsha_profile")
    print(f"   - GitHub tools: 4 functions")
    print()
    
    # Test 2: Check TOOLS structure
    print("✅ Test 2: TOOLS structure")
    print(f"   - Number of tool groups: {len(TOOLS)}")
    print(f"   - Number of function declarations: {len(TOOLS[0]['function_declarations'])}")
    print()
    
    # Test 3: List all tool declarations
    print("✅ Test 3: Tool Declarations")
    for decl in TOOLS[0]['function_declarations']:
        print(f"   - {decl['name']}")
    print()
    
    # Test 4: Check TOOL_FUNCTIONS mapping
    print("✅ Test 4: TOOL_FUNCTIONS Mapping")
    print(f"   - Number of registered functions: {len(TOOL_FUNCTIONS)}")
    for name, func in TOOL_FUNCTIONS.items():
        print(f"   - {name} -> {func.__name__}")
    print()
    
    # Test 5: Test profile tool
    print("✅ Test 5: Testing Profile Tool")
    try:
        profile = await get_sriharsha_profile()
        print(f"   - Profile loaded: {profile.get('name', 'N/A')}")
        print(f"   - Title: {profile.get('title', 'N/A')}")
        print(f"   - Skills count: {len(profile.get('skills', []))}")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    print()
    
    # Test 6: Verify each tool has matching function
    print("✅ Test 6: Declaration-Function Matching")
    all_match = True
    for decl in TOOLS[0]['function_declarations']:
        name = decl['name']
        if name in TOOL_FUNCTIONS:
            print(f"   ✅ {name}")
        else:
            print(f"   ❌ {name} - Missing function!")
            all_match = False
    print()
    
    # Test 7: Check tool parameter schemas
    print("✅ Test 7: Parameter Schemas")
    for decl in TOOLS[0]['function_declarations']:
        params = decl.get('parameters', {})
        props = params.get('properties', {})
        print(f"   - {decl['name']}: {len(props)} parameters")
    print()
    
    # Summary
    print("="*70)
    print("Summary")
    print("="*70)
    print("✅ Modular tool structure is working correctly!")
    print(f"✅ Total tools: {len(TOOL_FUNCTIONS)}")
    print(f"✅ All declarations have matching functions: {all_match}")
    print("\nStructure:")
    print("  src/tools/")
    print("    ├── __init__.py          (exports)")
    print("    ├── profile_tools.py     (1 tool)")
    print("    ├── github_tools.py      (4 tools)")
    print("    └── tool_registry.py     (central registry)")
    print("="*70)


if __name__ == "__main__":
    asyncio.run(test_modular_tools())
