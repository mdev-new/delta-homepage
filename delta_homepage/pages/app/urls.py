from django.urls import path, include

urlpatterns = [
    path('', include('app.home.urls'), name="home"),
    path('market/', include('app.market.urls'), name="market"),
    path('food/', include('app.food.urls'), name="food"),
    path('help/', include('app.helpdesk.urls'), name="helpdesk"),
    path('tickets/', include('app.tickets.urls'), name="tickets"),
    path('route/', include('app.route.urls'), name="route"),
    path('grades/', include('app.grades.urls'), name="grades"),
    path('torture/', include('app.writing.urls'), name="writing"),
]
