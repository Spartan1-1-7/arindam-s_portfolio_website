# Deployment Guide - Vercel + Render

## ✅ Code is Ready! Follow these steps:

## 1. Deploy Backend to Render

### Step 1: Push to GitHub (if not done)
```bash
git add .
git commit -m "Prepare for deployment"
git push
```

### Step 2: Create Render Web Service
1. Go to https://render.com → Sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `your-portfolio-backend`
   - **Environment**: Python 3
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn backend.wsgi:application`
   - **Instance Type**: Free

### Step 3: Add Environment Variables in Render
In "Environment" tab, add these:

```
SECRET_KEY=<generate-using-command-below>
DEBUG=False
DATABASE_URL=<your-supabase-connection-string>
ALLOWED_HOSTS=your-app-name.onrender.com
CORS_ALLOWED_ORIGINS=https://placeholder.vercel.app
PYTHON_VERSION=3.11.0
```

**Generate SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Get DATABASE_URL from Supabase:**
- Go to Supabase → Settings → Database → Connection Pooling
- Copy the connection string (format: `postgresql://user:password@host:port/database`)

### Step 4: Deploy Backend
- Click "Create Web Service"
- Wait 5-10 minutes
- Save your backend URL: `https://your-app-name.onrender.com`

---

## 2. Deploy Frontend to Vercel

### Step 1: Create Vercel Project
1. Go to https://vercel.com → Sign up with GitHub
2. Click "Add New" → "Project"
3. Import your GitHub repository

### Step 2: Configure Build Settings
1. **Framework**: Next.js (auto-detected)
2. **Root Directory**: `frontend`
3. **Build Command**: Leave default
4. **Output Directory**: Leave default

### Step 3: Add Environment Variable
In "Environment Variables" section:
```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
```
(Use the URL from Render deployment)

### Step 4: Deploy Frontend
- Click "Deploy"
- Wait 2-3 minutes
- Your site is live at: `https://your-project.vercel.app`

---

## 3. Final Step - Update Backend CORS

1. Go back to Render dashboard
2. Edit environment variable:
   ```
   CORS_ALLOWED_ORIGINS=https://your-actual-vercel-url.vercel.app
   ```
3. Save (will trigger automatic redeploy)

---

## 4. Test Everything

✅ Visit your Vercel URL  
✅ Check if portfolio data loads  
✅ Test navigation between pages  
✅ Try Django admin: `https://your-backend.onrender.com/admin`

---

## Troubleshooting

### Backend doesn't start?
- Check Render logs (Dashboard → Logs)
- Verify DATABASE_URL format is correct
- Make sure all environment variables are set

### Frontend shows no data?
- Check browser console for errors
- Verify NEXT_PUBLIC_API_URL is correct
- Check Vercel deployment logs

### CORS errors?
- Ensure CORS_ALLOWED_ORIGINS exactly matches your Vercel URL
- Include `https://` prefix
- No trailing slash

---

## Optional: Custom Domain

### Vercel (Frontend):
Settings → Domains → Add your domain

### Render (Backend):  
Settings → Custom Domain → Add subdomain (api.yourdomain.com)

Then update CORS_ALLOWED_ORIGINS with your custom domain.

---

## 💰 Cost: **$0/month**
- Render: Free tier
- Vercel: Free tier  
- Supabase: Free tier

---

## Need Help?
- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
- Check deployment logs for errors
