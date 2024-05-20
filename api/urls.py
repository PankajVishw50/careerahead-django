from django.urls import path

from .views import test_1, get_me

urlpatterns = [
    path('test/1', test_1),
    path('me', get_me, name='get_me'),
]
