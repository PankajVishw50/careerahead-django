from django.shortcuts import render, HttpResponse, redirect
from django.urls import reverse
import json
from django.contrib.auth import authenticate, login, logout
from django.core.validators import validate_email, MaxLengthValidator
from urllib.parse import urljoin
import datetime 

from utils.http import make_response
from accounts.models import CustomUserModel

# Create your views here.
def login_view(req):
    response = HttpResponse()

    # This function only accepts GET requests
    if (req.method != 'POST'):
        return make_response(
            response,
            {
                'statusCode': 405,
                'message': 'Method not allowed',
            },
            405,
        )

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

    # Preparing data to send
    response_data = {
        'data': {
            'email': user.email,
            'username': user.username,
            'is_counsellor': user.is_counsellor,
            'setup': user.setup,
            'email_meta': None,
        }
    }

    if hasattr(user, 'emailverification'):
        response_data['data']['email_meta'] = {
            'verified': user.emailverification.verified,
            'expiry_date': user.emailverification.expiry_date.isoformat(),
        }


    return make_response(
        response, 
        response_data,
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


def signin_view(req):
    response = HttpResponse()

    # This function only accepts GET requests
    if (req.method != 'POST'):
        return make_response(
            response,
            {
                'statusCode': 405,
                'message': 'Method not allowed',
            },
            405,
        )


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
        return redirect(f"/email/verification?msg=Your email is already verified")


    # if invalid uuid
    if req.user.emailverification.uuid.hex != uuid:
        return redirect(f"/email/verification?msg=invalid code")

    # if expired
    if now > req.user.emailverification.expiry_date:
        return redirect(f"/email/verification?msg=verification code expired, please regenerate the email verification code")


    # Verify now 
    req.user.emailverification.verified = True
    req.user.emailverification.save()

    return redirect(f"/email/verification?msg=successfully verified your email")

