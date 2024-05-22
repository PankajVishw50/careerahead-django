from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required
from django.conf import settings
import os

from utils.http import make_response    

# Create your views here.
@login_required
def test_1(req):
    """
    testing to see if login working fine
    """

    file_path = os.path.join(settings.MEDIA_PATH, 'file-01.jpg')

    with open(file_path, 'wb+') as file:
        for chunks in req.FILES.get('some_image').chunks():
            print('again running')
            print(chunks)
            file.write(chunks)


    return HttpResponse('Saved')

def get_me(req):
    """
    gets info of user
    also would be used to know if session is still valid and user 
    is logged in 
    """
    
    response = HttpResponse()

    if not req.user.is_authenticated:
        return make_response(
            response,
            {
                'statusCode': 401,
                'message': 'Authentication failed',
            },
            401
        )
    
    response_data = {
        'data': {
            'email': req.user.email,
            'username': req.user.username,
            'is_counsellor': req.user.is_counsellor,
            'setup': req.user.setup,
            'email_meta': None
        }
    }

    if hasattr(req.user, 'emailverification'):
        response_data['data']['email_meta'] = {
            'verified': req.user.emailverification.verified,
            'expiry_date': req.user.emailverification.expiry_date.isoformat(),
        }


    return make_response(
        response, 
        response_data,
    )