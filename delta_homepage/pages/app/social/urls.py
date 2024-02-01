from django.urls import path

from . import views

urlpatterns = [
    path('users/<int:id>/', views.user, name='userprofile'),
    path('posts/new/', views.new_post, name='new_post'),
    path('posts/delete/', views.edit_post, name='delete_post'),
    path('posts/edit/', views.delete_post, name='edit_post'),
]
