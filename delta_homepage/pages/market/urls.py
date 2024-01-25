from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="market_index"),
]
