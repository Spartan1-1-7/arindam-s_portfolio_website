# Portfolio Website Usage Guide

## 🎯 Main Features

### 📊 Database Management
The interactive database manager provides complete control over your portfolio content:

- **Skills Management:** Add programming languages, frameworks, tools with proficiency levels
- **Project Management:** Showcase your projects with descriptions, technologies, GitHub links
- **Experience Management:** Document work history and internships
- **Education Management:** Add degrees, institutions, achievements
- **Awards Management:** Highlight accomplishments and recognitions

### 🎨 Website Sections

- **Homepage:** Hero section, featured projects, skills overview
- **About Page:** Detailed bio, education, experience, achievements
- **Projects Page:** Complete portfolio with filtering and search
- **Contact Page:** Contact form and social links

### 🔧 Admin Features

- **Theme Toggle:** Light/dark mode switching
- **Responsive Design:** Works on all devices
- **Animated Elements:** Smooth animations and transitions
- **Interactive Elements:** Hover effects, particle animations

## 🚀 Common Tasks

### Adding New Skills
1. Run: `python3 run_server.py manage`
2. Choose "1" (Manage Skills)
3. Choose "2" (Add New Record)
4. Fill in: name, category, icon class, proficiency (0-100)

### Adding New Projects
1. Run: `python3 run_server.py manage`
2. Choose "2" (Manage Projects)
3. Choose "2" (Add New Record)
4. Fill in: title, description, category, technologies, GitHub link

### Editing Existing Records
1. Run: `python3 run_server.py manage`
2. Choose the appropriate model (1-5)
3. Choose "1" (View All Records) to see IDs
4. Choose "3" (Edit Record)
5. Enter the record ID
6. Modify fields (press Enter to keep current values)

### Bulk Operations
1. Run: `python3 run_server.py manage`
2. Choose "6" (Bulk Operations)
3. Options:
   - Add sample data
   - Delete all data
   - Export/Import (coming soon)

## 🎨 Customization

### Updating Personal Information
Edit the `about` function in `portfolio/views.py`:
```python
info = {
    'linkedin': 'your-linkedin-profile',
    'email': 'your-email@domain.com',
    'github': 'https://github.com/your-username'
}
```

### Modifying Colors and Themes
Edit CSS variables in `static/css/style.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### Adding New Sections
1. Create templates in `templates/`
2. Add views in `portfolio/views.py`
3. Update URLs in `portfolio/urls.py`

## 🔍 Troubleshooting

### Server Won't Start
```bash
python3 run_server.py status  # Check project status
python3 run_server.py migrate # Run migrations
```

### Empty Sections on Website
```bash
python3 run_server.py manage  # Add content to database
```

### Static Files Not Loading
```bash
python3 run_server.py collectstatic
```

### Database Issues
```bash
python3 run_server.py shell   # Open Django shell for manual fixes
```

## 📱 Mobile Optimization

The website is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1200px+)

## 🎭 Animation Features

- **AOS (Animate On Scroll):** Elements animate when scrolled into view
- **Particle.js:** Interactive particle background
- **Neural Network:** Animated AI visualization on homepage
- **Theme Transitions:** Smooth light/dark mode switching
- **Custom Cursor:** Interactive cursor effects

## 🔒 Security Notes

- Never commit database files to version control
- Use environment variables for sensitive settings
- Keep Django and dependencies updated
- Use strong passwords for admin accounts

## 📈 Performance Tips

- Use `collectstatic` for production
- Optimize images before uploading
- Enable Django's built-in caching
- Use a CDN for static files in production
