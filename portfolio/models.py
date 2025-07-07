from django.db import models
from django.utils import timezone


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.CharField(max_length=50, blank=True, null=True)
    category = models.CharField(max_length=50, blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    technologies = models.TextField(blank=True, null=True)  # Stored as comma-separated values
    highlights = models.TextField(blank=True, null=True)  # Stored as comma-separated values
    content = models.TextField(blank=True, null=True)  # Detailed project content
    
    def __str__(self):
        return self.title
    
    @property
    def tech_list(self):
        return [tech.strip() for tech in self.technologies.split(',')] if self.technologies else []
    
    @property
    def highlight_list(self):
        return [highlight.strip() for highlight in self.highlights.split(',')] if self.highlights else []


class Achievement(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    date = models.CharField(max_length=50, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return self.title


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True, null=True)
    proficiency = models.IntegerField(default=0, help_text="Proficiency level from 0-100")
    
    def __str__(self):
        return self.name


class Experience(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True, null=True)
    period = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.title} at {self.company}"


class Education(models.Model):
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    field = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    period = models.CharField(max_length=100, blank=True, null=True)
    achievement = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return f"{self.degree} from {self.institution}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    date_sent = models.DateTimeField(default=timezone.now)
    read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
    
    class Meta:
        ordering = ['-date_sent']