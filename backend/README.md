# Portfolio Chat API Backend

FastAPI backend with **Google GenAI SDK** integration and **GitHub Service** for intelligent portfolio conversations.

## 🆕 Latest Updates

### Gemini Tool Calling Integration (v2.0)
The chat API now uses **Gemini's native function calling** to dynamically fetch information:
- ✅ Real-time data fetching instead of static context
- ✅ 5 specialized tools for profile and GitHub data
- ✅ Automatic tool selection based on user queries
- ✅ Multi-tool support for complex questions
- ✅ Transparent tool usage tracking

[Learn more about Tool Calling →](CHAT_TOOL_CALLING.md)

### GitHub Service Integration
New comprehensive GitHub service to fetch:
- 👤 User profiles and statistics
- 📦 Repositories with detailed information
- ⭐ Contribution statistics and achievements
- 🔍 Repository search functionality
- 💻 Programming language analysis

[Learn more about GitHub Service →](GITHUB_SERVICE.md)

## Features

- 🤖 **Gemini 2.0 Integration**: Powered by Google's latest Gemini 2.0 Flash Experimental model
- 🛠️ **Function Calling**: AI automatically calls tools to fetch real-time data
- 🐙 **GitHub Integration**: Live GitHub profile and repository data
- 💬 **Real-time Chat**: WebSocket support for instant responses
- 📄 **Dynamic Context**: AI fetches information on-demand using tools
- 🛡️ **Smart Filtering**: Only answers questions about Sriharsha's professional background
- 🚀 **Fast & Efficient**: Built with FastAPI for high performance
- 📊 **Conversation History**: Maintains context across messages
- 🔧 **Modern SDK**: Uses latest Google GenAI SDK standards

## Prerequisites

- Python 3.8+
- Gemini API Key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- GitHub Personal Access Token (optional but recommended) from [GitHub Settings](https://github.com/settings/tokens)

## Quick Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Note**: This installs `google-genai` (new SDK) and `aiohttp` for GitHub API.

### 2. Get API Keys

**Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

**GitHub Token (Optional but Recommended):**
1. Visit [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo`, `read:user`
4. Copy your token

### 3. Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your keys:

```bash
# Required
GOOGLE_API_KEY=your_gemini_api_key_here

# Optional but recommended for GitHub features
GITHUB_TOKEN=your_github_token_here
```

### 4. Run the Server

```bash
python main.py
```

Or with uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server will start at: `http://localhost:8000`

## API Endpoints

### Chat API (with Tool Calling)

**POST** `/api/chat`

Send a message and get AI response with automatic tool calling.

### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "status": "active",
  "service": "Portfolio Chat API",
  "version": "1.0.0"
}
```

### 2. Chat (HTTP)
```http
POST /api/chat
Content-Type: application/json

{
  "message": "What experience does Sriharsha have with RAG?",
  "conversation_history": []
}
```

**Response:**
```json
{
  "response": "Sriharsha has extensive experience with RAG...",
  "timestamp": "2025-11-03T23:45:00",
  "tools_used": ["get_sriharsha_profile"]
}
```

**Note**: The `tools_used` field shows which tools were called to answer the query.

### 3. GitHub Endpoints

See [GITHUB_SERVICE.md](GITHUB_SERVICE.md) for detailed documentation on:
- `GET /github/profile` - Get GitHub profile
- `GET /github/repositories` - Get repositories
- `GET /github/stats/{username}` - Get GitHub statistics
- `GET /github/search/repositories` - Search repositories
- And more...
  "role": "Gen AI Engineer",
  "key_skills": ["Python", "FastAPI", "RAG", ...]
}
```

### 4. WebSocket Chat
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/chat');

ws.onopen = () => {
  ws.send(JSON.stringify({ message: "Hello!" }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data.response);
};
```

## Testing with cURL

```bash
# Health check
curl http://localhost:8000/

# Send chat message
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are Sriharsha'\''s key skills?"}'

# Get resume summary
curl http://localhost:8000/api/resume-summary
```

## Testing with Python

```python
import requests

# Chat endpoint
response = requests.post(
    "http://localhost:8000/api/chat",
    json={
        "message": "Tell me about Sriharsha's experience at DatasmithAI",
        "conversation_history": []
    }
)
print(response.json()["response"])
```

## How It Works (with Tool Calling)

1. **User Query**: User asks a question via the chat endpoint
2. **Gemini Analysis**: AI analyzes the query and decides which tools to use
3. **Tool Selection**: Based on the query, Gemini selects appropriate tools:
   - Profile questions → `get_sriharsha_profile()`
   - GitHub questions → GitHub tools
4. **Tool Execution**: Selected tools fetch real-time data
5. **Response Generation**: Gemini uses tool responses to formulate answer
6. **Return**: Final response with `tools_used` metadata

### Available Tools

1. **`get_sriharsha_profile()`** - Professional profile, skills, experience
2. **`get_github_profile(username)`** - GitHub profile information
3. **`get_github_repositories(username, sort, limit)`** - Repository list
4. **`get_github_stats(username)`** - GitHub statistics
5. **`search_github_repositories(query, sort, limit)`** - Repository search

## AI Behavior

The AI assistant will:

✅ Answer questions about:
- Professional experience and work history
- Technical skills and expertise
- Projects and achievements
- Education background
- Career accomplishments
- GitHub repositories and statistics
- Coding projects and contributions

❌ Politely decline to answer:
- Personal life questions
- Off-topic conversations
- Information not available via tools
- Speculative questions

## Example Conversations

**Good Questions:**
- "What experience does Sriharsha have with LLMs?"
- "Tell me about the TenderGenie project"
- "What are his key technical skills?"
- "Show me his GitHub repositories"
- "What are his most popular GitHub projects?"
- "Find his Python projects on GitHub"
- "What are his GitHub statistics?"

**How AI Uses Tools:**
```
User: "What are Sriharsha's skills in AI?"
AI: Calls get_sriharsha_profile() → Gets skills data → Responds with specific skills

User: "Show me his GitHub projects"
AI: Calls get_github_repositories() → Gets repos → Lists projects with details

User: "Tell me about his work and show GitHub stats"
AI: Calls get_sriharsha_profile() AND get_github_stats() → Combines data → Comprehensive response
```

## Testing

### Test Chat with Tools
```bash
python test_chat_tools.py
```

### Test GitHub Service
```bash
python test_github.py
```

## Production Deployment

### Option 1: Docker

Create `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t portfolio-chat-api .
docker run -p 8000:8000 --env-file .env portfolio-chat-api
```

### Option 2: Cloud Platforms

**Azure App Service:**
```bash
az webapp up --name portfolio-chat-api --resource-group myResourceGroup
```

**Google Cloud Run:**
```bash
gcloud run deploy portfolio-chat-api --source .
```

**Heroku:**
```bash
heroku create portfolio-chat-api
git push heroku main
```

## Connecting to Frontend

Update `script.js` in your portfolio:

```javascript
// HTTP endpoint
async function sendChatMessage(message) {
    const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: message,
            conversation_history: chatHistory
        })
    });
    const data = await response.json();
    return data.response;
}

// WebSocket
const ws = new WebSocket('ws://localhost:8000/ws/chat');
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    displayMessage(data.response);
};
```

## Troubleshooting

### Error: "Invalid API Key"
- Verify your Gemini API key in `.env`
- Get a new key from Google AI Studio

### Error: "Port already in use"
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

### CORS Issues
- Update `allow_origins` in `main.py`
- Add your frontend URL to CORS settings

## API Rate Limits

**Gemini API Free Tier:**
- 60 requests per minute
- 1,500 requests per day

For production, consider:
- Implementing rate limiting
- Adding request caching
- Using paid tier for higher limits

## Security Best Practices

1. ✅ Never commit `.env` file
2. ✅ Use environment variables for secrets
3. ✅ Implement rate limiting
4. ✅ Add input validation
5. ✅ Use HTTPS in production
6. ✅ Restrict CORS origins

## Monitoring

Add logging:
```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/api/chat")
async def chat(request: ChatRequest):
    logger.info(f"Chat request: {request.message[:50]}...")
    # ... rest of code
```

## Future Enhancements

- [ ] Add conversation memory storage
- [ ] Implement semantic search on resume
- [ ] Add voice input/output
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] A/B testing for prompts

## Support

For issues or questions:
- Check documentation: [FastAPI Docs](https://fastapi.tiangolo.com/)
- Gemini API: [Google AI Docs](https://ai.google.dev/)

## License

Personal project - All rights reserved.

---

**Built with ❤️ using FastAPI and Gemini AI**
