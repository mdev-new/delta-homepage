from django.shortcuts import get_object_or_404, render

from _global.models import User

def user(request, id):
    return render(request, 'app/social/profile.html', { 'user': get_object_or_404(User, id=id) })

def new_post(request):
    pass

def edit_post(request):
    pass

def delete_post(request):
    pass
