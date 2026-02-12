# Portfolio Project - AI Agent Instructions

## Architecture Overview

This is a **dual-component portfolio website** with a vanilla JavaScript frontend and a FastAPI backend powered by **dual Gemini LLM instances** for intelligent chat and navigation.

### Frontend
- **Stack**: Vanilla HTML/CSS/JavaScript, Tailwind CSS CDN, Chart.js
- **Entry Point**: `index.html` (single-page app with scroll-based navigation)
- **Config**: `config.js` (environment-aware API endpoints, feature flags)
- **Sections**: `sections.json` (defines all portfolio sections for navigation)
use  the Skills section[.github\skills\frontend-design\SKILL.md] as an example for how to structure new sections in frontend especially 

### Backend (FastAPI + Gemini AI)
- **Entry Point**: `backend/main.py`
- **Architecture**: Dual LLM service pattern with separate concerns
  - **NavigationService** (`src/services/navigation_service.py`): Gemini 2.5 Flash - determines which section to navigate to
  - **AnswerService** (`src/services/answer_service.py`): Gemini 2.0 Flash - answers questions using tools
- **Chat Flow**: Sequential execution: NavigationService → AnswerService → Combined response
- **Tools**: Modular system in `src/tools/` with central registry pattern

## Critical Patterns

### 1. Dual LLM Service Architecture
**NEVER merge the two services** - they serve distinct purposes:
```python
# NavigationService: Fast section routing (uses navigation tools only)
navigation_service = NavigationService()  # Gemini 2.5 Flash
actions = await navigation_service.get_navigation(message, history)

# AnswerService: Detailed Q&A (uses profile + GitHub tools only)
answer_service = AnswerService()  # Gemini 2.0 Flash
response, tools = await answer_service.get_response(message, history)
```
See `backend/src/api/chat.py` for the sequential execution pattern.

### 2. Modular Tool System
Tools are organized by domain in `backend/src/tools/`:
- **profile_tools.py**: `get_sriharsha_profile()` - loads from `prompts/resume_context.json`
- **github_tools.py**: 4 GitHub API tools via `GitHubService`
- **navigation_tools.py**: 8 section navigation actions
- **tool_registry.py**: Central registry combining all tool declarations

**Pattern**: Each module exports both function implementations AND Gemini-compatible declarations:
```python
# In github_tools.py
async def get_github_profile(username: str): ...
GITHUB_TOOL_DECLARATIONS = [{...}]  # Gemini function calling schema
```

### 3. Multi-Path Resolution (Critical for Deployment)
`sections.json` lives at project root but backend runs from `backend/` directory. **Always use multi-path resolution** for cross-environment compatibility:
```python
possible_paths = [
    Path('/app/sections.json'),  # Docker
    Path(__file__).resolve().parent.parent.parent.parent / 'sections.json',  # Local dev
    Path('/opt/render/project/src/sections.json'),  # Render deployment
]
```
See `SECTIONS_PATH_FIX.md` for why this matters. Same pattern applies to `prompts/resume_context.json`.

### 4. Frontend-Backend Integration
Frontend uses environment-aware configuration:
```javascript
// config.js auto-detects environment
const env = CONFIG.getCurrentEnvironment();
const apiUrl = env.apiUrl;  // http://127.0.0.1:8000 (dev) or production URL
```

## Development Workflows

### Running Locally
```bash
# Backend (from backend/)
python main.py  # Starts on localhost:8000

# Frontend
# Open index.html directly in browser (no build needed)
```

### Testing
**No pytest** - tests use direct async execution:
```bash
cd backend/tests
python test_modular_tools.py
python test_chat_tools.py
python test_github.py
```
All tests follow pattern: `async def test_X(): ...` + `asyncio.run(test_X())`

### Deployment
- **Backend**: Render.com via `backend/render.yaml`
  - Critical: `buildCommand` copies `sections.json` to deployment path
  - Environment variable: `GEMINI_API_KEY` (not GOOGLE_API_KEY in production)
- **Frontend**: Static hosting (GitHub Pages, Netlify, etc.)

## Project-Specific Conventions

### 1. Prompt Management
System prompts live in `backend/src/prompts/system_prompts.json`:
```json
{
  "system_prompt": "Answer Service prompt...",
  "navigation_prompt": "Navigation Service prompt..."
}
```
Services load their specific prompts at initialization. Resume data is in `resume_context.json`.

### 2. Tool Declaration Pattern
Every tool follows this structure:
```python
async def tool_function(param: str):
    """Implementation"""
    return result

TOOL_DECLARATION = {
    "name": "tool_function",
    "description": "Clear description for LLM",
    "parameters": {...}  # JSON schema
}
```

### 3. Environment Variables
```bash
# .env file (backend/)
GOOGLE_API_KEY=...      # For local development
GITHUB_TOKEN=...        # Optional but recommended (rate limits)
```

### 4. CORS Configuration
Backend allows all origins (`allow_origins=["*"]`) for development. Update for production in `backend/main.py`.

## Key Files to Understand

- `backend/src/api/chat.py` - Dual LLM orchestration logic
- `backend/src/tools/tool_registry.py` - Central tool declaration registry
- `backend/src/services/navigation_service.py` - Section routing with multi-path resolution
- `backend/MODULAR_TOOLS.md` - Tool system architecture documentation
- `config.js` - Environment detection and feature flags
- `sections.json` - **Single source of truth** for portfolio sections

## Adding New Features

### New Tool
1. Create tool function in appropriate `backend/src/tools/X_tools.py`
2. Add Gemini function declaration in same file
3. Export both in module's `__all__`
4. Import and register in `tool_registry.py`
5. Add to appropriate service's tool configuration

### New Portfolio Section
1. Add section to `sections.json` (id, name, link, description)
2. Add HTML section to `index.html`
3. Create navigation tool in `navigation_tools.py`
4. Update NavigationService prompt with new section mapping

## Common Gotchas

- ❌ **Don't** use absolute imports like `from backend.src...` - use relative `from src...`
- ❌ **Don't** deploy without copying `sections.json` to backend runtime path
- ❌ **Don't** mix navigation tools into AnswerService or vice versa
- ✅ **Do** use multi-path resolution for any cross-directory file access
- ✅ **Do** test changes with both services independently
- ✅ **Do** check `config.js` environment detection works for your deployment target
