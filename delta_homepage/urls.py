"""
URL configuration for delta_homepage project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tickets/', include('tickets.urls'), name="tickets"),
    path('route/', include('route.urls'), name="route"),
    path('market/', include('market.urls'), name="market"),
    path('torture/', include('writing.urls'), name="writing"),
    path('help/', include('helpdesk.urls'), name="helpdesk"),
    path('food/', include('food.urls'), name="food"),
    path('grades/', include('grades.urls'), name="grades"),
    #path('social/', include('tickets.urls')), # not needed - posts will be created on the home page, and chats will be there also
    path('', include('home.urls'), name="home")
]
