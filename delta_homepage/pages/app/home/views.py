from django.shortcuts import render

from django.http import HttpResponse
from delta_homepage.navbar import navbar

from _global.models import User

from app.social.forms import NewPost
from app.social.models import Post

def index(request):
    context = {
        'name': 'Domov',
        'path': request.path,
        'posts': Post.objects.all(),
       # 'toast': {
       #     'text': 'my message',
       #     'type': 'success'
       # },
        'chats': [{'name': 'Family Group Chat'}, {'name': '@acopier'}],
        'navbar' : navbar(request),
        'new_post_form': NewPost()
    }
    return render(request, 'app/home/index.html', context)
