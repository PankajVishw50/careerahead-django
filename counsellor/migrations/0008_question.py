# Generated by Django 5.0.6 on 2024-05-25 22:41

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('counsellor', '0007_alter_review_comment'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=255)),
                ('answer', models.TextField(max_length=1024)),
                ('posting_time', models.DateTimeField(auto_now_add=True)),
                ('answer_time', models.DateTimeField()),
                ('counsellor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='counsellor.counsellor')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
