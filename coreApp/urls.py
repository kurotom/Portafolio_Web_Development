from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('pdf/<str:filename>/<str:original>', views.pdf, name='pdf'),
]
