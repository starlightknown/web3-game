# 🚀 Deploy HackStack to Vercel

## Quick Deploy (2 minutes)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate.

### Step 3: Deploy

```bash
cd /Users/karuna/Desktop/game
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → hackstack (or whatever you want)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

### Step 4: Done!

Vercel will give you a URL like: `https://hackstack-xyz.vercel.app`

Your app is now live! 🎉

---

## Alternative: Deploy via GitHub

### Step 1: Push to GitHub

```bash
cd /Users/karuna/Desktop/game
git init
git add hackstack.html hackstack.css hackstack.js server.js package.json vercel.json
git commit -m "Initial commit - HackStack"
git branch -M main
git remote add origin https://github.com/yourusername/hackstack.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

Done! Your app is live.

---

## What Gets Deployed:

- ✅ Frontend (hackstack.html, hackstack.css, hackstack.js)
- ✅ Backend API (server.js as serverless function)
- ✅ Real Devfolio integration
- ✅ All features working

## Environment:

- **Frontend:** Static files served by Vercel CDN
- **Backend:** Node.js serverless function
- **API calls:** Automatically routed to backend
- **CORS:** Handled automatically

## After Deployment:

Your app will be available at: `https://your-project.vercel.app`

Features that work:
- ✅ Fetch real Devfolio profiles
- ✅ Swipe through developers
- ✅ Match and chat
- ✅ All filters
- ✅ Chemistry scores
- ✅ Quick messages

## Custom Domain (Optional):

In Vercel dashboard:
1. Go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS instructions

---

## Testing Production:

After deploy, test:

```bash
# Check health
curl https://your-project.vercel.app/api/health

# Test API
curl https://your-project.vercel.app/api/devfolio/profiles?limit=2
```

---

**Ready to deploy? Just run:**

```bash
npm install -g vercel
vercel
```

That's it! 🚀

