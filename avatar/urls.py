from django.urls import path

from .views import get_avatar

urlpatterns = [
    path('<str:random>', get_avatar, name='get_avatar')
]
        