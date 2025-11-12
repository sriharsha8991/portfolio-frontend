# Modular Tool Structure Documentation

## Overview
The chat tools have been refactored into a clean, modular structure for better maintainability and scalability.

## Directory Structure
```
src/tools/
├── __init__.py           # Main exports
├── profile_tools.py      # Profile-related tools
├── github_tools.py       # GitHub-related tools
└── tool_registry.py      # Central tool registry
```

## Files

### 1. `profile_tools.py`
**Purpose:** Tools for accessing Sriharsha's professional profile

**Tools:**
- `get_sriharsha_profile()` - Returns complete professional profile

**Data Source:** Loads from `src/prompts/resume_context.json`

**Exports:**
- Function: `get_sriharsha_profile`
- Declaration: `PROFILE_TOOL_DECLARATION`

---

### 2. `github_tools.py`
**Purpose:** Tools for accessing GitHub data

**Tools:**
- `get_github_profile(username)` - Get GitHub profile info
- `get_github_repositories(username, sort, limit)` - Get repositories
- `get_github_stats(username)` - Get comprehensive stats
- `search_github_repositories(query, sort, limit)` - Search repos

**Service:** Uses `GitHubService` from `src/services/github_service.py`

**Exports:**
- Functions: All 4 GitHub tools
- Declarations: `GITHUB_TOOL_DECLARATIONS` (list of 4)

---

### 3. `tool_registry.py`
**Purpose:** Central registry combining all tools

**Exports:**
- `TOOLS` - Combined function declarations for Gemini
- `TOOL_FUNCTIONS` - Function name to callable mapping

**Structure:**
```python
TOOLS = [
    {
        "function_declarations": [
            PROFILE_TOOL_DECLARATION,
            *GITHUB_TOOL_DECLARATIONS
        ]
    }
]

TOOL_FUNCTIONS = {
    "get_sriharsha_profile": get_sriharsha_profile,
    "get_github_profile": get_github_profile,
    "get_github_repositories": get_github_repositories,
    "get_github_stats": get_github_stats,
    "search_github_repositories": search_github_repositories,
}
```

---

### 4. `__init__.py`
**Purpose:** Main entry point for tool imports

**Exports Everything:**
```python
from src.tools import TOOLS, TOOL_FUNCTIONS
from src.tools import get_sriharsha_profile, get_github_profile, ...
```

---

## Usage in chat.py

### Before (Monolithic)
```python
# 200+ lines of tool functions and declarations in chat.py
async def get_sriharsha_profile(): ...
async def get_github_profile(): ...
TOOLS = [{ ... 150 lines of declarations ... }]
TOOL_FUNCTIONS = { ... }
```

### After (Modular)
```python
from src.tools import TOOLS, TOOL_FUNCTIONS

# That's it! All tools are imported
```

---

## Benefits

### 1. **Separation of Concerns**
- Profile tools isolated in `profile_tools.py`
- GitHub tools isolated in `github_tools.py`
- Chat API just handles conversation flow

### 2. **Easy to Extend**
To add new tools:
1. Create new file (e.g., `linkedin_tools.py`)
2. Define functions and declarations
3. Import in `tool_registry.py`
4. Done!

### 3. **Better Testing**
Each tool module can be tested independently:
```python
from src.tools.github_tools import get_github_stats
stats = await get_github_stats("sriharsha8991")
```

### 4. **Cleaner Imports**
```python
# Import everything
from src.tools import TOOLS, TOOL_FUNCTIONS

# Or import specific tools
from src.tools import get_sriharsha_profile
```

### 5. **Reduced File Size**
- `chat.py`: 394 lines → 180 lines (54% reduction)
- Tool logic: Now in separate files

---

## Adding New Tools

### Step 1: Create Tool File
```python
# src/tools/new_tool.py
async def my_new_tool(param: str) -> dict:
    """Tool description"""
    return {"result": "data"}

NEW_TOOL_DECLARATION = {
    "name": "my_new_tool",
    "description": "...",
    "parameters": { ... }
}
```

### Step 2: Register in Registry
```python
# src/tools/tool_registry.py
from .new_tool import my_new_tool, NEW_TOOL_DECLARATION

TOOLS = [
    {
        "function_declarations": [
            PROFILE_TOOL_DECLARATION,
            *GITHUB_TOOL_DECLARATIONS,
            NEW_TOOL_DECLARATION  # Add here
        ]
    }
]

TOOL_FUNCTIONS = {
    ...existing...,
    "my_new_tool": my_new_tool  # Add here
}
```

### Step 3: Export in __init__.py
```python
# src/tools/__init__.py
from .new_tool import my_new_tool

__all__ = [
    ...existing...,
    'my_new_tool'
]
```

That's it! The tool is now available in chat API.

---

## Testing

### Run Full Test
```bash
python test_modular_tools.py
```

### Test Individual Tools
```python
import asyncio
from src.tools import get_github_stats

async def test():
    stats = await get_github_stats("sriharsha8991")
    print(stats)

asyncio.run(test())
```

---

## Migration Summary

### Files Created
- ✅ `src/tools/__init__.py`
- ✅ `src/tools/profile_tools.py`
- ✅ `src/tools/github_tools.py`
- ✅ `src/tools/tool_registry.py`

### Files Modified
- ✅ `src/api/chat.py` - Removed 200+ lines, now imports from `src.tools`

### Lines of Code
- **Before:** 394 lines in `chat.py`
- **After:** 180 lines in `chat.py` + 4 modular tool files
- **Net Result:** Better organization, same functionality

---

## File Sizes

| File | Lines | Purpose |
|------|-------|---------|
| `profile_tools.py` | 40 | Profile tool + declaration |
| `github_tools.py` | 160 | 4 GitHub tools + declarations |
| `tool_registry.py` | 30 | Central registry |
| `__init__.py` | 20 | Exports |
| **Total** | **250** | All tool logic |

---

## Architecture Diagram

```
chat.py
   ↓ imports
src/tools/__init__.py
   ↓ imports
├── profile_tools.py → RESUME_DATA
├── github_tools.py → GitHubService
└── tool_registry.py → Combines all tools

Result: TOOLS + TOOL_FUNCTIONS available in chat.py
```

---

## Next Steps

1. ✅ Test with `python test_modular_tools.py`
2. ✅ Run chat API: `python main.py`
3. ✅ Verify tools work in chat endpoint
4. 🔄 Add more tools as needed (LinkedIn, Twitter, etc.)

---

## Conclusion

The refactoring provides:
- **Modularity:** Each tool type in its own file
- **Scalability:** Easy to add new tools
- **Maintainability:** Changes isolated to specific files
- **Testability:** Test tools independently
- **Clarity:** Clean imports, clear structure

The chat API is now cleaner and more maintainable! 🚀
