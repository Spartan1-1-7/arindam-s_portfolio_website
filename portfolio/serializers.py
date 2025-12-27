from rest_framework import serializers
from .models import Profile, Project, Skill, Experience, Achievement, Education, Contact

class ProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    about_image = serializers.SerializerMethodField()
    resume_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = '__all__'
    
    def get_profile_image(self, obj):
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None
    
    def get_about_image(self, obj):
        if obj.about_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.about_image.url)
            return obj.about_image.url
        return None
    
    def get_resume_url(self, obj):
        if obj.resume_url:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.resume_url.url)
            return obj.resume_url.url
        return None

class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = '__all__'
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
