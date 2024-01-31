"""
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Function views
    1. from my_app import views
    2. path('', views.home, name='home')
Class-based views
    1. from other_app.views import Home
    2. path('', Home.as_view(), name='home')
Including another URLconf
    1. from django.urls import include, path
    2. path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls'), name="app"),
    path('', include('_global.urls'), name="global"),
    path('', include('index.urls'), name="index"),
]
