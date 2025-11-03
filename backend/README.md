# Portfolio Chat API Backend

FastAPI backend with **Google GenAI SDK** integration for intelligent portfolio conversations.

## 🆕 Updated to Google GenAI SDK (v2.0)

This backend now uses the **new Google GenAI SDK** (GA release) as per Google's official migration guide. Benefits include:
- ✅ Improved developer experience with centralized `Client` object
- ✅ Better API access patterns through `client.models.*`
- ✅ Enhanced configuration with `GenerateContentConfig`
- ✅ Pydantic-based response objects for better type safety
- ✅ Simplified authentication using environment variables

[Read the Migration Guide →](https://ai.google.dev/gemini-api/docs/migrate)

## Features

- 🤖 **Gemini 2.0 Integration**: Powered by Google's latest Gemini 2.0 Flash Experimental model
- 💬 **Real-time Chat**: WebSocket support for instant responses
- 📄 **Resume Context**: AI uses resume information to answer questions
- 🛡️ **Smart Filtering**: Only answers questions about Sriharsha's professional background
- 🚀 **Fast & Efficient**: Built with FastAPI for high performance
- 📊 **Conversation History**: Maintains context across messages
- 🔧 **Modern SDK**: Uses latest Google GenAI SDK standards

## Prerequisites

- Python 3.8+
- Gemini API Key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Quick Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Note**: This will install `google-genai` (the new SDK), not `google-generativeai` (legacy).

### 2. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 3. Configure Environment

The new SDK automatically picks up your API key from environment variables:

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```
GEMINI_API_KEY=your_actual_api_key_here
# Or alternatively:
# GOOGLE_API_KEY=your_actual_api_key_here
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
  "timestamp": "2025-11-03T23:45:00"
}
```

### 3. Resume Summary
```http
GET /api/resume-summary
```

**Response:**
```json
{
  "name": "Sriharsha Velicheti",
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

## How It Works

1. **Context Loading**: Resume information is loaded as context
2. **Prompt Engineering**: System prompt guides AI behavior
3. **Query Processing**: User questions are combined with resume context
4. **AI Generation**: Gemini generates factual responses
5. **Response Validation**: Only professional career topics are discussed

## AI Behavior

The AI assistant will:

✅ Answer questions about:
- Professional experience
- Technical skills
- Projects and achievements
- Education background
- Career accomplishments

❌ Politely decline to answer:
- Personal life questions
- Off-topic conversations
- Information not in resume
- Speculative questions

## Example Conversations

**Good Questions:**
- "What experience does Sriharsha have with LLMs?"
- "Tell me about the TenderGenie project"
- "What are his key technical skills?"
- "Where did he study?"
- "What achievements has he earned?"

**Off-Topic Handling:**
```
User: "What's the weather today?"
AI: "I'm here to help you learn about Sriharsha's professional 
     background. Please ask me about his experience, skills, 
     projects, or education."
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
