from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from .models import Profile, Project, Skill, Experience, Achievement, Education, Contact
from .serializers import (
    ProfileSerializer, ProjectSerializer, SkillSerializer,
    ExperienceSerializer, AchievementSerializer, EducationSerializer,
    ContactSerializer
)

# Cache viewsets for 5 minutes (300 seconds)
@method_decorator(cache_page(60 * 5), name='dispatch')
class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        # Add cache headers for client-side caching (60 seconds)
        response['Cache-Control'] = 'public, max-age=60, s-maxage=300'
        return response

@method_decorator(cache_page(60 * 5), name='dispatch')
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('-order', '-id')
    serializer_class = ProjectSerializer
    
    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        response['Cache-Control'] = 'public, max-age=60, s-maxage=300'
        return response

@method_decorator(cache_page(60 * 5), name='dispatch')
class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    
    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        response['Cache-Control'] = 'public, max-age=60, s-maxage=300'
        return response

@method_decorator(cache_page(60 * 5), name='dispatch')
class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer
    
    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        response['Cache-Control'] = 'public, max-age=60, s-maxage=300'
        return response

@method_decorator(cache_page(60 * 5), name='dispatch')
class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    
    def get_queryset(self):
        achievements = list(Achievement.objects.all())
        # Sort by parsed date
        return sorted(achievements, key=lambda x: x.get_sort_date(), reverse=True)
    
    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        response['Cache-Control'] = 'public, max-age=60, s-maxage=300'
        return response

@method_decorator(cache_page(60 * 5), name='dispatch')
class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    
    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        response['Cache-Control'] = 'public, max-age=60, s-maxage=300'
        return response

@api_view(['POST'])
def contact_submit(request):
    from django.core.mail import send_mail
    from django.conf import settings
    import traceback
    
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        # Save contact to database first
        try:
            contact = serializer.save()
        except Exception as e:
            print(f"✗ DATABASE SAVE FAILED: {str(e)}")
            return Response({'message': 'Failed to save message. Please try again.'}, status=500)
        
        # Try to send email notification (non-critical)
        try:
            # Check if email is configured
            if not settings.EMAIL_HOST_USER or not settings.EMAIL_HOST_PASSWORD:
                print("⚠ EMAIL NOT CONFIGURED - Skipping email notification")
            else:
                print("=" * 50)
                print("ATTEMPTING TO SEND EMAIL")
                print(f"From: {settings.DEFAULT_FROM_EMAIL}")
                print(f"To: {settings.NOTIFICATION_EMAIL}")
                print("=" * 50)
                
                email_subject = f"New Contact Form Submission from {contact.name}"
                subject_line = f"Subject: {contact.subject}" if contact.subject else "No subject"
                message = f"""
You have received a new message from your portfolio website.

------------------------------------
CONTACT DETAILS
------------------------------------
Name: {contact.name}
Email: {contact.email}
{subject_line}
Submitted: {contact.created_at.strftime('%B %d, %Y at %I:%M %p')}

------------------------------------
MESSAGE
------------------------------------
{contact.message}

------------------------------------
You can reply directly to {contact.email}
------------------------------------
"""
                
                result = send_mail(
                    subject=email_subject,
                    message=message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.NOTIFICATION_EMAIL],
                    fail_silently=False,
                )
                print(f"✓ EMAIL SENT SUCCESSFULLY! Result: {result}")
                print("=" * 50)
        except Exception as e:
            # Log error but don't fail the request - email is optional
            print("✗ EMAIL SENDING FAILED (Non-critical)")
            print(f"Error: {str(e)}")
            print(traceback.format_exc())
            print("=" * 50)
            # Continue anyway - contact was saved successfully
        
        # Always return success if contact was saved
        return Response({'message': 'Message sent successfully!'}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def health_check(request):
    """
    Lightweight health check endpoint for frontend to verify backend is awake.
    Returns immediately with minimal processing.
    """
    return Response({'status': 'ok'}, status=200)

@api_view(['GET'])
@cache_page(60 * 5)
def home_data(request):
    """
    Consolidated endpoint that returns all data needed for the home page.
    Reduces 5 separate API calls to 1 call, significantly improving performance.
    """
    # Fetch all data
    profile = Profile.objects.first()
    skills = Skill.objects.all()
    projects = Project.objects.all().order_by('-order', '-id')[:3]  # Only first 3 for featured
    experiences = Experience.objects.all().order_by('-start_date')
    achievements_list = list(Achievement.objects.all())
    # Sort achievements by parsed date
    achievements = sorted(achievements_list, key=lambda x: x.get_sort_date(), reverse=True)
    
    # Serialize data
    data = {
        'profile': ProfileSerializer(profile).data if profile else None,
        'skills': SkillSerializer(skills, many=True).data,
        'projects': ProjectSerializer(projects, many=True).data,
        'experiences': ExperienceSerializer(experiences, many=True).data,
        'achievements': AchievementSerializer(achievements, many=True).data,
    }
    
    # Add cache headers
    response = Response(data)
    response['Cache-Control'] = 'public, max-age=60, s-maxage=300'
    return response

