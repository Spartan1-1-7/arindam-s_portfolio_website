from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile, Project, Skill, Experience, Achievement, Education, Contact
from .serializers import (
    ProfileSerializer, ProjectSerializer, SkillSerializer,
    ExperienceSerializer, AchievementSerializer, EducationSerializer,
    ContactSerializer
)

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('-order', '-id')
    serializer_class = ProjectSerializer

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

@api_view(['POST'])
def contact_submit(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Message sent successfully!'}, status=201)
    return Response(serializer.errors, status=400)

