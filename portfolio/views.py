from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, FileResponse
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.core.paginator import Paginator
from django.db.models import Q
import os
from .models import Project, Skill, Experience, Education, Achievement, ContactMessage


def index(request):
    """Homepage view with all portfolio data"""
    # Get featured projects (first 3)
    featured_projects = Project.objects.all()[:3]
    
    # Get all skills
    skills = Skill.objects.all()
    
    # Get latest achievements
    achievements = Achievement.objects.all()[:3]
    
    # Get experience and education
    experiences = Experience.objects.all()
    education = Education.objects.all()
    
    context = {
        'featured_projects': featured_projects,
        'skills': skills,
        'achievements': achievements,
        'experiences': experiences,
        'education': education,
    }
    
    return render(request, 'index.html', context)


def about(request):
    """About page view"""
    skills = Skill.objects.all()
    experiences = Experience.objects.all()
    education = Education.objects.all()
    achievements = Achievement.objects.all()
    
    context = {
        'skills': skills,
        'experiences': experiences,
        'education': education,
        'achievements': achievements,
    }
    
    return render(request, 'about.html', context)


def all_projects(request):
    """Projects page with filtering and pagination"""
    projects = Project.objects.all()
    
    # Filter by category if specified
    category = request.GET.get('category')
    if category and category != 'All':
        projects = projects.filter(category=category)
    
    # Get unique categories for filter buttons
    categories = Project.objects.values_list('category', flat=True).distinct()
    categories = [cat for cat in categories if cat]  # Remove empty categories
    
    # Search functionality
    search_query = request.GET.get('search')
    if search_query:
        projects = projects.filter(
            Q(title__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(technologies__icontains=search_query)
        )
    
    # Pagination
    paginator = Paginator(projects, 6)  # Show 6 projects per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'projects': page_obj,
        'categories': categories,
        'current_category': category,
        'search_query': search_query,
    }
    
    return render(request, 'projects.html', context)


def project_detail(request, project_id):
    """Individual project detail page"""
    project = get_object_or_404(Project, id=project_id)
    
    # Get related projects (same category, excluding current)
    related_projects = Project.objects.filter(
        category=project.category
    ).exclude(id=project.id)[:3]
    
    context = {
        'project': project,
        'related_projects': related_projects,
    }
    
    return render(request, 'project_detail.html', context)


@csrf_exempt
def contact(request):
    """Contact form submission"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        if name and email and subject and message:
            # Save contact message
            contact_message = ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            
            messages.success(request, 'Thank you for your message! I will get back to you soon.')
        else:
            messages.error(request, 'Please fill in all fields.')
    
    return render(request, 'contact.html')


def download_resume(request):
    """Download resume PDF"""
    resume_path = os.path.join('static', 'resume', 'Arindam_Resume.pdf')
    
    if os.path.exists(resume_path):
        response = FileResponse(
            open(resume_path, 'rb'),
            as_attachment=True,
            filename='Arindam_Shukla_Resume.pdf'
        )
        return response
    else:
        messages.error(request, 'Resume file not found.')
        return render(request, 'index.html')


def handler404(request, exception):
    """Custom 404 error handler"""
    return render(request, '404.html', status=404)


def handler500(request):
    """Custom 500 error handler"""
    return render(request, '500.html', status=500)