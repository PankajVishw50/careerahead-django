# Generated by Django 5.0.6 on 2024-05-31 06:41

from django.db import migrations
from counsellor.data.counsellorData2 import counsellorData
import os
from django.conf import settings
import random
from utils.datetime import get_future_datetime
from django.contrib.auth.hashers import make_password
from accounts.models import CustomUserModel
from counsellor.data.counsellorTypeData import counsellorTypeData

def create_types(apps, schema):

    CounsellorType = apps.get_model('counsellor', 'CounsellorType')

    for data in counsellorTypeData:
        _type = CounsellorType.objects.create(
            type=data['fields']['type']
        )

def create_users(apps, schema):

    User = CustomUserModel

    # pankaj 
    pankaj = User.objects.create_superuser(
        'pankaj@gmail.com',
        'pankaj',
        'pankaj'
    )

    sahil = User.objects.create_user(
        'sahil@gmail.com',
        'sahil',
        'sahil'
    )

    guest = User.objects.create_superuser(
        'jatin@gmail.com',
        'jatin',
        'jatin'
    )


def create_counsellors(apps, schema):

    User = apps.get_model('accounts', 'CustomUserModel')
    EmailVerification = apps.get_model('accounts', 'EmailVerification')
    CounsellorType = apps.get_model('counsellor', 'CounsellorType')
    Counsellor = apps.get_model('counsellor', 'Counsellor')
    Question = apps.get_model('counsellor', 'Question')
    Review = apps.get_model('counsellor', 'Review')

    all_types = CounsellorType.objects.all()
    for counsellor in counsellorData:
        user = User.objects.create(
            email=counsellor['email'],
            username=counsellor['username'],
            is_counsellor=True,
            is_setup=True,
            image = os.path.join('static', 'images', 'user', counsellor['image']),
            gender=counsellor['gender'],
            password=make_password(counsellor['password'])
        )

        all_users = User.objects.exclude(pk=user.pk)


        email_v = EmailVerification.objects.create(
            user=user,
            verified=True,
            expiry_date=get_future_datetime(0),
        )

        # counsellor
        _counsellor = Counsellor.objects.create(
            introduction_section=counsellor['details']['introduction'],
            qualification_section=counsellor['details']['qualification'],
            specialization_section=counsellor['details']['specialization'],
            rates_section=counsellor['details']['rates'],
            expected_fee = counsellor['fee'],
            experience=random.randint(1, 10),
            user=user
        )

        types_id = []
        for x in range(random.randint(1, 3)):
            index = random.randint(0, all_types.count()-1)
            if index in types_id:
                continue
            
            types_id.append(index)
            _counsellor.counsellortype_set.add(all_types[index])
            
        # Questions 
        if (counsellor['questions']):
            for question in counsellor['questions']:
                _question = Question.objects.create(
                    user=all_users[random.randint(1, all_users.count()-1)],
                    counsellor=_counsellor,
                    question=question['question'],
                    answer=question['answer'],
                    posting_time=get_future_datetime(0),
                    answer_time=get_future_datetime(60*60)
                )
                _question.save()
            
        # reviews
        if (counsellor['rating']):
            for review in counsellor['rating']:
                _review = Review.objects.create(
                    user=all_users[random.randint(0, all_users.count()-1)],
                    counsellor=_counsellor,
                    rating=review['rating'],
                    posting_time=get_future_datetime(0),
                    comment=review['comment']
                )

        
        


class Migration(migrations.Migration):

    dependencies = [
        ('counsellor', '0015_alter_review_user'),
    ]

    operations = [
        migrations.RunPython(create_types),
        migrations.RunPython(create_users),
        migrations.RunPython(create_counsellors),
    ]
