from django.db import models
from django.contrib.auth.models import AbstractUser

from .manager import CustomUserManager

# Create your models here.
class CustomUserModel(AbstractUser):
    email = models.EmailField(
        primary_key=True
    )

    username = models.CharField(
        max_length=120
    )

    is_counsellor = models.BooleanField(
        default=False
    )

    setup = models.BooleanField(
        default=False
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    
    def __str__(self) -> str:
        return self.email