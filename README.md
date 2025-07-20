# AI/ML Specialist Portfolio

A modern, dynamic portfolio website for an AI/ML specialist showcasing projects, skills, and professional experience. # 🚀 Portfolio Website - Arindam Shukla

A modern, responsive portfolio website built with Django, featuring an interactive database management system and beautiful UI/UX design.

## ✨ Features

- 🎨 **Modern Design:** Clean, professional layout with light/dark theme toggle
- 📱 **Fully Responsive:** Optimized for all devices and screen sizes
- 🗄️ **Interactive Database Manager:** User-friendly interface to manage all content
- 🎭 **Beautiful Animations:** Smooth transitions, particle effects, and scroll animations
- 🎯 **Dynamic Content:** Easy-to-update skills, projects, experience, and achievements
- 🔍 **Project Filtering:** Advanced filtering and search functionality
- 📊 **Admin Dashboard:** Complete backend management system
- ⚡ **Fast Performance:** Optimized loading and responsive interactions

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Spartan1-1-7/arindam-s_portfolio_website.git
   cd arindam-s_portfolio_website
   ```

2. **Set up virtual environment (recommended):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Linux/Mac
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

6. **Visit:** http://localhost:8000

## 🎯 Main Commands

| Command | Description |
|---------|-------------|
| `python3 run_server.py` | 🌐 Start development server |
| `python3 run_server.py manage` | 🗄️ Open database manager |
| `python3 run_server.py setup` | ⚡ Quick project setup |
| `python3 run_server.py status` | 📊 Check project status |

## 📁 Project Structure

```
portfolio_website/
├── run_server.py           # 🚀 Main launcher script
├── manage.py              # Django management
├── portfolio_project/     # Django project settings
├── portfolio/            # Main Django app
├── templates/           # HTML templates
├── static/             # CSS, JS, images
├── scripts/            # Database management tools
├── assets/            # Project assets
├── docs/             # Documentation
└── legacy/           # Legacy files
```

## 🗄️ Database Management

Access the interactive database manager:
```bash
python3 run_server.py manage
```

**Features:**
- ✅ Add/Edit/Delete individual records
- 📋 View all records with search
- 🔄 Bulk operations (add sample data, clear database)
- 🎯 Manage Skills, Projects, Experience, Education, Achievements
- 🛡️ Safe operations with confirmation prompts
- 🎨 Color-coded user interface

## 🎨 Customization

- **Personal Info:** Edit contact details in `portfolio/views.py`
- **Styling:** Modify CSS variables in `static/css/style.css`
- **Content:** Use the database manager to update all content
- **Colors:** Customize theme colors and animations

## 📊 Website Sections

- **🏠 Homepage:** Hero section, featured projects, skills overview
- **👤 About:** Personal bio, education, experience, achievements
- **💼 Projects:** Complete portfolio with filtering and search
- **📞 Contact:** Contact form and social media links

## 🛠️ Tech Stack

- **Backend:** Django 5.0+
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Database:** SQLite (development) / PostgreSQL (production ready)
- **Animations:** AOS, Particles.js, Custom CSS animations
- **Responsive:** Bootstrap 5 + Custom CSS Grid/Flexbox
- **Icons:** Font Awesome, Custom SVG icons

## 📱 Mobile Optimization

Fully responsive design optimized for:
- 📱 Mobile phones (320px+)
- 📟 Tablets (768px+)  
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1200px+)

## 🔧 Development

- **Add content:** Use `python3 run_server.py manage`
- **Run migrations:** `python3 run_server.py migrate`
- **Collect static files:** `python3 run_server.py collectstatic`
- **Django shell:** `python3 run_server.py shell`

## 📚 Documentation

- [Setup Guide](docs/setup.md) - Detailed installation instructions
- [Usage Guide](docs/usage.md) - How to use all features
- [API Reference](docs/api.md) - Development documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Django community for the excellent framework
- Bootstrap team for responsive components
- Font Awesome for beautiful icons
- AOS library for scroll animations
- Particles.js for background effects

---

**Made with ❤️ by Arindam Shukla**

🌐 **Live Demo:** [Your Website URL]  
💼 **LinkedIn:** [linkedin.com/in/arindam-shukla](https://linkedin.com/in/arindam-shukla)  
📧 **Email:** arindamshrish@gmail.com

## Features

- **Modern Design**: Clean, responsive design with smooth animations and transitions
- **Dynamic Content**: Database-driven content management for easy updates
- **Interactive Elements**: Particle backgrounds, neural network visualizations, and more
- **Dark/Light Mode**: Theme toggle with persistent user preferences
- **Project Showcase**: Detailed project pages with related project suggestions
- **Skills Section**: Categorized display of technical skills
- **Contact Form**: Easy communication channel for potential collaborators
- **Responsive Design**: Mobile-friendly layout for all device sizes

## Technologies Used

### Backend
- Flask (Python web framework)
- PostgreSQL (Database)
- SQLAlchemy (ORM)
- Gunicorn (WSGI server)

### Frontend
- HTML5 / CSS3
- JavaScript (Vanilla)
- Bootstrap 5 (CSS framework)
- AOS (Animate On Scroll library)
- particles.js (Background animation)
- Font Awesome (Icons)

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Create a virtual environment and install dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the database:
```bash
# Create a PostgreSQL database and set the DATABASE_URL environment variable
export DATABASE_URL=postgresql://username:password@localhost/portfolio_db
```

4. Initialize the database:
```bash
flask shell
# In the Flask shell
from app import db
db.create_all()
exit()
```

5. Run the application:
```bash
gunicorn --bind 0.0.0.0:5000 main:app
```

6. Access the website at http://localhost:5000

## Project Structure

- `app.py`: Main application file with routes and data
- `models.py`: Database models using SQLAlchemy
- `main.py`: Entry point for the application
- `static/`: Static assets (CSS, JS, images)
- `templates/`: HTML templates using Jinja2
- `requirements.txt`: List of Python dependencies

## Key Features Implementation

### Neural Network Visualization
The homepage features an interactive neural network visualization with dynamic node connections and path highlighting, implemented using SVG and JavaScript.

### Particle Background
A subtle animated particle background enhances the visual appeal while maintaining readability, powered by particles.js.

### Theme Switching
Users can toggle between light and dark modes, with preferences saved to localStorage for persistence across visits.

### Page Transitions
Smooth transitions between pages with loading animations provide a polished user experience.

### Database Integration
All content (projects, skills, experiences, etc.) is stored in a PostgreSQL database, making updates easy and efficient.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Arindam Shukla# arindam-s_portfolio_website
