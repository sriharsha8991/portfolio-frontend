"""
Test script to verify navigation tools are properly registered
"""
import asyncio
from src.tools.tool_registry import TOOL_FUNCTIONS, TOOLS

async def test_navigation_tools():
    print("=" * 60)
    print("NAVIGATION TOOLS TEST")
    print("=" * 60)
    
    # Check if navigation tools are registered
    navigation_tools = [name for name in TOOL_FUNCTIONS.keys() if name.startswith('navigate_to_')]
    
    print(f"\n✅ Total tools registered: {len(TOOL_FUNCTIONS)}")
    print(f"✅ Navigation tools found: {len(navigation_tools)}")
    print("\nNavigation Tools:")
    for tool in navigation_tools:
        print(f"  - {tool}")
    
    # Test calling a navigation tool
    print("\n" + "=" * 60)
    print("TESTING navigate_to_projects()")
    print("=" * 60)
    
    result = await TOOL_FUNCTIONS['navigate_to_projects'](reason="Testing navigation")
    
    print("\nResult:")
    for key, value in result.items():
        print(f"  {key}: {value}")
    
    # Verify the result structure
    assert result['action'] == 'navigate', "❌ Action should be 'navigate'"
    assert result['section_id'] == 'projects', "❌ Section ID should be 'projects'"
    assert result['success'] == True, "❌ Success should be True"
    
    print("\n✅ All assertions passed!")
    
    # Check tool declarations
    print("\n" + "=" * 60)
    print("TOOL DECLARATIONS")
    print("=" * 60)
    
    total_declarations = len(TOOLS[0]['function_declarations'])
    navigation_declarations = [
        decl for decl in TOOLS[0]['function_declarations'] 
        if decl['name'].startswith('navigate_to_')
    ]
    
    print(f"\n✅ Total function declarations: {total_declarations}")
    print(f"✅ Navigation declarations: {len(navigation_declarations)}")
    
    print("\nNavigation Tool Declarations:")
    for decl in navigation_declarations:
        print(f"  - {decl['name']}: {decl['description'][:60]}...")
    
    print("\n" + "=" * 60)
    print("✅ ALL TESTS PASSED!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(test_navigation_tools())
