from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=500)
    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    image = models.URLField(blank=True)
    
    def __str__(self):
        return self.title

class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    proficiency = models.IntegerField(default=50)
    
    def __str__(self):
        return self.name

class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.title} at {self.company}"

class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message from {self.name}"
