from django.shortcuts import render

from django.http import HttpResponse
from delta_homepage.navbar import navbar
# Create your views here.

def index(request):
    context = {
        'name': request.resolver_match.view_name,
        'path': request.path,
        'posts': [
            {
                'title': 'test post',
                'author': { 'username': 'mdev' },
                'text': 'post text',
                'created_at': '20 minutes ago'
            }
        ],
        'navbar' : navbar(None)
    }
    return render(request, 'home/index.html', context)
