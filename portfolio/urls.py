from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profile', views.ProfileViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'experience', views.ExperienceViewSet)
router.register(r'achievements', views.AchievementViewSet)
router.register(r'education', views.EducationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', views.contact_submit, name='contact_submit'),
    path('health/', views.health_check, name='health_check'),
    path('home/', views.home_data, name='home_data'),
]

