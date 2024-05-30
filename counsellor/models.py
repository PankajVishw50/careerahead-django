from django.db import models
from utils.validators import IntegerRangeValidator

# Create your models here.
class CounsellorType(models.Model):
    type = models.CharField(
        "Type of counsellor",
        max_length=60
    )

    users = models.ManyToManyField(
        'accounts.CustomUserModel',
    )

    counsellors = models.ManyToManyField('Counsellor') 

    def __str__(self) -> str:
        return self.type 



class Counsellor(models.Model):
    user = models.OneToOneField(
        'accounts.CustomUserModel', primary_key=True, on_delete=models.CASCADE
    )

    introduction_section = models.TextField(
        max_length=1024,
        blank=True,
        null=True,
    )

    qualification_section = models.TextField(
        max_length=1024,
        blank=True,
        null=True
    )

    specialization_section = models.TextField(
        max_length=1024,
        blank=True,
        null=True
    )

    rates_section = models.TextField(
        max_length=1024,
        blank=True,
        null=True
    )

    expected_fee = models.IntegerField(
        'Estimated fee', 
        validators= [IntegerRangeValidator(1, 99999)],
        default=999
    )

    experience = models.IntegerField(
        validators=[IntegerRangeValidator(0, 100)],
        default=0
    )

    # sessions = models.ManyToManyField('accounts.CustomUserModel', through='accounts.Session', related_name='related_to')


    def __str__(self) -> str:
        return self.user.username


class Review(models.Model):
    user = models.ForeignKey('accounts.CustomUserModel', on_delete=models.CASCADE)
    counsellor = models.ForeignKey(Counsellor, on_delete=models.CASCADE)

    rating = models.IntegerField(choices=[
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    ])

    posting_time = models.DateTimeField(auto_now_add=True)

    comment = models.TextField(
        max_length=1024
    )

    def __str__(self):
        return f"{self.user.username} -> {self.counsellor.user.username}"
    

class Question(models.Model):

    user = models.ForeignKey('accounts.CustomUserModel', on_delete=models.CASCADE)
    counsellor = models.ForeignKey(Counsellor, on_delete=models.CASCADE)

    question = models.CharField(
        max_length=255,
    )
    answer = models.TextField(
        max_length=1024,
        blank=True,
        null=True
    )

    posting_time = models.DateTimeField(auto_now_add=True)
    answer_time = models.DateTimeField()

class Appointment(models.Model):

    user = models.ForeignKey('accounts.CustomUserModel', on_delete=models.CASCADE)
    counsellor = models.ForeignKey(Counsellor, on_delete=models.CASCADE)

    note = models.TextField(
        max_length=1024
    )

    preffered_date_from = models.DateField()
    preffered_date_to = models.DateField()

    preffered_time_from = models.TimeField()
    preffered_time_to = models.TimeField()

    cancelled = models.BooleanField(
        default=False
    )
    accepted = models.BooleanField(
        default=False
    )

    request_time = models.DateTimeField(
        auto_now_add=True
    )
    accept_time = models.DateTimeField(
        null=True, 
        blank=True
    )

    def __str__(self) -> str:
        return f"{self.user.username} -> {self.counsellor.user.username}"

