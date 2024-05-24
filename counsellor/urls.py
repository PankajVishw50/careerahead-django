from django.urls import path

from .views import get_counsellor_types, get_counsellors, get_counsellor

urlpatterns = [
    path('types', get_counsellor_types, name='get_counsellor_types'),
    path('counsellors', get_counsellors, name='get_counsellors'),
    path('counsellor/<str:id>', get_counsellor, name='get_counsellor'),
]
