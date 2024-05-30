from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from .manager import CustomUserManager
from utils.validators import IntegerRangeValidator

# Create your models here.
class CustomUserModel(AbstractUser):

    email = models.EmailField(
        unique=True
    )

    username = models.CharField(
        max_length=120
    )

    is_counsellor = models.BooleanField(
        default=False
    )

    is_setup = models.BooleanField(
        default=False
    )

    interested_categories = models.JSONField(
        blank=True,
        null=True,
    )

    image = models.URLField(
        null=True,
        blank=True,
    )

    gender = models.CharField(
        max_length=6,
        choices=[
            ('male', 'male'),
            ('female', 'female'),
            ('other', 'other'),
        ],
        null=True,
        blank=True
    )

    # age = models.IntegerField(
    #     blank=True,
    #     null=True,
    #     validators=[IntegerRangeValidator(12, 150)]
    # )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    
    def __str__(self) -> str:
        return f"{self.email} -> {'superuser' if self.is_superuser else ('counsellor' if self.is_counsellor else 'user')}"
    

class EmailVerification(models.Model):
    user = models.OneToOneField(
        CustomUserModel,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    uuid = models.UUIDField(
        default=uuid.uuid4,
        editable=False
    )

    verified = models.BooleanField(
        default=False
    )

    expiry_date = models.DateTimeField()    

    def __str__(self) -> str:
        return self.user.username


class Session(models.Model):
    user_id = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    counsellor_id = models.ForeignKey('counsellor.Counsellor', on_delete=models.CASCADE)

    request_time = models.DateTimeField(auto_created=True, auto_now_add=True)
    accept_time = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)
    cancelled = models.BooleanField(default=False)

    fee = models.IntegerField(
        "Counsellor Fee", validators=[IntegerRangeValidator(1, 99999)],
        default=1
    )


    

