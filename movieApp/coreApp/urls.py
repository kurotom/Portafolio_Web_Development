from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('genre/<str:genrename>', views.genre, name='genre'),
]
