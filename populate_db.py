#!/usr/bin/env python
"""
Script to populate the Django database with sample data
"""

import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from portfolio.models import Project, Skill, Experience, Education, Achievement

def create_sample_data():
    """Create sample data for the portfolio"""
    
    # Create Skills with proficiency levels
    skills_data = [
        {"name": "Python", "category": "Languages", "icon": "fab fa-python", "proficiency": 95},
        {"name": "JavaScript", "category": "Languages", "icon": "fab fa-js-square", "proficiency": 85},
        {"name": "R", "category": "Languages", "icon": "fab fa-r-project", "proficiency": 80},
        {"name": "SQL", "category": "Languages", "icon": "fas fa-database", "proficiency": 90},
        {"name": "Java", "category": "Languages", "icon": "fab fa-java", "proficiency": 75},
        {"name": "C++", "category": "Languages", "icon": "fas fa-code", "proficiency": 70},
        {"name": "TensorFlow", "category": "Libraries & Frameworks", "icon": "fas fa-brain", "proficiency": 90},
        {"name": "PyTorch", "category": "Libraries & Frameworks", "icon": "fas fa-fire", "proficiency": 85},
        {"name": "Scikit-learn", "category": "Libraries & Frameworks", "icon": "fas fa-chart-line", "proficiency": 92},
        {"name": "Pandas", "category": "Libraries & Frameworks", "icon": "fas fa-table", "proficiency": 95},
        {"name": "NumPy", "category": "Libraries & Frameworks", "icon": "fas fa-calculator", "proficiency": 90},
        {"name": "Django", "category": "Libraries & Frameworks", "icon": "fab fa-python", "proficiency": 80},
        {"name": "Flask", "category": "Libraries & Frameworks", "icon": "fas fa-flask", "proficiency": 85},
        {"name": "Machine Learning", "category": "Concepts & Techniques", "icon": "fas fa-robot", "proficiency": 88},
        {"name": "Deep Learning", "category": "Concepts & Techniques", "icon": "fas fa-network-wired", "proficiency": 85},
        {"name": "Computer Vision", "category": "Concepts & Techniques", "icon": "fas fa-eye", "proficiency": 80},
        {"name": "NLP", "category": "Concepts & Techniques", "icon": "fas fa-comment-alt", "proficiency": 75},
        {"name": "Git", "category": "Developer Tools", "icon": "fab fa-git-alt", "proficiency": 90},
        {"name": "Docker", "category": "Developer Tools", "icon": "fab fa-docker", "proficiency": 70},
        {"name": "AWS", "category": "Developer Tools", "icon": "fab fa-aws", "proficiency": 65},
        {"name": "Jupyter", "category": "Developer Tools", "icon": "fas fa-book", "proficiency": 95},
    ]
    
    for skill_data in skills_data:
        skill, created = Skill.objects.get_or_create(
            name=skill_data["name"],
            defaults=skill_data
        )
        if created:
            print(f"Created skill: {skill.name}")
    
    # Create Projects
    projects_data = [
        {
            "title": "AI-Powered Stock Market Predictor",
            "description": "Advanced machine learning model that predicts stock market trends using historical data and news sentiment analysis.",
            "category": "Machine Learning",
            "technologies": "Python, TensorFlow, Pandas, NumPy, Scikit-learn, LSTM, NLP",
            "highlights": "92% accuracy rate, Real-time predictions, Sentiment analysis integration",
            "content": "This comprehensive stock market prediction system combines traditional technical analysis with modern machine learning techniques...",
            "date": "2024",
            "github": "https://github.com/arindam/stock-predictor",
            "image": "/static/images/stock-predictor.jpg"
        },
        {
            "title": "E-Learning Platform",
            "description": "Full-stack web application for online learning with video streaming, interactive quizzes, and progress tracking.",
            "category": "Web Development",
            "technologies": "Django, React, PostgreSQL, Redis, AWS, Docker",
            "highlights": "1000+ registered users, Video streaming, Interactive assessments",
            "content": "Developed a comprehensive e-learning platform that serves thousands of students...",
            "date": "2024",
            "github": "https://github.com/arindam/elearning-platform",
            "image": "/static/images/elearning.jpg"
        },
        {
            "title": "Data Visualization Dashboard",
            "description": "Interactive dashboard for business intelligence with real-time data visualization and analytics.",
            "category": "Data Science",
            "technologies": "Python, Plotly, Dash, Pandas, SQL, MongoDB",
            "highlights": "Real-time updates, Interactive charts, Business insights",
            "content": "Built an enterprise-grade data visualization dashboard that processes millions of data points...",
            "date": "2023",
            "github": "https://github.com/arindam/data-dashboard",
            "image": "/static/images/dashboard.jpg"
        },
    ]
    
    for project_data in projects_data:
        project, created = Project.objects.get_or_create(
            title=project_data["title"],
            defaults=project_data
        )
        if created:
            print(f"Created project: {project.title}")
    
    # Create Experience
    experiences_data = [
        {
            "title": "Data Science Intern",
            "company": "Tech Solutions Inc.",
            "location": "Remote",
            "period": "Summer 2024",
            "description": "Worked on machine learning models for customer behavior prediction and data analysis."
        },
        {
            "title": "Web Development Freelancer",
            "company": "Self-Employed",
            "location": "Remote",
            "period": "2023 - Present",
            "description": "Developed custom web applications for small businesses and startups."
        },
    ]
    
    for exp_data in experiences_data:
        experience, created = Experience.objects.get_or_create(
            title=exp_data["title"],
            company=exp_data["company"],
            defaults=exp_data
        )
        if created:
            print(f"Created experience: {experience.title}")
    
    # Create Education
    education_data = [
        {
            "degree": "Bachelor of Technology",
            "institution": "Indian Institute of Technology",
            "field": "Computer Science & Engineering",
            "location": "India",
            "period": "2022 - 2026",
            "achievement": "CGPA: 8.5/10"
        },
    ]
    
    for edu_data in education_data:
        education, created = Education.objects.get_or_create(
            degree=edu_data["degree"],
            institution=edu_data["institution"],
            defaults=edu_data
        )
        if created:
            print(f"Created education: {education.degree}")
    
    # Create Achievements
    achievements_data = [
        {
            "title": "Best Project Award",
            "description": "Awarded for outstanding performance in Machine Learning course project",
            "date": "2024",
            "location": "University",
            "icon": "fas fa-trophy"
        },
        {
            "title": "Hackathon Winner",
            "description": "First place in National Level Hackathon for AI/ML category",
            "date": "2023",
            "location": "Delhi",
            "icon": "fas fa-medal"
        },
        {
            "title": "Research Paper Published",
            "description": "Published research on deep learning applications in stock market prediction",
            "date": "2023",
            "location": "IEEE Conference",
            "icon": "fas fa-graduation-cap"
        },
    ]
    
    for achievement_data in achievements_data:
        achievement, created = Achievement.objects.get_or_create(
            title=achievement_data["title"],
            defaults=achievement_data
        )
        if created:
            print(f"Created achievement: {achievement.title}")
    
    print("\nSample data created successfully!")

if __name__ == "__main__":
    create_sample_data()