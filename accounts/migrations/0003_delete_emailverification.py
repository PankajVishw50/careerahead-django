# Generated by Django 5.0.6 on 2024-05-21 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_emailverification'),
    ]

    operations = [
        migrations.DeleteModel(
            name='EmailVerification',
        ),
    ]
