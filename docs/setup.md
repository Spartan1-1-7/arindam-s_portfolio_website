# Portfolio Website Setup Guide

## 🚀 Quick Start

1. **Clone and navigate to project:**
   ```bash
   git clone <repository-url>
   cd portfolio_website
   ```

2. **Set up virtual environment (recommended):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Linux/Mac
   # or
   venv\Scripts\activate     # On Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Quick setup (automated):**
   ```bash
   python3 run_server.py setup
   ```

5. **Start the server:**
   ```bash
   python3 run_server.py
   ```

## � Admin Access

**Django Admin Panel:**
- **URL:** http://localhost:8000/admin
- **Username:** `admin`
- **Password:** `admin123`

> **⚠️ Security Note:** Change the default password in production for security!

## �📁 Project Structure

```
portfolio_website/
├── run_server.py           # 🚀 Main launcher script
├── manage.py              # Django management
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── portfolio_project/    # Django project settings
├── portfolio/            # Main Django app
├── templates/           # HTML templates
├── static/             # Static files (CSS, JS, images)
├── staticfiles/        # Collected static files
├── scripts/            # Utility scripts
│   ├── populate_db.py  # 🗄️ Database management
│   └── db_manager.sh   # Database launcher
├── assets/             # Project assets
│   ├── images/        # Images and icons
│   └── documents/     # Documents like resume
├── legacy/            # Old/unused files
└── docs/             # Documentation
```

## 🎯 Main Commands

| Command | Description |
|---------|-------------|
| `python3 run_server.py` | Start development server |
| `python3 run_server.py manage` | Open database manager |
| `python3 run_server.py setup` | Quick project setup |
| `python3 run_server.py migrate` | Run database migrations |
| `python3 run_server.py collectstatic` | Collect static files |
| `python3 run_server.py shell` | Open Django shell |
| `python3 run_server.py status` | Check project status |

## 🗄️ Database Management

Access the interactive database manager:
```bash
python3 run_server.py manage
```

This provides a user-friendly interface to:
- View all records
- Add new records
- Edit existing records  
- Delete records
- Search records
- Bulk operations

## 📊 Development Workflow

1. **Start development server:**
   ```bash
   python3 run_server.py
   ```

2. **Make changes to code**

3. **If you modify models, run migrations:**
   ```bash
   python3 run_server.py migrate
   ```

4. **Manage database content:**
   ```bash
   python3 run_server.py manage
   ```

5. **Collect static files (if needed):**
   ```bash
   python3 run_server.py collectstatic
   ```

## 🌐 Accessing the Website

- **Main website:** http://localhost:8000
- **Admin panel:** http://localhost:8000/admin
- **Custom port:** `python3 run_server.py server --port 8080`

## 📝 Adding Content

Use the database manager to add your own:
- Skills and proficiency levels
- Projects with descriptions and links
- Work experience
- Education details
- Achievements and awards

All changes will be immediately reflected on the website!
