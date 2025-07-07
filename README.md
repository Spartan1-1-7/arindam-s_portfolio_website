# AI/ML Specialist Portfolio

A modern, dynamic portfolio website for an AI/ML specialist showcasing projects, skills, and professional experience. This project is built using Flask with PostgreSQL for the backend, and HTML, CSS, and vanilla JavaScript for the frontend.

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
