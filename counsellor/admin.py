from django.contrib import admin

from .models import Counsellor, Review, Question, Appointment

# Register your models here.

admin.site.register(Counsellor)
admin.site.register(Review)
admin.site.register(Question)
admin.site.register(Appointment)