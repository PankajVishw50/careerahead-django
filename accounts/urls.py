from django.urls import path

from .views import (
    login_view, logout_view,
    signin_view, email_verification
)

urlpatterns = [
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),
    path('signin', signin_view, name='signin'),
    path('email/verify', email_verification, name='email_verification'),
]
