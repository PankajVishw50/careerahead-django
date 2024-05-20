from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required

from utils.http import make_response

# Create your views here.
@login_required
def test_1(req):
    """
    testing to see if login working fine
    """

    return HttpResponse('I"m test 1')

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
            'setup': req.user.setup
        }
    }

    return make_response(
        response, 
        response_data,
    )