from django.shortcuts import render

from django.http import HttpResponse
from delta_homepage.navbar import navbar
# Create your views here.

def index(request):
    context = {
        'name': request.resolver_match.view_name,
        'path': request.path,
        'lesson': {'text': 'This is my lesson!!!'},
        'navbar' : navbar(request)
    }
    return render(request, 'app/writing/index.html', context)
