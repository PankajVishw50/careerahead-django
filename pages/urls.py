
from django.urls import path, re_path

from .views import react_app

urlpatterns = [
    re_path('', react_app, name='react_app'), 
]