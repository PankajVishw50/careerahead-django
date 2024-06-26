# Generated by Django 5.0.6 on 2024-05-24 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_customusermodel_gender'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customusermodel',
            old_name='setup',
            new_name='is_setup',
        ),
        migrations.AddField(
            model_name='customusermodel',
            name='interested_categories',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customusermodel',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='customusermodel',
            name='gender',
            field=models.CharField(blank=True, choices=[('male', 'male'), ('female', 'female'), ('other', 'other')], max_length=6, null=True),
        ),
    ]
