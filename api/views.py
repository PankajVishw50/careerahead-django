from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required
from django.conf import settings
import os

from utils.http import make_response  
from utils.user import get_me_serialized  
from utils.decorators import allowed_http_methods

# Create your views here.
@allowed_http_methods(['POST'])
@login_required
def test_1(req):
    """
    testing to see if login working fine
    """

    file_path = os.path.join(settings.MEDIA_PATH, 'file-01.jpg')

    # with open(file_path, 'wb+') as file:
    #     for chunks in req.FILES.get('some_image').chunks():
    #         print('again running')
    #         print(chunks)
    #         file.write(chunks)


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
    


    return make_response(
        response, 
        get_me_serialized(req.user),
    )