from django.urls import path

from . import views

urlpatterns = [
    path('login/', views._login, name='login'),
]
