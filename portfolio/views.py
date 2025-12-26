from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Project, Skill, Experience, Contact
import json

def projects_list(request):
    projects = Project.objects.all().values()
    return JsonResponse(list(projects), safe=False)

def skills_list(request):
    skills = Skill.objects.all().values()
    return JsonResponse(list(skills), safe=False)

def experience_list(request):
    experiences = Experience.objects.all().values()
    return JsonResponse(list(experiences), safe=False)

@csrf_exempt
def contact_submit(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        Contact.objects.create(
            name=data.get('name'),
            email=data.get('email'),
            message=data.get('message')
        )
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)
