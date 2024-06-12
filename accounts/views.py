from django.shortcuts import render, HttpResponse, redirect
from django.urls import reverse
import json
from django.contrib.auth import authenticate, login, logout
from django.core.validators import validate_email, MaxLengthValidator
from urllib.parse import urljoin
import datetime 
import uuid
import requests
from django.conf import settings
import os 
from django.template.loader import render_to_string

from utils.http import make_response
from accounts.models import CustomUserModel, EmailVerification
from counsellor.models import CounsellorType
from careerahead.configs import MULTIAVATAR_URL, MULTIAVATAR_API_KEY
from utils.user import get_me_serialized
from utils.email import send_mail
from utils.datetime import get_future_datetime
from careerahead.configs import EMAIL_VERIFICATION_EXPIRY_VALIDITY

from utils.decorators import allowed_http_methods

# Create your views here.

@allowed_http_methods(['POST'])
def login_view(req):
    response = HttpResponse()


    # Load Data
    try:
        _data = req.body
        obj_data = json.loads(_data)
        email = obj_data.get('email')
        password = obj_data.get('password')

        if not (email and password):
            raise ValueError('username and email not provided')
        
    except:
        return make_response(
            response, 
            {
                'statusCode': 400,
                'message': 'Please provide email and password in json object'
            },
            400
        )
    
    
    # Authenticating 
    user = authenticate(req, email=email, password=password)

    if not user:
        return make_response(
            response,
            {
                'statusCode': 401,
                'message': 'Invalid credentials',
            }, 
            405
        )

    # Login 
    login(req, user)

    return make_response(
        response, 
        get_me_serialized(user),
    )


def logout_view(req):
    logout(req)
    return make_response(
        HttpResponse(),
        {
            'statusCode': 200,
            'message': 'User logged out!'
        }
    )


@allowed_http_methods(['POST'])
def signin_view(req):
    response = HttpResponse()

    # Load Data
    try:
        _required_fields = ['email', 'username', 'password', 'confirm_password']
        _data = req.body
        obj_data = json.loads(_data)

        for _field in _required_fields:
            if (_field not in obj_data.keys()) or not obj_data.get(_field):
                raise ValueError(f"Required Fields: {','.join(str(x) for x in _required_fields)}")
        
    except:
        return make_response(
            response, 
            {
                'statusCode': 400,
                'message': f"Please provide all fields specifeid fields in json object: {','.join(str(x) for x in _required_fields)}",
            },
            400
        )
    
    # Validate data
    try:
        _email = validate_email(obj_data['email'])
        if CustomUserModel.objects.filter(pk=obj_data['email']).count() > 0:
            raise ValueError('email already exists')

        _username_v = MaxLengthValidator(120)(obj_data['username'])

        if obj_data['password'] != obj_data['confirm_password']:
            raise ValueError('password do not match') 
         
    
    except:
        return make_response(
            response, 
            {
                'statusCode': 400,
                'message': 'Invalid data',
            }
        )
    
    # Save data
    user = CustomUserModel.objects.create_user(
        obj_data.get('email'),
        obj_data.get('username'),
        obj_data.get('password')
    )

    response_data = {
        'data': {
            'email': user.email,
            'username': user.username,
            'is_counsellor': user.is_counsellor,
            'setup': user.setup
        }
    }

    return make_response(
        response, 
        response_data
    )

def email_verification(req):

    uuid = req.GET.get('q')
    now = datetime.datetime.now()

    if not req.user.is_authenticated:
        return redirect(f"/login?next={reverse('email_verification')}&server=1")

    if not hasattr(req.user, 'emailverification') or not uuid:
        return redirect(f"/email/verification?msg=no email verification request found, please generate an email verification request first")

    # if already verified
    if (req.user.emailverification.verified):
        return redirect(f"/user/dashboard?toast=Your email is already verified&type=info")


    # if invalid uuid
    if req.user.emailverification.uuid.hex != uuid:
        return redirect(f"/user/dashboard?toast=invalid code&type=error")

    # if expired
    if now > req.user.emailverification.expiry_date:
        return redirect(f"/user/dashboard?toast=verification code expired, please regenerate the email verification code&type=error")


    # Verify now 
    req.user.emailverification.verified = True
    req.user.emailverification.save()

    return redirect(f"/user/dashboard?toast=successfully verified your email&type=success")

@allowed_http_methods(['POST'])
def setup_view(req):
    response = HttpResponse()

    # Load Data
    try:
        _data = req.body
        obj_data = json.loads(_data)
        image = obj_data.get('avatar')
        types = obj_data.get('types')
        image_uuid = uuid.UUID(image).hex + '.svg'

        if not (image and types):
            raise ValueError('image and types not provided')
        
    except Exception as e:
        print(e)
        return make_response(
            response, 
            {
                'statusCode': 400,
                'message': 'Please provide valid image uuid and types in json object'
            },
            400
        )
    
    user = req.user

    # fetch the image
    image_response = requests.get(urljoin(MULTIAVATAR_URL, image_uuid), params={
        'apikey': MULTIAVATAR_API_KEY
    })

    if image_response.status_code != 200:
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'Something went wrong try again'
            },
            400
        )

    file_path = os.path.join(settings.BASE_DIR, 'static', 'images', 'user', image_uuid)
    rel_file_path = os.path.join('static', 'images', 'user', image_uuid)
    with open(file_path, 'w+') as file:
        file.write(image_response.text)

    user.image = rel_file_path
    user.is_setup = True
    types_db = CounsellorType.objects.filter(pk__in=types)
    user.counsellortype_set.add(*types_db)
    user.save()

    return make_response(
        response, 
        {
            'updated': True,
            **get_me_serialized(user),
        },
    )


def resend_email(req):

    response = HttpResponse()

        
    if hasattr(req.user, 'emailverification'):
        req.user.emailverification.delete()

    email = EmailVerification(
        user=req.user,
        expiry_date=get_future_datetime(EMAIL_VERIFICATION_EXPIRY_VALIDITY)
    )
    email.save()

    html = render_to_string('email-verification-mail.html', {
            'username': req.user.username,
            'uuid': email.uuid.hex,
    })

    _email = settings.EMAIL_PROXY or req.user.email

    send_mail(
        [_email],
        'Verify Email',
        html,
        html
        )

    return make_response(
        response,
        {
            'created': True
        }
    )