from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('register', views.register_view, name='register'),
    path('mywallet', views.wallet, name="wallet"),
    path('createwallet', views.createwallet, name="createwallet"),
    path('operations', views.operations, name="operations"),
    path('historical/<str:q>', views.historical, name="historical"),
    path('delete', views.deleteWallet, name="delete"),
    
]
