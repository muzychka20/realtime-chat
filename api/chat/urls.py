from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignIn, SignUp

urlpatterns = [
    path('signup/', SignUp.as_view(), name='SignUp'),
    path('signin/', SignIn.as_view(), name='SignIn'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
