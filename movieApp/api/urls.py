from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cast', views.cast, name='cast'),
    path('movie/<str:id>', views.movie, name='movie'),
    path('biography/<str:personID>', views.biography, name='biography'),

]
