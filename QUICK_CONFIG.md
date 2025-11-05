# 🚀 Quick Update Guide

## To Update Production Backend URL:

### 1️⃣ Open `config.js`

### 2️⃣ Update Production Section
```javascript
production: {
    apiUrl: 'https://YOUR-NEW-BACKEND-URL.com',
    wsUrl: 'wss://YOUR-NEW-BACKEND-URL.com',
    description: 'Production deployment'
}
```

### 3️⃣ Save and Deploy
```bash
git add config.js
git commit -m "Update production backend URL"
git push
```

### ✅ Done!

---

## How It Works:
- **Local development** (localhost) → Uses `http://127.0.0.1:8000`
- **Production** (deployed site) → Uses your production URL
- **Auto-detects** environment based on hostname
- **One file** to manage all environments

---

## Current URLs:

### Development (Local)
```
http://127.0.0.1:8000
```

### Production (Render.com)
```
https://portfolio-frontend-otua.onrender.com
```

⚠️ **Note:** Verify this is your BACKEND URL, not frontend!

---

## Test Locally:
1. Start backend: `cd backend && python main.py`
2. Open `index.html` in browser
3. Check console: Should show "development mode"

## Test Production:
1. Deploy to hosting platform
2. Visit your site
3. Check console: Should show "production mode"

---

## Need Help?
See `CONFIG_GUIDE.md` for detailed instructions.
