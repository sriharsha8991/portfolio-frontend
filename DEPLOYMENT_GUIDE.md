# 🚀 Complete Deployment Guide - Portfolio with AI Chat

Deploy your portfolio frontend and Gemini AI backend using GitHub.

## 📋 Deployment Overview

| Component | Platform | Cost | Deployment Time |
|-----------|----------|------|-----------------|
| **Frontend** | GitHub Pages | Free | 2 minutes |
| **Backend** | Render / Railway / Vercel | Free Tier | 5 minutes |

---

## 🎨 Frontend Deployment (GitHub Pages)

### Option 1: Quick Deploy (Recommended)

**Step 1: Push to GitHub**

```bash
cd "C:/Users/SriharshaVelicheti/OneDrive - Datasmith AI Solutions Pvt Ltd/Desktop/personal/Portfolio"

# Add all files
git add .
git commit -m "Add AI chat backend with Gemini integration"
git push origin hero_section_new
```

**Step 2: Merge to Main Branch**

```bash
# Switch to main branch
git checkout main

# Merge your changes
git merge hero_section_new

# Push to main
git push origin main
```

**Step 3: Enable GitHub Pages**

1. Go to: https://github.com/sriharsha8991/portfolio-frontend
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes

**Your frontend will be live at:**
```
https://sriharsha8991.github.io/portfolio-frontend/
```

### Option 2: Custom Domain (Optional)

1. Buy domain from Namecheap/GoDaddy (e.g., `sriharshavelicheti.com`)
2. In GitHub Pages settings, add custom domain
3. Add DNS records:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   
   Type: CNAME
   Host: www
   Value: sriharsha8991.github.io
   ```

---

## 🤖 Backend Deployment

### Option 1: Render.com (Easiest - Recommended)

**Why Render?**
- ✅ Free tier (750 hours/month)
- ✅ Auto-deploys from GitHub
- ✅ Built-in SSL
- ✅ Easy environment variables

**Steps:**

**1. Create `render.yaml` for auto-deploy**

Create this file in your `backend/` folder:

```yaml
services:
  - type: web
    name: portfolio-chat-api
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: GEMINI_API_KEY
        sync: false
      - key: PYTHON_VERSION
        value: 3.11.0
```

**2. Push backend to GitHub**

```bash
cd backend
git add render.yaml
git commit -m "Add Render deployment config"
git push origin main
```

**3. Deploy on Render**

1. Go to: https://render.com
2. Sign up with GitHub account
3. Click **New** → **Web Service**
4. Connect your repository: `portfolio-frontend`
5. Configure:
   - **Name**: `portfolio-chat-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variable:
   - Key: `GEMINI_API_KEY`
   - Value: `your_gemini_api_key_here`
7. Click **Create Web Service**
8. Wait 3-5 minutes for deployment

**Your backend will be live at:**
```
https://portfolio-chat-api-xxxx.onrender.com
```

**4. Update Frontend API URL**

Edit `script.js` (line ~270):

```javascript
// Update this line with your Render URL
const CHAT_API_URL = 'https://portfolio-chat-api-xxxx.onrender.com';
```

Commit and push:
```bash
git add script.js
git commit -m "Update API URL to Render backend"
git push origin main
```

---

### Option 2: Railway.app (Fast & Modern)

**Why Railway?**
- ✅ $5 free credit/month
- ✅ Fastest deployment
- ✅ Great developer experience

**Steps:**

**1. Install Railway CLI**

```bash
# Windows (PowerShell)
iwr https://railway.app/install.ps1 | iex

# Or use npm
npm install -g @railway/cli
```

**2. Deploy Backend**

```bash
cd backend

# Login to Railway
railway login

# Initialize project
railway init

# Add environment variable
railway variables set GEMINI_API_KEY=your_api_key_here

# Deploy
railway up
```

**3. Get Your URL**

```bash
railway domain
```

Copy the URL (e.g., `https://your-app.up.railway.app`) and update `script.js`.

---

### Option 3: Vercel (Serverless)

**Why Vercel?**
- ✅ Completely free
- ✅ Serverless architecture
- ✅ Great for FastAPI

**Steps:**

**1. Create `vercel.json` in backend folder:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.py"
    }
  ],
  "env": {
    "GEMINI_API_KEY": "@gemini-api-key"
  }
}
```

**2. Install Vercel CLI**

```bash
npm install -g vercel
```

**3. Deploy**

```bash
cd backend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? portfolio-chat-api
# - Directory? ./
```

**4. Add Environment Variable**

```bash
vercel env add GEMINI_API_KEY
# Paste your API key when prompted
```

**5. Redeploy**

```bash
vercel --prod
```

---

### Option 4: Google Cloud Run (Scalable)

**Why Cloud Run?**
- ✅ Free tier (2M requests/month)
- ✅ Highly scalable
- ✅ Integrated with Google services

**Steps:**

**1. Create `Dockerfile` in backend folder:**

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

**2. Install Google Cloud CLI**

Download from: https://cloud.google.com/sdk/docs/install

**3. Deploy**

```bash
cd backend

# Login
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Deploy
gcloud run deploy portfolio-chat-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_api_key_here
```

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS in Backend

Edit `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://sriharsha8991.github.io",  # Your GitHub Pages URL
        "http://localhost:5500",  # Local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2. Update Frontend API URL

Edit `script.js` (around line 270):

```javascript
const CHAT_API_URL = 'https://your-backend-url.com';

// Examples:
// Render: 'https://portfolio-chat-api-xxxx.onrender.com'
// Railway: 'https://your-app.up.railway.app'
// Vercel: 'https://portfolio-chat-api.vercel.app'
// Cloud Run: 'https://portfolio-chat-api-xxxxx-uc.a.run.app'
```

### 3. Test Production Setup

```bash
# Test backend
curl https://your-backend-url.com/

# Should return:
# {"status":"active","service":"Portfolio Chat API",...}
```

Open your frontend and test the chat button!

---

## 📊 Deployment Comparison

| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| **Render** | Easy setup, auto-deploy | Cold starts on free tier | Beginners |
| **Railway** | Fast, modern UI | Limited free tier | Quick deploys |
| **Vercel** | Truly free, serverless | Complex for WebSockets | Simple APIs |
| **Cloud Run** | Highly scalable | Requires GCP setup | Production apps |

**My Recommendation: Start with Render.com** ✅

---

## 🎯 Complete Deployment Checklist

### Pre-Deployment
- [ ] Get Gemini API key from https://makersuite.google.com/app/apikey
- [ ] Test backend locally (`python main.py`)
- [ ] Test chat functionality
- [ ] Commit all changes to GitHub

### Backend Deployment
- [ ] Choose platform (Render/Railway/Vercel/Cloud Run)
- [ ] Create deployment config files
- [ ] Deploy backend
- [ ] Add `GEMINI_API_KEY` environment variable
- [ ] Test backend health endpoint
- [ ] Copy backend URL

### Frontend Deployment
- [ ] Update `script.js` with backend URL
- [ ] Update CORS settings in backend
- [ ] Commit changes
- [ ] Enable GitHub Pages
- [ ] Wait for deployment (1-2 minutes)
- [ ] Test live site

### Post-Deployment Testing
- [ ] Visit your GitHub Pages URL
- [ ] Test dark/light theme
- [ ] Test all sections load
- [ ] Click chat button
- [ ] Send test message
- [ ] Verify AI responds correctly
- [ ] Test on mobile device
- [ ] Check browser console for errors

---

## 🐛 Troubleshooting

### "Chat not connecting"

**Problem**: Frontend can't reach backend

**Solutions:**
1. Check backend URL in `script.js`
2. Verify backend is running (visit `/` endpoint)
3. Check CORS settings allow your frontend domain
4. Check browser console (F12) for error details

### "Failed to fetch"

**Problem**: CORS or network error

**Solution**: Update CORS in `backend/main.py`:
```python
allow_origins=["https://sriharsha8991.github.io"]
```

### "Invalid API Key"

**Problem**: Gemini API key not set or incorrect

**Solutions:**
1. Verify key is set in platform's environment variables
2. Check key is valid at https://makersuite.google.com/app/apikey
3. Redeploy backend after adding key

### "This site can't be reached"

**Problem**: Backend cold start (Render free tier)

**Solution**: Wait 30-60 seconds for backend to wake up. First request is slow.

### "GitHub Pages not showing updates"

**Problem**: Browser cache

**Solutions:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Wait 5 minutes for GitHub Pages to rebuild
4. Check GitHub Actions for deployment status

---

## 💡 Pro Tips

### 1. Keep Backend Warm (Render/Railway)

Free tier backends sleep after 15 minutes of inactivity. Keep them warm:

**Use a cron service:**
```bash
# Sign up at cron-job.org
# Add job to ping your backend every 10 minutes:
https://your-backend-url.com/
```

### 2. Enable Analytics

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Add Custom Domain

**Frontend (GitHub Pages):**
1. Buy domain (Namecheap: ~$10/year)
2. Add to GitHub Pages settings
3. Update DNS records

**Backend (Render):**
1. Go to Render dashboard → Settings
2. Add custom domain
3. Update DNS CNAME record

### 4. Monitor API Usage

Check Gemini API usage:
- https://makersuite.google.com/app/apikey
- View quotas and usage
- Free tier: 60 requests/min, 1,500/day

### 5. Set Up CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

---

## 📱 Mobile Optimization

Already done! Your portfolio is responsive. Test on:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)

Use Chrome DevTools:
1. Press `F12`
2. Click device icon (top-left)
3. Test different screen sizes

---

## 🔒 Security Best Practices

### 1. Never Commit API Keys

Already handled with `.env` file!

```bash
# Make sure .gitignore includes:
backend/.env
backend/__pycache__/
*.pyc
```

### 2. Rate Limiting (Optional)

Add to `backend/main.py`:

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/api/chat")
@limiter.limit("10/minute")
async def chat(request: ChatRequest):
    # ... existing code
```

### 3. HTTPS Only

All platforms provide free SSL. Enforce HTTPS in `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="upgrade-insecure-requests">
```

---

## 📈 Scaling Considerations

### When to Upgrade from Free Tier?

- **>100 visitors/day**: Consider Render paid tier ($7/month)
- **>1000 API calls/day**: Monitor Gemini quotas
- **Need faster responses**: Upgrade to Railway Pro ($5/month)
- **High traffic spikes**: Use Google Cloud Run

### Cost Estimates

| Traffic | Frontend | Backend | Total/Month |
|---------|----------|---------|-------------|
| 0-1K visitors | Free | Free | $0 |
| 1K-10K | Free | $7 | $7 |
| 10K-100K | Free | $25 | $25 |
| 100K+ | Custom | Custom | Contact sales |

---

## 🎉 Success! Your Portfolio is Live

**Frontend:** `https://sriharsha8991.github.io/portfolio-frontend/`  
**Backend:** `https://your-backend-url.com`

### Share Your Portfolio

- 📧 Email signature
- 💼 LinkedIn profile link
- 🐦 Twitter/X bio
- 📄 Resume header
- 🎯 Job applications

### Next Steps

1. ✅ Test all features
2. ✅ Share with friends for feedback
3. ✅ Monitor API usage
4. ✅ Add to LinkedIn
5. ✅ Update resume
6. ✅ Apply to jobs! 🚀

---

## 📞 Need Help?

- **GitHub Pages Issues**: [GitHub Support](https://support.github.com/)
- **Render Issues**: [Render Docs](https://render.com/docs)
- **Railway Issues**: [Railway Docs](https://docs.railway.app/)
- **Gemini API**: [Google AI Forum](https://discuss.ai.google.dev/)

---

**Deployment Guide Version:** 1.0  
**Last Updated:** November 4, 2025  
**Author:** GitHub Copilot

**Good luck with your job search! 🎯**
