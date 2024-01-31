from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login

from .forms import LoginForm
from .forms import RegisterForm

from .models import User

def _login(request):
    if request.method == "POST":
        form = LoginForm(request.POST) # Populate the form with data from the request
        if form.is_valid():
            data = form.cleaned_data
            user = authenticate(username=data['username'], password=data['password'])

            if user is not None:
                login(request, user)
            else:
                pass

            return HttpResponseRedirect("/app")

    else:
        form = LoginForm()
        return render(request, 'global/login.html', {'form': form})

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST) # Populate the form with data from the request
        if form.is_valid():
            data = form.cleaned_data
            user = User.objects.create_user(data['username'], data['email'], data['password'])
            user.first_name=data['name']
            user.last_name=data['surname']
            user.save()

            return HttpResponseRedirect("/")
