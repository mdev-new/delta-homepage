from django.shortcuts import render
from django.http import HttpResponse

from delta_homepage.navbar import navbar
from .models import Listing

# Create your views here.

def index(request):
    context = {
        'name': request.resolver_match.view_name,
        'path': request.path,
        'navbar' : navbar(request),
        'items': Listing.objects.all()
    }
    return render(request, 'app/market/index.html', context)
