# Generated by Django 5.0.6 on 2024-05-24 13:58

import utils.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('counsellor', '0004_counsellortype_counsellors'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='counsellor',
            name='description',
        ),
        migrations.RemoveField(
            model_name='counsellor',
            name='fee',
        ),
        migrations.RemoveField(
            model_name='counsellor',
            name='sessions',
        ),
        migrations.RemoveField(
            model_name='counsellortype',
            name='counsellors',
        ),
        migrations.RemoveField(
            model_name='counsellortype',
            name='users',
        ),
        migrations.AddField(
            model_name='counsellor',
            name='expected_fee',
            field=models.IntegerField(default=999, validators=[utils.validators.IntegerRangeValidator(exclude=[], max=10, min=1)], verbose_name='Estimated fee'),
        ),
        migrations.AddField(
            model_name='counsellor',
            name='experience',
            field=models.IntegerField(default=0, validators=[utils.validators.IntegerRangeValidator(exclude=[], max=10, min=1)]),
        ),
        migrations.AddField(
            model_name='counsellor',
            name='introduction_section',
            field=models.TextField(blank=True, max_length=1024, null=True),
        ),
        migrations.AddField(
            model_name='counsellor',
            name='qualification_section',
            field=models.TextField(blank=True, max_length=1024, null=True),
        ),
        migrations.AddField(
            model_name='counsellor',
            name='rates_section',
            field=models.TextField(blank=True, max_length=1024, null=True),
        ),
        migrations.AddField(
            model_name='counsellor',
            name='specialization_section',
            field=models.TextField(blank=True, max_length=1024, null=True),
        ),
    ]
