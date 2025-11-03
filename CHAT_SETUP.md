# 🤖 Chat Integration Quick Start Guide

Get your AI-powered portfolio chat running in 5 minutes!

## 📋 Prerequisites

- Python 3.8+ installed
- Gemini API key (free to get!)

---

## 🚀 Step-by-Step Setup

### Step 1: Get Your Gemini API Key (2 minutes)

1. Visit: https://makersuite.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key (looks like: `AIzaSyC...`)

### Step 2: Install Backend Dependencies (1 minute)

Open terminal in the `backend` folder:

```bash
cd backend
pip install -r requirements.txt
```

**Windows:**
```bash
cd backend
python -m pip install -r requirements.txt
```

### Step 3: Configure API Key (30 seconds)

Create `.env` file in `backend` folder:

```bash
# Windows PowerShell
cd backend
echo GEMINI_API_KEY=your_api_key_here > .env

# Mac/Linux
cd backend
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

Or manually create `backend/.env` and add:
```
GEMINI_API_KEY=AIzaSyC_your_actual_key_here
```

### Step 4: Start the Backend (10 seconds)

```bash
cd backend
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

✅ **Backend is running!**

### Step 5: Open Your Portfolio (10 seconds)

1. Open `index.html` in your browser
2. Click the **floating chat button** (bottom right)
3. Start chatting! 🎉

---

## 💬 Try These Questions

- "What experience does Sriharsha have with RAG?"
- "Tell me about the TenderGenie project"
- "What are his key technical skills?"
- "Where did he study?"
- "What achievements has he earned?"

---

## 🔧 Troubleshooting

### Backend won't start?

**Error: "Invalid API Key"**
- Double-check your Gemini API key in `.env`
- Make sure there are no extra spaces
- Get a new key if needed

**Error: "Port 8000 already in use"**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

**Error: "Module not found"**
```bash
pip install --upgrade -r requirements.txt
```

### Chat not connecting?

1. **Check if backend is running**
   - Visit: http://localhost:8000
   - You should see: `{"status":"active"}`

2. **Check browser console** (F12)
   - Look for connection errors
   - Check if API URL is correct

3. **CORS Issues?**
   - Make sure backend is running
   - Try: http://127.0.0.1:8000 instead of localhost

### Getting "Failed to connect" message?

1. Backend must be running first
2. Check the backend terminal for errors
3. Verify `.env` file exists with API key
4. Test API directly: http://localhost:8000

---

## 📊 Testing the API

### Test Health Endpoint
```bash
curl http://localhost:8000/
```

Expected response:
```json
{
  "status": "active",
  "service": "Portfolio Chat API"
}
```

### Test Chat Endpoint
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are Sriharsha'\''s skills?"}'
```

### Test Resume Summary
```bash
curl http://localhost:8000/api/resume-summary
```

---

## 🎯 Configuration Options

### Change Backend Port

In `backend/main.py`, line at the end:
```python
uvicorn.run(app, host="0.0.0.0", port=8000)  # Change 8000 to your port
```

### Update Frontend API URL

In `script.js`, find:
```javascript
const CHAT_API_URL = 'http://localhost:8000';
```

Change to your backend URL.

### Enable HTTPS (Production)

In `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Your actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🚀 Deployment Options

### Option 1: Render.com (Free)

1. Push code to GitHub
2. Create account on render.com
3. New Web Service → Connect repo
4. Add environment variable: `GEMINI_API_KEY`
5. Deploy!

### Option 2: Railway.app (Free)

1. Install Railway CLI
2. `railway login`
3. `cd backend && railway init`
4. `railway add GEMINI_API_KEY=your_key`
5. `railway up`

### Option 3: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
```bash
vercel deploy
```

**Backend (Railway):**
```bash
cd backend
railway up
```

Update `script.js` with your Railway URL.

---

## 📈 Usage Limits

**Gemini API Free Tier:**
- ✅ 60 requests per minute
- ✅ 1,500 requests per day
- ✅ Perfect for portfolio use!

**Upgrade if needed:**
- Visit: https://console.cloud.google.com/
- Enable billing for higher limits

---

## 🎨 Customization

### Change AI Personality

Edit `backend/main.py`, find `SYSTEM_PROMPT`:

```python
SYSTEM_PROMPT = """You are a [friendly/professional/casual] AI assistant..."""
```

### Add More Context

In `create_resume_context()` function, add:
```python
return """
    [Your additional context here]
    ...
"""
```

### Modify Chat UI

Edit `index.html`, find `#chat-panel`:
- Change colors
- Adjust sizes
- Add features

---

## ✅ Checklist

Before going live:

- [ ] Backend running without errors
- [ ] API key configured correctly
- [ ] Chat button appears on page
- [ ] Messages send and receive
- [ ] Tested multiple questions
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Deploy backend to cloud
- [ ] Update frontend API URL
- [ ] Test production deployment

---

## 🆘 Need Help?

1. **Check backend logs** - Look for errors in terminal
2. **Check browser console** (F12) - JavaScript errors
3. **Test API directly** - Use curl or Postman
4. **Restart everything** - Fresh start often helps!

---

## 📚 Resources

- [Gemini API Docs](https://ai.google.dev/docs)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [WebSocket Guide](https://fastapi.tiangolo.com/advanced/websockets/)

---

## 🎉 Success!

Once everything is working:

1. Share your portfolio link
2. Show off the AI chat feature
3. Monitor Gemini API usage
4. Collect feedback from visitors

---

**Ready to impress recruiters with AI-powered chat! 🚀**
