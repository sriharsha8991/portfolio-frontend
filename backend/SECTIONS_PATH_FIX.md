# Sections.json Path Fix - Deployment Issue Resolution

## Problem
The application was failing on Render deployment with:
```
FileNotFoundError: [Errno 2] No such file or directory: '/sections.json'
```

The `NavigationService` couldn't find `sections.json` because it was looking at an absolute path that doesn't exist in the container/deployment environment.

## Root Cause
- `sections.json` exists in the project root directory
- The backend code runs from the `backend/` subdirectory
- Different deployment environments (local, Docker, Render) have different file structures
- The original code only checked one path, which didn't work in all environments

## Solution

### 1. **Updated Dockerfile** (`backend/Dockerfile`)
Added explicit copy of `sections.json` from parent directory:
```dockerfile
# Copy sections.json from parent directory
COPY ../sections.json /app/sections.json
```

### 2. **Updated NavigationService** (`backend/src/services/navigation_service.py`)
Implemented multi-path resolution to handle different environments:
```python
possible_paths = [
    Path('/app/sections.json'),  # Docker container path
    Path(__file__).resolve().parent.parent.parent.parent / 'sections.json',  # Local development
    Path('/opt/render/project/src/sections.json'),  # Render deployment path
    Path(__file__).resolve().parent.parent.parent / 'sections.json',  # Render relative path
]
```

The service now tries each path in order and uses the first one that exists.

### 3. **Updated Render Configuration** (`backend/render.yaml`)
Added build command to copy `sections.json`:
```yaml
rootDir: backend
buildCommand: |
  pip install -r requirements.txt
  cp ../sections.json /opt/render/project/src/sections.json || cp ../sections.json ./sections.json
```

## Testing

### Local Testing
✅ Run the test script:
```bash
cd backend
python test_sections_path.py
```

### Docker Testing
✅ Build and test the Docker image:
```bash
cd backend
docker build -t portfolio-backend .
docker run -p 8080:8080 -e GOOGLE_API_KEY=your_key portfolio-backend
```

### Render Deployment
✅ Push to GitHub and Render will automatically deploy with the updated configuration

## Files Modified
1. `backend/Dockerfile` - Added sections.json copy step
2. `backend/src/services/navigation_service.py` - Multi-path resolution
3. `backend/render.yaml` - Updated build command with rootDir and copy command
4. `backend/test_sections_path.py` - Created test utility

## Next Steps
1. Commit and push changes to GitHub
2. Render will automatically redeploy
3. Monitor deployment logs to verify sections.json is found
4. Test the chat endpoint to ensure navigation works

## Environment Variables Required
- `GOOGLE_API_KEY` or `GEMINI_API_KEY` - For the Gemini API

## Deployment Command
```bash
git add .
git commit -m "Fix sections.json path resolution for deployment"
git push origin hero_section_new
```

Render will automatically detect the changes and redeploy.
