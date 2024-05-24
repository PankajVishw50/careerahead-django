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

    description = models.TextField(
        null=True, blank=True
    )

    fee = models.IntegerField(
        "Counsellor Fee", validators=[IntegerRangeValidator(1, 99999)],
        default=1
    )

    sessions = models.ManyToManyField('accounts.CustomUserModel', through='accounts.Session', related_name='related_to')




