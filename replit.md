# AI/ML Specialist Portfolio

## Overview

This is a modern, dynamic portfolio website for an AI/ML specialist built with Django. The portfolio showcases projects, skills, and professional experience through a clean, responsive design with interactive elements. The application features a database-driven content management system that allows for easy updates and maintenance.

## System Architecture

### Frontend Architecture
- **Template Engine**: Django Templates with Jinja2 syntax
- **CSS Framework**: Bootstrap 5 for responsive design
- **JavaScript Libraries**: 
  - AOS (Animate On Scroll) for smooth animations
  - Particles.js for interactive background effects
  - Custom vanilla JavaScript for interactive features
- **Styling**: Custom CSS with CSS variables for theme management
- **Responsive Design**: Mobile-first approach with Bootstrap grid system

### Backend Architecture
- **Framework**: Django 5.2.4 (Python web framework)
- **Database**: PostgreSQL (production-ready relational database)
- **ORM**: Django ORM for database operations
- **Admin Interface**: Django Admin for content management
- **WSGI Server**: Gunicorn for production deployment

### Design Patterns
- **MVC Pattern**: Django's Model-View-Template architecture
- **Repository Pattern**: Models serve as data access layer
- **Template Inheritance**: Base template (layout.html) extended by specific pages

## Key Components

### Models
- **Project**: Stores project information including title, description, technologies, GitHub links
- **Skill**: Categorized technical skills with icons
- **Experience**: Professional work experience
- **Education**: Academic background
- **Achievement**: Notable accomplishments and awards
- **ContactMessage**: Contact form submissions with admin management

### Views
- **Index**: Homepage with featured projects and skills overview
- **About**: Detailed personal information and background
- **All Projects**: Paginated project listing with filtering
- **Project Detail**: Individual project pages with detailed information
- **Contact**: Contact form with message handling
- **Download Resume**: Resume download functionality

### Templates
- **Layout**: Base template with navigation, theme toggle, and particles background
- **Index**: Homepage with hero section and neural network visualization
- **About**: Personal information with skills and experience
- **Projects**: Project gallery with filtering capabilities
- **Project Detail**: Individual project showcase
- **Contact**: Contact form with social links

## Data Flow

1. **Request Processing**: Django URL dispatcher routes requests to appropriate views
2. **Data Retrieval**: Views query database through Django ORM
3. **Template Rendering**: Data passed to templates for HTML generation
4. **Response Delivery**: Rendered HTML sent to client browser
5. **Static Assets**: CSS, JS, and images served directly by web server

### Database Schema
- Projects contain technologies and highlights as comma-separated strings
- Skills are categorized by type (Programming, AI/ML, Tools, etc.)
- Contact messages are stored with read/unread status for admin management
- All models include proper relationships and constraints

## External Dependencies

### Python Packages
- **Django**: Core web framework
- **psycopg2**: PostgreSQL database adapter
- **gunicorn**: WSGI HTTP server
- **django-cors-headers**: CORS handling for API requests

### Frontend Libraries
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome**: Icon library for UI elements
- **AOS**: Animation library for scroll-based animations
- **Particles.js**: Interactive background particle system
- **Google Fonts**: Custom typography (Poppins, Roboto Mono)

### External Services
- **GitHub**: Code repository hosting and project links
- **LinkedIn**: Professional networking and profile links
- **Unsplash**: High-quality stock images for projects
- **Email**: Contact form integration

## Deployment Strategy

### Production Setup
- **WSGI Server**: Gunicorn with multiple worker processes
- **Database**: PostgreSQL with environment-based configuration
- **Static Files**: Collected and served by web server
- **Environment Variables**: Secure configuration management

### Configuration Management
- **Settings**: Environment-specific settings with fallbacks
- **Debug Mode**: Disabled in production with proper error handling
- **Allowed Hosts**: Configured for production domains
- **CORS**: Properly configured for API access

### Security Considerations
- **Secret Key**: Environment-based secret key management
- **CSRF Protection**: Django's built-in CSRF middleware
- **SQL Injection**: Protection through ORM usage
- **XSS Protection**: Template auto-escaping enabled

## Changelog
- July 06, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.