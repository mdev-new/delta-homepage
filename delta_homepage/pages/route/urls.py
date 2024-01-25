from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="route_index"),
]
