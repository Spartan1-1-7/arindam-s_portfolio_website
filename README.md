# Portfolio Website

A modern, full-stack portfolio website built with Django and Next.js.

## 🚀 Features

- **Django Backend**: RESTful API with admin panel for content management
- **Next.js Frontend**: Fast, modern, and responsive UI
- **SQLite Database**: Simple and efficient data storage
- **Admin Interface**: Easy content management through Django admin
- **Responsive Design**: Works on all devices

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd arindam_website_portfolio
```

2. **Set up Python environment**
```bash
# Create and activate virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Or use conda
conda create -n portfolio python=3.10
conda activate portfolio

# Install dependencies
pip install -r requirements.txt
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Run migrations**
```bash
python manage.py migrate
```

5. **Create superuser**
```bash
python manage.py createsuperuser
```

6. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

## 🏃 Running the Application

### Quick Start (Both servers)
```bash
./start.sh
```

### Manual Start

**Backend (Django)**
```bash
python manage.py runserver
```

**Frontend (Next.js)**
```bash
cd frontend
npm run dev
```

## 🌐 Access Points

- **Website**: http://localhost:3000
- **Django Admin**: http://localhost:8000/admin
- **API**: http://localhost:8000/api

## 📁 Project Structure

```
.
├── backend/              # Django settings and configuration
├── portfolio/            # Django app (models, views, URLs)
├── frontend/            
│   ├── app/             # Next.js pages and components
│   └── styles/          # CSS stylesheets
├── manage.py            # Django management script
├── start.sh             # Quick start script
├── requirements.txt     # Python dependencies
└── db.sqlite3          # SQLite database
```

## 🔧 Configuration

### Backend Configuration

Edit `.env` file:
- `DJANGO_SECRET_KEY`: Your secret key
- `DEBUG`: Set to False in production
- `ALLOWED_HOSTS`: Comma-separated list of allowed domains
- `CORS_ALLOWED_ORIGINS`: Frontend URLs

### Frontend Configuration

Edit `frontend/.env.local`:
- `NEXT_PUBLIC_API_URL`: Backend API URL

## 📝 Content Management

1. Access the admin panel at http://localhost:8000/admin
2. Log in with your superuser credentials
3. Add/edit:
   - Projects
   - Skills
   - Contact messages

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options

- **Backend**: Railway, Render, Heroku
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Database**: PostgreSQL (recommended for production)

## 🧪 Development

### Backend
```bash
# Run migrations
python manage.py migrate

# Create migrations
python manage.py makemigrations

# Collect static files
python manage.py collectstatic
```

### Frontend
```bash
cd frontend

# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Arindam Shukla
- GitHub: [@arindamshukla](https://github.com/arindamshukla)
- LinkedIn: [Arindam Shukla](https://linkedin.com/in/arindam-shukla)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!
