# Pre-Deployment Checklist

## ✅ Completed

- [x] Removed absolute file paths (no `/media/arindam-shukla` references)
- [x] Updated `start.sh` to use relative paths with `$SCRIPT_DIR`
- [x] Configured environment variables for production
- [x] Created `.env.example` for both backend and frontend
- [x] Updated `requirements.txt` with proper package versions
- [x] Created comprehensive `.gitignore`
- [x] Updated README.md with proper documentation
- [x] Created DEPLOYMENT.md guide
- [x] Removed references to `restart/` folder
- [x] Made `start.sh` executable
- [x] Configured Django settings for production (DEBUG, ALLOWED_HOSTS, CORS)
- [x] Updated all documentation files

## Before Pushing to GitHub

- [ ] Test `./start.sh` works correctly
- [ ] Verify both servers start without errors
- [ ] Check website loads at http://localhost:3000
- [ ] Test admin panel access at http://localhost:8000/admin
- [ ] Review `.gitignore` to ensure sensitive files are excluded
- [ ] Create `.env` from `.env.example` (don't commit `.env`)
- [ ] Remove or backup `db.sqlite3` if it contains test data
- [ ] Consider creating initial migrations if needed

## First Push Commands

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website with Django & Next.js"

# Add remote repository
git remote add origin <your-github-repo-url>

# Push to GitHub
git push -u origin main
```

## After Deployment

- [ ] Update `NEXT_PUBLIC_API_URL` in frontend with production backend URL
- [ ] Update `ALLOWED_HOSTS` in Django with production domain
- [ ] Update `CORS_ALLOWED_ORIGINS` with production frontend URL
- [ ] Set `DEBUG=False` in production
- [ ] Generate new `DJANGO_SECRET_KEY` for production
- [ ] Set up database backups
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring/logging

## Security Notes

⚠️ **NEVER commit:**
- `.env` files with real credentials
- `db.sqlite3` with production data
- Secret keys or API tokens
- Private configuration files

✅ **ALWAYS:**
- Use environment variables for secrets
- Keep dependencies updated
- Use HTTPS in production
- Set DEBUG=False in production
