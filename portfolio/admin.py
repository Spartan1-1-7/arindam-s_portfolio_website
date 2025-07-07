from django.contrib import admin
from .models import Project, Skill, Experience, Education, Achievement, ContactMessage


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'date']
    list_filter = ['category', 'date']
    search_fields = ['title', 'description', 'technologies']
    ordering = ['-date']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'icon']
    list_filter = ['category']
    search_fields = ['name']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'period']
    search_fields = ['title', 'company', 'location']
    ordering = ['-period']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'period']
    search_fields = ['degree', 'institution', 'field']
    ordering = ['-period']


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'location']
    search_fields = ['title', 'description']
    ordering = ['-date']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'date_sent', 'read']
    list_filter = ['read', 'date_sent']
    search_fields = ['name', 'email', 'subject']
    ordering = ['-date_sent']
    readonly_fields = ['date_sent']
    
    def mark_as_read(self, request, queryset):
        queryset.update(read=True)
    mark_as_read.short_description = "Mark selected messages as read"
    
    actions = [mark_as_read]
