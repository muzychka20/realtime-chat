from django.urls import path
from .views import SignIn

urlpatterns = [
    path('signin/', SignIn.as_view(), name='SignIn')
]
