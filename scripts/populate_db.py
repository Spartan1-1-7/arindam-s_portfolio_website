#!/usr/bin/env python
"""
Portfolio Database Management Script - Interactive Version
========================================================

Interactive menu-driven script to manage portfolio database records.

USAGE:
    python3 populate_db.py

Features:
- Interactive menu system
- View, add, edit, delete individual records
- Bulk operations
- Data import/export
- Search and filter records
"""

import os
import sys
import django
import argparse
from datetime import datetime

# Setup Django
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
os.chdir(project_root)  # Change to project root directory
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from portfolio.models import Project, Skill, Experience, Education, Achievement

# Color codes for better UI
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'

def print_header(text):
    """Print a colored header"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.END}")
    print(f"{Colors.HEADER}{Colors.BOLD}{text.center(60)}{Colors.END}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.END}\n")

def print_success(text):
    """Print success message"""
    print(f"{Colors.GREEN}✅ {text}{Colors.END}")

def print_error(text):
    """Print error message"""
    print(f"{Colors.RED}❌ {text}{Colors.END}")

def print_warning(text):
    """Print warning message"""
    print(f"{Colors.WARNING}⚠️  {text}{Colors.END}")

def print_info(text):
    """Print info message"""
    print(f"{Colors.CYAN}ℹ️  {text}{Colors.END}")

def get_user_input(prompt, input_type=str, required=True):
    """Get user input with validation"""
    while True:
        try:
            value = input(f"{Colors.BLUE}{prompt}{Colors.END}")
            if not value and required:
                print_error("This field is required!")
                continue
            return input_type(value) if value else None
        except ValueError:
            print_error(f"Please enter a valid {input_type.__name__}")

def confirm_action(message):
    """Ask for confirmation"""
    response = input(f"{Colors.WARNING}{message} (y/N): {Colors.END}").lower()
    return response in ['y', 'yes']

def pause():
    """Pause for user to read"""
    input(f"\n{Colors.CYAN}Press Enter to continue...{Colors.END}")

def display_main_menu():
    """Display the main menu"""
    print_header("📊 Portfolio Database Manager")
    print("1️⃣  Manage Skills")
    print("2️⃣  Manage Projects") 
    print("3️⃣  Manage Experience")
    print("4️⃣  Manage Education")
    print("5️⃣  Manage Achievements")
    print("6️⃣  Bulk Operations")
    print("7️⃣  Database Overview")
    print("8️⃣  Quick Setup (Add Sample Data)")
    print("0️⃣  Exit")
    print(f"\n{Colors.BLUE}Choose an option (0-8): {Colors.END}", end="")

def display_model_menu(model_name):
    """Display menu for a specific model"""
    print_header(f"🎯 Manage {model_name.title()}")
    print("1️⃣  View All Records")
    print("2️⃣  Add New Record")
    print("3️⃣  Edit Record")
    print("4️⃣  Delete Record")
    print("5️⃣  Search Records")
    print("6️⃣  Delete All Records")
    print("0️⃣  Back to Main Menu")
    print(f"\n{Colors.BLUE}Choose an option (0-6): {Colors.END}", end="")

def get_model_info():
    """Return model information dictionary"""
    return {
        'skills': {
            'model': Skill,
            'fields': ['name', 'category', 'icon', 'proficiency'],
            'required': ['name'],
            'display_fields': ['name', 'category', 'proficiency']
        },
        'projects': {
            'model': Project,
            'fields': ['title', 'description', 'category', 'technologies', 'highlights', 'date', 'github'],
            'required': ['title', 'description'],
            'display_fields': ['title', 'category', 'date']
        },
        'experience': {
            'model': Experience,
            'fields': ['title', 'company', 'location', 'period', 'description'],
            'required': ['title', 'company'],
            'display_fields': ['title', 'company', 'period']
        },
        'education': {
            'model': Education,
            'fields': ['degree', 'institution', 'field', 'location', 'period', 'achievement'],
            'required': ['degree', 'institution'],
            'display_fields': ['degree', 'institution', 'period']
        },
        'achievements': {
            'model': Achievement,
            'fields': ['title', 'description', 'date', 'location', 'icon'],
            'required': ['title'],
            'display_fields': ['title', 'date', 'location']
        }
    }

def display_records(model_name):
    """Display all records for a model"""
    model_info = get_model_info()[model_name]
    model = model_info['model']
    records = model.objects.all()
    
    print_header(f"📋 All {model_name.title()} Records")
    
    if not records:
        print_info(f"No {model_name} found in database")
        return
    
    for i, record in enumerate(records, 1):
        print(f"\n{Colors.BOLD}{i}. {Colors.END}", end="")
        for field in model_info['display_fields']:
            value = getattr(record, field, 'N/A')
            if field == 'proficiency' and value:
                print(f"{field.title()}: {value}% | ", end="")
            else:
                print(f"{field.title()}: {value} | ", end="")
        print(f"ID: {record.id}")
    
    print(f"\n{Colors.GREEN}Total: {records.count()} records{Colors.END}")

def add_record(model_name):
    """Add a new record"""
    model_info = get_model_info()[model_name]
    model = model_info['model']
    
    print_header(f"➕ Add New {model_name.title().rstrip('s')}")
    
    record_data = {}
    
    for field in model_info['fields']:
        required = field in model_info['required']
        
        if field == 'proficiency':
            value = get_user_input(f"Enter {field} (0-100): ", int, required)
            if value and (value < 0 or value > 100):
                print_error("Proficiency must be between 0 and 100")
                continue
        else:
            value = get_user_input(f"Enter {field}{' (required)' if required else ' (optional)'}: ", str, required)
        
        if value:
            record_data[field] = value
    
    try:
        record = model.objects.create(**record_data)
        print_success(f"Created {model_name.rstrip('s')}: {getattr(record, model_info['display_fields'][0])}")
    except Exception as e:
        print_error(f"Error creating record: {str(e)}")

def edit_record(model_name):
    """Edit an existing record"""
    model_info = get_model_info()[model_name]
    model = model_info['model']
    
    display_records(model_name)
    
    if not model.objects.exists():
        return
    
    record_id = get_user_input("Enter the ID of the record to edit: ", int)
    
    try:
        record = model.objects.get(id=record_id)
        print_header(f"✏️ Edit {model_name.title().rstrip('s')}")
        
        for field in model_info['fields']:
            current_value = getattr(record, field, '')
            print(f"Current {field}: {current_value}")
            
            if field == 'proficiency':
                new_value = get_user_input(f"New {field} (0-100, press Enter to keep current): ", int, False)
            else:
                new_value = get_user_input(f"New {field} (press Enter to keep current): ", str, False)
            
            if new_value is not None:
                setattr(record, field, new_value)
        
        record.save()
        print_success("Record updated successfully!")
        
    except model.DoesNotExist:
        print_error("Record not found!")
    except Exception as e:
        print_error(f"Error updating record: {str(e)}")

def delete_record(model_name):
    """Delete a specific record"""
    model_info = get_model_info()[model_name]
    model = model_info['model']
    
    display_records(model_name)
    
    if not model.objects.exists():
        return
    
    record_id = get_user_input("Enter the ID of the record to delete: ", int)
    
    try:
        record = model.objects.get(id=record_id)
        record_name = getattr(record, model_info['display_fields'][0])
        
        if confirm_action(f"Delete '{record_name}'?"):
            record.delete()
            print_success("Record deleted successfully!")
        else:
            print_info("Deletion cancelled")
            
    except model.DoesNotExist:
        print_error("Record not found!")
    except Exception as e:
        print_error(f"Error deleting record: {str(e)}")

def search_records(model_name):
    """Search records"""
    model_info = get_model_info()[model_name]
    model = model_info['model']
    
    search_term = get_user_input("Enter search term: ")
    
    # Search in the first display field (usually name/title)
    search_field = model_info['display_fields'][0]
    filter_kwargs = {f"{search_field}__icontains": search_term}
    
    results = model.objects.filter(**filter_kwargs)
    
    print_header(f"🔍 Search Results for '{search_term}'")
    
    if not results:
        print_info("No matching records found")
        return
    
    for i, record in enumerate(results, 1):
        print(f"\n{Colors.BOLD}{i}. {Colors.END}", end="")
        for field in model_info['display_fields']:
            value = getattr(record, field, 'N/A')
            print(f"{field.title()}: {value} | ", end="")
        print(f"ID: {record.id}")

def manage_model(model_name):
    """Manage a specific model"""
    while True:
        display_model_menu(model_name)
        choice = input()
        
        if choice == '1':
            display_records(model_name)
            pause()
        elif choice == '2':
            add_record(model_name)
            pause()
        elif choice == '3':
            edit_record(model_name)
            pause()
        elif choice == '4':
            delete_record(model_name)
            pause()
        elif choice == '5':
            search_records(model_name)
            pause()
        elif choice == '6':
            delete_all_records(model_name)
            pause()
        elif choice == '0':
            break
        else:
            print_error("Invalid choice! Please try again.")
            pause()

def delete_all_records(model_name):
    """Delete all records for a model"""
    model_info = get_model_info()[model_name]
    model = model_info['model']
    count = model.objects.count()
    
    if count == 0:
        print_info(f"No {model_name} to delete")
        return
    
    if confirm_action(f"Delete ALL {count} {model_name} records?"):
        model.objects.all().delete()
        print_success(f"Deleted all {count} {model_name} records")
    else:
        print_info("Deletion cancelled")

def delete_all_data():
    """Delete all existing data from the database"""
    print_header("💥 Delete ALL Database Records")
    
    total_records = (Skill.objects.count() + Project.objects.count() + 
                    Experience.objects.count() + Education.objects.count() + 
                    Achievement.objects.count())
    
    if total_records == 0:
        print_info("Database is already empty!")
        return
    
    print_warning(f"This will delete {total_records} total records from ALL tables!")
    
    if not confirm_action("Are you absolutely sure?"):
        print_info("Operation cancelled")
        return
    
    # Delete in order to avoid foreign key constraints
    try:
        Achievement.objects.all().delete()
        Education.objects.all().delete() 
        Experience.objects.all().delete()
        Project.objects.all().delete()
        Skill.objects.all().delete()
        print_success("All data deleted successfully!")
    except Exception as e:
        print_error(f"Error deleting data: {str(e)}")
    
    Project.objects.all().delete()
    print("Deleted all projects")
    
    Skill.objects.all().delete()
    print("Deleted all skills")
    
    print("✅ All data deleted successfully!\n")

def delete_specific_data(model_name):
    """Delete data from a specific model"""
    models = {
        'skills': Skill,
        'projects': Project,
        'experiences': Experience,
        'education': Education,
        'achievements': Achievement,
    }
    
    if model_name.lower() in models:
        model = models[model_name.lower()]
        count = model.objects.count()
        model.objects.all().delete()
        print(f"✅ Deleted {count} {model_name} records")
    else:
        print(f"❌ Unknown model: {model_name}")
        print(f"Available models: {', '.join(models.keys())}")

def create_sample_data():
    """Create sample data for the portfolio"""
    print("Creating sample data...")
    
    # Create Skills with proficiency levels
    skills_data = get_skills_data()
    
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
    
    print("\n✅ Sample data created successfully!")

def update_existing_data():
    """Update existing records with new data"""
    print("Updating existing data...")
    
    # Update skills that already exist
    for skill_data in get_skills_data():
        try:
            skill = Skill.objects.get(name=skill_data["name"])
            # Update fields
            skill.category = skill_data.get("category", skill.category)
            skill.icon = skill_data.get("icon", skill.icon)
            skill.proficiency = skill_data.get("proficiency", skill.proficiency)
            skill.save()
            print(f"Updated skill: {skill.name}")
        except Skill.DoesNotExist:
            # Create if doesn't exist
            skill = Skill.objects.create(**skill_data)
            print(f"Created new skill: {skill.name}")
    
    # Similar updates for other models can be added here
    print("✅ Data updated successfully!")

def get_skills_data():
    """Return skills data array"""
    return [
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

def show_current_data():
    """Display current data in the database"""
    print("\n📊 Current Database Contents:")
    print("=" * 50)
    
    skills_count = Skill.objects.count()
    projects_count = Project.objects.count()
    experiences_count = Experience.objects.count()
    education_count = Education.objects.count()
    achievements_count = Achievement.objects.count()
    
    print(f"Skills: {skills_count}")
    print(f"Projects: {projects_count}")
    print(f"Experiences: {experiences_count}")
    print(f"Education: {education_count}")
    print(f"Achievements: {achievements_count}")
    
    if skills_count > 0:
        print(f"\nSkill examples:")
        for skill in Skill.objects.all()[:3]:
            print(f"  - {skill.name} ({skill.proficiency}%)")
    
    if projects_count > 0:
        print(f"\nProject examples:")
        for project in Project.objects.all()[:2]:
            print(f"  - {project.title}")
    
    print("=" * 50)

def show_database_overview():
    """Display database overview with statistics"""
    print_header("📊 Database Overview")
    
    models_info = get_model_info()
    total_records = 0
    
    for model_name, info in models_info.items():
        count = info['model'].objects.count()
        total_records += count
        
        if count > 0:
            print(f"{Colors.GREEN}✅ {model_name.title()}: {count} records{Colors.END}")
            # Show recent examples
            recent = info['model'].objects.all()[:2]
            for record in recent:
                display_field = info['display_fields'][0]
                name = getattr(record, display_field, 'Unknown')
                print(f"   - {name}")
        else:
            print(f"{Colors.RED}❌ {model_name.title()}: 0 records{Colors.END}")
    
    print(f"\n{Colors.BOLD}📈 Total Records: {total_records}{Colors.END}")
    
    if total_records == 0:
        print_info("Database is empty! Use 'Quick Setup' to add sample data.")

def bulk_operations_menu():
    """Display bulk operations menu"""
    print_header("⚡ Bulk Operations")
    print("1️⃣  Add All Sample Data")
    print("2️⃣  Delete All Data") 
    print("0️⃣  Back to Main Menu")
    print(f"\n{Colors.BLUE}Choose an option (0-2): {Colors.END}", end="")

def quick_setup():
    """Quick setup with sample data"""
    print_header("🚀 Quick Setup")
    print_info("This will add sample data to your database")
    
    if confirm_action("Proceed with quick setup?"):
        create_sample_data()
    else:
        print_info("Setup cancelled")

def main_interactive():
    """Main interactive interface"""
    model_mapping = {
        '1': 'skills',
        '2': 'projects', 
        '3': 'experience',
        '4': 'education',
        '5': 'achievements'
    }
    
    print(f"{Colors.BOLD}Welcome to Portfolio Database Manager!{Colors.END}")
    
    while True:
        try:
            display_main_menu()
            choice = input()
            
            if choice == '0':
                print_success("Goodbye! 👋")
                break
            elif choice in model_mapping:
                manage_model(model_mapping[choice])
            elif choice == '6':
                bulk_operations_menu()
                bulk_choice = input()
                
                if bulk_choice == '1':
                    create_sample_data()
                    pause()
                elif bulk_choice == '2':
                    delete_all_data()
                    pause()
                elif bulk_choice == '0':
                    continue
                else:
                    print_error("Invalid choice!")
                    pause()
                    
            elif choice == '7':
                show_database_overview()
                pause()
            elif choice == '8':
                quick_setup()
                pause()
            else:
                print_error("Invalid choice! Please try again.")
                pause()
                
        except KeyboardInterrupt:
            print(f"\n{Colors.WARNING}Operation interrupted by user{Colors.END}")
            if confirm_action("Exit the program?"):
                break
        except Exception as e:
            print_error(f"An error occurred: {str(e)}")
            pause()

def main():
    """Main function - check for command line args or run interactive mode"""
    if len(sys.argv) > 1:
        # Old command line mode for backward compatibility
        parser = argparse.ArgumentParser(description='Manage portfolio database records')
        parser.add_argument('action', choices=['add', 'delete', 'delete-all', 'update', 'show'], 
                           help='Action to perform')
        parser.add_argument('--model', choices=['skills', 'projects', 'experiences', 'education', 'achievements'], 
                           help='Specific model to operate on (for delete action)')
        parser.add_argument('--force', action='store_true', 
                           help='Skip confirmation prompts')
        
        args = parser.parse_args()
        
        if args.action == 'show':
            show_database_overview()
        elif args.action == 'add':
            print("🔄 Adding sample data to database...")
            create_sample_data()
        else:
            print("Use interactive mode: python3 populate_db.py")
    else:
        # Interactive mode
        main_interactive()

if __name__ == "__main__":
    main()