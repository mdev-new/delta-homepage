from django.urls import path

from . import views

# The names probably don't need to be prefixed
# since the package name is being specified already

urlpatterns = [
    path("", views.index, name="index"),
    path("<source>/<destination>", views.search, name="search"),
]
