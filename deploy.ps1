# Portfolio Deployment Quick Start Script
# Run this in PowerShell to prepare for deployment

Write-Host "🚀 Portfolio Deployment Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (!(Test-Path "backend\main.py")) {
    Write-Host "❌ Error: Please run this script from the Portfolio root directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Directory check passed" -ForegroundColor Green
Write-Host ""

# Check Git status
Write-Host "📊 Checking Git status..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "1️⃣  Step 1: Commit and Push Changes" -ForegroundColor Cyan
Write-Host "   Run: git add ." -ForegroundColor White
Write-Host "   Run: git commit -m 'Prepare for deployment'" -ForegroundColor White
Write-Host "   Run: git push origin hero_section_new" -ForegroundColor White
Write-Host ""

Write-Host "2️⃣  Step 2: Merge to Main Branch" -ForegroundColor Cyan
Write-Host "   Run: git checkout main" -ForegroundColor White
Write-Host "   Run: git merge hero_section_new" -ForegroundColor White
Write-Host "   Run: git push origin main" -ForegroundColor White
Write-Host ""

Write-Host "3️⃣  Step 3: Enable GitHub Pages" -ForegroundColor Cyan
Write-Host "   1. Go to: https://github.com/sriharsha8991/portfolio-frontend/settings/pages" -ForegroundColor White
Write-Host "   2. Source: Deploy from branch" -ForegroundColor White
Write-Host "   3. Branch: main, folder: / (root)" -ForegroundColor White
Write-Host "   4. Click Save" -ForegroundColor White
Write-Host ""

Write-Host "4️⃣  Step 4: Deploy Backend to Render" -ForegroundColor Cyan
Write-Host "   1. Go to: https://render.com" -ForegroundColor White
Write-Host "   2. Sign up with GitHub" -ForegroundColor White
Write-Host "   3. New → Web Service" -ForegroundColor White
Write-Host "   4. Connect repository: portfolio-frontend" -ForegroundColor White
Write-Host "   5. Root Directory: backend" -ForegroundColor White
Write-Host "   6. Build Command: pip install -r requirements.txt" -ForegroundColor White
Write-Host "   7. Start Command: uvicorn main:app --host 0.0.0.0 --port `$PORT" -ForegroundColor White
Write-Host "   8. Add Environment Variable: GEMINI_API_KEY" -ForegroundColor White
Write-Host "   9. Create Web Service" -ForegroundColor White
Write-Host ""

Write-Host "5️⃣  Step 5: Update Frontend with Backend URL" -ForegroundColor Cyan
Write-Host "   1. Get your Render URL (e.g., https://portfolio-chat-api-xxxx.onrender.com)" -ForegroundColor White
Write-Host "   2. Edit script.js line ~270" -ForegroundColor White
Write-Host "   3. Update: const CHAT_API_URL = 'https://your-backend-url'" -ForegroundColor White
Write-Host "   4. Commit and push changes" -ForegroundColor White
Write-Host ""

Write-Host "📋 Checklist:" -ForegroundColor Yellow
Write-Host "   [ ] Get Gemini API key from https://makersuite.google.com/app/apikey" -ForegroundColor White
Write-Host "   [ ] Push code to GitHub" -ForegroundColor White
Write-Host "   [ ] Enable GitHub Pages" -ForegroundColor White
Write-Host "   [ ] Deploy backend to Render" -ForegroundColor White
Write-Host "   [ ] Update script.js with backend URL" -ForegroundColor White
Write-Host "   [ ] Test live site" -ForegroundColor White
Write-Host ""

Write-Host "📖 Full guide: See DEPLOYMENT_GUIDE.md" -ForegroundColor Green
Write-Host ""

# Check if API key is set
if ($env:GEMINI_API_KEY) {
    Write-Host "✅ GEMINI_API_KEY is set in environment" -ForegroundColor Green
} else {
    Write-Host "⚠️  GEMINI_API_KEY not set in environment (needed for local testing)" -ForegroundColor Yellow
    Write-Host "   Set it with: `$env:GEMINI_API_KEY='your_key_here'" -ForegroundColor White
}

Write-Host ""
Write-Host "🎯 Ready to deploy? Follow the steps above!" -ForegroundColor Cyan
Write-Host ""

# Ask if user wants to proceed with Git commands
$proceed = Read-Host "Do you want to commit and push now? (y/n)"

if ($proceed -eq "y" -or $proceed -eq "Y") {
    Write-Host ""
    Write-Host "📦 Adding all files..." -ForegroundColor Yellow
    git add .
    
    Write-Host "📝 Committing changes..." -ForegroundColor Yellow
    git commit -m "Add deployment configs and update to Google GenAI SDK"
    
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
    git push origin hero_section_new
    
    Write-Host ""
    Write-Host "✅ Code pushed successfully!" -ForegroundColor Green
    Write-Host "Next: Merge to main and enable GitHub Pages" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "ℹ️  No problem! Follow the steps manually when ready." -ForegroundColor Blue
}

Write-Host ""
Write-Host "Good luck! 🚀" -ForegroundColor Green
