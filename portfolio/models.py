from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300)  # e.g., "AI/ML Specialist & Computer Science Student"
    bio = models.TextField()  # Main bio/description
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)  # For nav logo
    about_image = models.ImageField(upload_to='profile/', blank=True, null=True)  # For About section
    resume_url = models.FileField(upload_to='resume/', blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profile'

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=500)
    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    category = models.CharField(max_length=100, default='')
    order = models.IntegerField(default=0, help_text='Higher numbers appear first')
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-order', '-id']  # Order by highest number first, then by newest

class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    icon = models.CharField(max_length=500, default='')  # Can store emoji, URL, or file path
    
    def __str__(self):
        return self.name

class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    start_date = models.CharField(max_length=100, default='')
    end_date = models.CharField(max_length=100, default='Present')  # Can be "Present"
    description = models.TextField(blank=True, default='')
    location = models.CharField(max_length=200, blank=True, default='')
    
    def __str__(self):
        return f"{self.title} at {self.company}"

class Achievement(models.Model):
    icon = models.CharField(max_length=500, default='')  # Can store emoji, URL, or file path
    name = models.CharField(max_length=200)
    date = models.CharField(max_length=100)  # Flexible format: year, month-year, or full date
    description = models.TextField(blank=True, default='')
    location = models.CharField(max_length=200, blank=True, default='')
    
    def __str__(self):
        return self.name

class Education(models.Model):
    degree = models.CharField(max_length=200)
    specialization = models.CharField(max_length=200, blank=True, default='')
    institute = models.CharField(max_length=200)
    start_date = models.CharField(max_length=100)  # Format: "Month Year"
    end_date = models.CharField(max_length=100)  # Format: "Month Year" or "Present"
    
    def __str__(self):
        return f"{self.degree} at {self.institute}"

class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message from {self.name}"
