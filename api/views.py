from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required
from django.conf import settings
import os
from django.core.mail import EmailMessage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from django.template.loader import render_to_string

from utils.http import make_response  
from utils.user import get_me_serialized, get_serialized_model 
from utils.decorators import allowed_http_methods
from utils.email import send_mail
from counsellor.models import Appointment

# Create your views here.
# @allowed_http_methods(['POST'])
# @login_required
def test_1(req):
    """
    testing to see if login working fine
    """

    appointment = Appointment.objects.first()

    data = {
        **get_serialized_model(appointment)['fields'],
        'user': {
            **get_serialized_model(appointment.user)['fields'],
        },
        'counsellor': {
            **get_serialized_model(appointment.counsellor)['fields'],
        }
    }

    print(data['counsellor'].keys())

    # send_mail(
    #     ['rajuvishwakarma8607@gmail.com'],
    #     'Testing again',
    #     'Hi I am okay',
    #     render_to_string('mail.html', data, req, None)
    # )


    return render(req, 'email-verification-mail.html', {'username': req.user.username, 'uuid': req.user.emailverification.uuid})

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