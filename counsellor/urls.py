from django.urls import path

from .views import (
    get_counsellor_types, get_counsellors,
    get_counsellor, get_reviews,
    get_questions, request_contact,
    ask_question, post_review
    )

urlpatterns = [
    path('types', get_counsellor_types, name='get_counsellor_types'),
    path('counsellors', get_counsellors, name='get_counsellors'),
    path('<str:id>', get_counsellor, name='get_counsellor'),
    path('<int:id>/reviews', get_reviews, name='get_reviews'),
    path('<int:id>/questions', get_questions, name='get_questions'),
    path('<int:id>/appoint', request_contact, name='appoint_contact'),
    path('<int:id>/ask', ask_question, name='ask'),
    path('<int:id>/review', post_review, name='post_review'),
]
