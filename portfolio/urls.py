from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.projects_list, name='projects'),
    path('skills/', views.skills_list, name='skills'),
    path('experience/', views.experience_list, name='experience'),
    path('contact/', views.contact_submit, name='contact'),
]
