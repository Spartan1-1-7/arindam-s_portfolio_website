# Deployment Guide

## Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

### Required Variables

- `DJANGO_SECRET_KEY`: Generate a new secret key for production
- `DEBUG`: Set to `False` for production
- `ALLOWED_HOSTS`: Comma-separated list of allowed domains
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of frontend URLs

## Local Development

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install Node dependencies:
```bash
cd frontend
npm install
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create superuser:
```bash
python manage.py createsuperuser
```

5. Start the application:
```bash
./start.sh
```

## Production Deployment

### Backend (Django)

1. Set environment variables
2. Run migrations: `python manage.py migrate`
3. Collect static files: `python manage.py collectstatic`
4. Use a production WSGI server (gunicorn, uwsgi)

### Frontend (Next.js)

1. Build: `cd frontend && npm run build`
2. Start: `npm start` or deploy to Vercel/Netlify

### Recommended Platforms

- **Backend**: Railway, Render, Heroku, DigitalOcean
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Database**: PostgreSQL on Render, Supabase, or PlanetScale

## Security Checklist

- [ ] Set strong SECRET_KEY
- [ ] Set DEBUG=False in production
- [ ] Configure ALLOWED_HOSTS properly
- [ ] Set specific CORS_ALLOWED_ORIGINS (not *)
- [ ] Use HTTPS in production
- [ ] Use environment variables for sensitive data
- [ ] Keep dependencies updated
