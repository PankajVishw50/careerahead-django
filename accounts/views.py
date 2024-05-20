from django.shortcuts import render, HttpResponse
import json
from django.contrib.auth import authenticate, login

from utils.http import make_response

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
        return response

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
            'setup': user.setup
        }
    }

    return make_response(
        response, 
        response_data,
    )

