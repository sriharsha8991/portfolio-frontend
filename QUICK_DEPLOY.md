# 🎯 AI-Powered Portfolio - Quick Deployment Guide

Complete guide to deploy your portfolio with AI chat to GitHub Pages (frontend) and Render/Railway (backend).

## 🚀 Quick Start (5 Steps - 10 Minutes)

### Step 1: Get Gemini API Key (2 min)
```
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key
```

### Step 2: Prepare Code for Deployment (2 min)
```powershell
# Make sure you're in the Portfolio directory
cd "C:/Users/SriharshaVelicheti/OneDrive - Datasmith AI Solutions Pvt Ltd/Desktop/personal/Portfolio"

# Add all files
git add .

# Commit
git commit -m "Add deployment configs and Google GenAI SDK"

# Push to your current branch
git push origin hero_section_new
```

### Step 3: Merge to Main Branch (1 min)
```powershell
# Switch to main
git checkout main

# Merge your changes
git merge hero_section_new

# Push to main
git push origin main
```

### Step 4: Deploy Frontend (GitHub Pages) (2 min)
```
1. Go to: https://github.com/sriharsha8991/portfolio-frontend/settings/pages
2. Under "Source", select:
   - Branch: main
   - Folder: / (root)
3. Click "Save"
4. Wait 1-2 minutes

Your site will be live at:
https://sriharsha8991.github.io/portfolio-frontend/
```

### Step 5: Deploy Backend (Render.com) (3 min)
```
1. Go to: https://render.com
2. Sign up with your GitHub account
3. Click "New" → "Web Service"
4. Connect repository: portfolio-frontend
5. Configure:
   - Name: portfolio-chat-api
   - Root Directory: backend
   - Build Command: pip install -r requirements.txt
   - Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
6. Add Environment Variable:
   - Key: GEMINI_API_KEY
   - Value: (paste your API key from Step 1)
7. Click "Create Web Service"
8. Wait 3-5 minutes for deployment
9. Copy your backend URL (e.g., https://portfolio-chat-api-xxxx.onrender.com)
```

### Step 6: Connect Frontend to Backend (2 min)
```powershell
# Edit script.js (around line 270)
# Update this line with your Render URL:
const CHAT_API_URL = 'https://portfolio-chat-api-xxxx.onrender.com';

# Also update CORS in backend/main.py (around line 23):
allow_origins=[
    "https://sriharsha8991.github.io",
    "http://localhost:5500",
],

# Commit and push
git add script.js backend/main.py
git commit -m "Connect frontend to backend"
git push origin main
```

### 🎉 Done! Test Your Site
```
Visit: https://sriharsha8991.github.io/portfolio-frontend/
Click the chat button and send a message!
```

---

## 📁 What's Been Added

### Deployment Configuration Files

1. **`backend/render.yaml`** - Render.com auto-deploy config
2. **`backend/Dockerfile`** - For Google Cloud Run or other container platforms
3. **`backend/vercel.json`** - Vercel serverless deployment
4. **`.github/workflows/deploy.yml`** - GitHub Actions CI/CD
5. **`DEPLOYMENT_GUIDE.md`** - Complete deployment documentation
6. **`deploy.ps1`** - PowerShell deployment helper script

### Updated Files

1. **`backend/main.py`** - Migrated to Google GenAI SDK (latest standards)
2. **`backend/requirements.txt`** - Updated to use `google-genai` package
3. **`backend/README.md`** - Updated documentation for new SDK
4. **`backend/MIGRATION.md`** - SDK migration guide

---

## 🎯 Deployment Options Comparison

| Platform | Setup Time | Free Tier | Cold Starts | Best For |
|----------|------------|-----------|-------------|----------|
| **Render** | 5 min | 750 hrs/mo | Yes (30s) | Beginners ⭐ |
| **Railway** | 3 min | $5 credit | Minimal | Speed |
| **Vercel** | 4 min | Unlimited | No | Serverless |
| **Cloud Run** | 8 min | 2M req/mo | No | Production |

**Recommended: Start with Render.com** ✅

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     GitHub Pages                        │
│  https://sriharsha8991.github.io/portfolio-frontend/   │
│                                                         │
│  • HTML/CSS/JavaScript                                  │
│  • Static hosting (free)                                │
│  • Auto-deploys from main branch                        │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ HTTPS Request
                 │ (Chat messages)
                 ▼
┌─────────────────────────────────────────────────────────┐
│              Backend API (Render/Railway)               │
│  https://portfolio-chat-api-xxxx.onrender.com          │
│                                                         │
│  • FastAPI (Python)                                     │
│  • Google GenAI SDK                                     │
│  • WebSocket + HTTP endpoints                           │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ API Call
                 │ (User questions + resume context)
                 ▼
┌─────────────────────────────────────────────────────────┐
│                  Google Gemini API                      │
│           https://generativelanguage.googleapis.com     │
│                                                         │
│  • Gemini 2.0 Flash Model                               │
│  • Intelligent responses                                │
│  • Free tier: 60 req/min                                │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Environment Variables

### Backend (Required)

Create `backend/.env` file:

```bash
# Required: Get from https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_api_key_here

# Optional: Server configuration
HOST=0.0.0.0
PORT=8000

# Optional: CORS (update after frontend is live)
CORS_ORIGINS=https://sriharsha8991.github.io,http://localhost:5500
```

### For Render.com

Add in Render dashboard → Environment:
```
GEMINI_API_KEY = your_actual_api_key_here
```

### For Railway

```bash
railway variables set GEMINI_API_KEY=your_actual_api_key_here
```

### For Vercel

```bash
vercel env add GEMINI_API_KEY
# Paste your key when prompted
```

---

## 🧪 Testing After Deployment

### 1. Test Backend Directly

```bash
# Test health endpoint
curl https://your-backend-url.com/

# Expected response:
# {"status":"active","service":"Portfolio Chat API","version":"2.0.0"}

# Test chat endpoint
curl -X POST https://your-backend-url.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What experience does Sriharsha have?","conversation_history":[]}'
```

### 2. Test Frontend

```
1. Visit: https://sriharsha8991.github.io/portfolio-frontend/
2. Click chat button (bottom right)
3. Send message: "Tell me about Sriharsha's experience with RAG"
4. Check for AI response
```

### 3. Test on Mobile

- iPhone Safari
- Android Chrome
- Test chat functionality
- Test theme toggle
- Verify responsive design

---

## 🐛 Common Issues & Fixes

### Issue 1: "Chat not connecting"

**Symptoms**: Chat button doesn't respond or shows error

**Fixes**:
```powershell
# 1. Check backend is running
curl https://your-backend-url.com/

# 2. Check browser console (F12)
# Look for CORS or network errors

# 3. Verify API URL in script.js
# Line ~270: const CHAT_API_URL = 'https://...'

# 4. Update CORS in backend/main.py
allow_origins=["https://sriharsha8991.github.io"]
```

### Issue 2: "Backend shows 'Application failed to respond'"

**Cause**: Render free tier cold start (takes 30-60 seconds)

**Fix**: Wait a minute and try again. First request is always slow.

**Pro tip**: Keep backend warm with a cron job (see DEPLOYMENT_GUIDE.md)

### Issue 3: "Invalid API Key"

**Fixes**:
```
1. Verify key at https://makersuite.google.com/app/apikey
2. Check environment variable in Render dashboard
3. Regenerate API key if needed
4. Redeploy backend after adding key
```

### Issue 4: "GitHub Pages not updating"

**Fixes**:
```powershell
# 1. Check GitHub Actions status
# Go to: Actions tab on GitHub

# 2. Hard refresh browser
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# 3. Wait 5 minutes
# GitHub Pages takes time to rebuild

# 4. Clear browser cache
# Chrome: Settings → Privacy → Clear browsing data
```

---

## 📈 Monitoring & Analytics

### 1. Monitor Gemini API Usage

```
Visit: https://makersuite.google.com/app/apikey
- View request count
- Check quotas
- Free tier: 60 requests/min, 1,500/day
```

### 2. Monitor Backend (Render)

```
Render Dashboard → Logs
- View real-time logs
- Check error messages
- Monitor response times
```

### 3. Add Google Analytics (Optional)

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

Get tracking ID from: https://analytics.google.com/

---

## 🔒 Security Checklist

- [x] API keys stored in environment variables (not in code)
- [x] `.env` file in `.gitignore`
- [x] CORS configured to allow only your domain
- [x] HTTPS enabled (automatic on all platforms)
- [x] Input validation in backend
- [x] Rate limiting ready (see DEPLOYMENT_GUIDE.md)

---

## 💰 Cost Breakdown

### Free Tier (Sufficient for portfolio)

| Service | Free Tier | Limit |
|---------|-----------|-------|
| **GitHub Pages** | Free forever | 100GB bandwidth/month |
| **Render** | 750 hours/month | Sleep after 15 min inactivity |
| **Gemini API** | Free | 60 req/min, 1,500 req/day |
| **Total** | **$0/month** | Perfect for portfolio! |

### When to Upgrade?

- **>100 visitors/day**: Render paid ($7/month)
- **>1,000 API calls/day**: Monitor Gemini quotas
- **Need no cold starts**: Railway Pro ($5/month)

---

## 📱 Sharing Your Portfolio

### Add to LinkedIn
```
1. Profile → Contact Info → Website
2. Add: https://sriharsha8991.github.io/portfolio-frontend/
3. Update headline: "Gen AI Engineer | Portfolio: [link]"
```

### Add to Resume
```
Header section:
Sriharsha Velicheti
📧 srih8991@gmail.com | 🌐 sriharsha8991.github.io/portfolio-frontend
📱 +91 8309012139 | 💼 LinkedIn | 🐱 GitHub
```

### Email Signature
```html
---
Sriharsha Velicheti | Gen AI Engineer
Portfolio: https://sriharsha8991.github.io/portfolio-frontend/
GitHub: github.com/sriharsha8991
```

---

## 🎯 Next Steps After Deployment

### Immediate
- [ ] Test all features on live site
- [ ] Test on mobile devices
- [ ] Share with 3 friends for feedback
- [ ] Add to LinkedIn profile
- [ ] Update resume with portfolio link

### This Week
- [ ] Apply to 10 jobs with new portfolio
- [ ] Share on Twitter/LinkedIn
- [ ] Join relevant Discord/Slack communities
- [ ] Add Google Analytics
- [ ] Set up custom domain (optional)

### This Month
- [ ] Collect feedback and improve
- [ ] Add new projects as you build them
- [ ] Monitor API usage and optimize
- [ ] Write a blog post about your portfolio
- [ ] Consider adding more features

---

## 🆘 Need Help?

### Documentation
- **Full Guide**: See `DEPLOYMENT_GUIDE.md`
- **Migration Info**: See `backend/MIGRATION.md`
- **Backend Setup**: See `backend/README.md`

### Community Support
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Render Docs](https://render.com/docs)
- [Gemini API Forum](https://discuss.ai.google.dev/)
- [FastAPI Discord](https://discord.gg/fastapi)

### Quick Commands Reference

```powershell
# Push code to GitHub
git add .
git commit -m "Update portfolio"
git push origin main

# Run backend locally
cd backend
python main.py

# Test backend
cd backend
python test_api.py

# Install dependencies
cd backend
pip install -r requirements.txt

# Check Python version
python --version

# Check installed packages
pip list | Select-String "google-genai"
```

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Get Gemini API key
- [ ] Test backend locally (`python main.py`)
- [ ] Test chat functionality
- [ ] Review all files for sensitive data
- [ ] Commit all changes

### Frontend (GitHub Pages)
- [ ] Push code to main branch
- [ ] Enable GitHub Pages in settings
- [ ] Wait for deployment (1-2 min)
- [ ] Test live site
- [ ] Verify all sections load

### Backend (Render)
- [ ] Sign up for Render with GitHub
- [ ] Create new Web Service
- [ ] Connect repository
- [ ] Configure build/start commands
- [ ] Add GEMINI_API_KEY environment variable
- [ ] Deploy and wait (3-5 min)
- [ ] Test health endpoint
- [ ] Copy backend URL

### Integration
- [ ] Update `script.js` with backend URL
- [ ] Update CORS in `backend/main.py`
- [ ] Commit and push changes
- [ ] Test chat on live site
- [ ] Verify AI responses
- [ ] Test on mobile

### Post-Deployment
- [ ] Test all features
- [ ] Check browser console for errors
- [ ] Test on multiple devices
- [ ] Share with friends for feedback
- [ ] Add to LinkedIn/Resume
- [ ] Monitor API usage

---

## 🎉 Success Indicators

Your deployment is successful when:

✅ Frontend loads at `https://sriharsha8991.github.io/portfolio-frontend/`  
✅ All sections visible (Hero, About, Experience, Projects, Skills, Education, Contact)  
✅ Dark/Light theme toggle works  
✅ GitHub stats load  
✅ Skills visualizations animate  
✅ Chat button appears (bottom right)  
✅ Chat panel opens on click  
✅ AI responds to messages within 5 seconds  
✅ Off-topic questions handled correctly  
✅ No console errors (F12)  
✅ Works on mobile devices  

---

## 📊 Performance Benchmarks

Expected performance:
- **Page Load**: < 2 seconds
- **Chat Response**: 2-5 seconds (first response slower on free tier)
- **Theme Toggle**: Instant
- **Smooth Scrolling**: 60 FPS
- **Mobile Responsive**: All breakpoints

---

**Ready to impress recruiters! 🚀**

Questions? Check `DEPLOYMENT_GUIDE.md` for detailed instructions.

**Version**: 1.0  
**Last Updated**: November 4, 2025  
**Tech Stack**: HTML/CSS/JS + FastAPI + Google GenAI SDK + GitHub Pages + Render
