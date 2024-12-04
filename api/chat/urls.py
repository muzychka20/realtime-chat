from django.urls import path
from .views import SignIn, SignUp

urlpatterns = [
    path('signup/', SignUp.as_view(), name='SignUp'),
    path('signin/', SignIn.as_view(), name='SignIn'),
]
