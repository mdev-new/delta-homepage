from django.shortcuts import render
from django.http import HttpResponse

from delta_homepage.navbar import navbar

def index(request):
    context = {
        'name': request.resolver_match.view_name,
        'path': request.path,
        'navbar' : navbar(None)
    }
    return render(request, 'grades/index.html', context)
