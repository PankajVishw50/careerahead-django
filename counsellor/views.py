from django.shortcuts import render, HttpResponse
from .models import CounsellorType, Counsellor, Question, Appointment, Review
import json
from django.template.loader import render_to_string
from django.contrib.auth.decorators import login_required

from utils.http import make_response
from utils.helpers import get_page_range
from utils.user import get_me_serialized, get_serialized_model
from utils.decorators import allowed_http_methods
from utils.serializers import json_serializer
from utils.http import get_json_from_request
from utils.email import send_mail
from utils.datetime import get_datetime_from_str, get_past_datetime

# Create your views here.
def get_counsellor_types(req):
    response = HttpResponse()

    types = CounsellorType.objects.all()

    response_data = {
        'total': types.count(),
        'data': [],
    }

    for _type in types:
        response_data['data'].append({
            **get_serialized_model(_type, ['type'])['fields']
        })
    
    return make_response(
        response, 
        response_data
    )


def get_counsellors(req):
    response = HttpResponse()

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
        page = obj_data.get('page') if obj_data.get('page') * 1 else 1
        size = obj_data.get('size') if obj_data.get('size') * 1 else 10

        if (not obj_data.get('filter')):
            obj_data['filter'] = {}
        

        
    except:
        return make_response(
            response, 
            {
                'statusCode': 400,
                'message': 'Please provide filter, page and size in json object'
            },
            400
        )
    

    counsellors = Counsellor.objects.all()
    print(counsellors.count())

    # Filter by gender if any 
    if (obj_data.get('filter') and obj_data['filter'].get('gender')):
        counsellors = counsellors.filter(user__gender=obj_data['filter'].get('gender'))
    
    # Filter by name if any
    if (obj_data.get('filter') and obj_data['filter'].get('counsellorName')):
        counsellors = counsellors.filter(user__username__istartswith=obj_data['filter'].get('counsellorName'))

    # Filter by price if any 
    if (obj_data.get('filter') and obj_data['filter'].get('priceUpto')):
        counsellors = counsellors.filter(expected_fee__lte=obj_data['filter'].get('priceUpto'))

    # Filter by category
    if (obj_data.get('filter') and obj_data['filter'].get('categories') and len(obj_data['filter'].get('categories')) > 0):
        counsellors = counsellors.filter(counsellortype__type__in=obj_data['filter'].get('categories'))


    print(counsellors.count())
    page_range = get_page_range(page, size)
    counsellors = counsellors[page_range[0]:page_range[1]+1]

    response_data = {
        'total': counsellors.count(),
        'page': page,
        'size': size,
        'next': counsellors.count() > size,
        'data': [],
    }
    for index, counsellor in enumerate(counsellors):
        if (counsellors.count() > size and index >= (counsellors.count()-1)):
            continue

        _data = {
            'username': counsellor.user.username,
            'image': counsellor.user.image,
            'description': counsellor.introduction_section,
            'fee': counsellor.expected_fee,
            'total_clients': 5,
            'email': counsellor.user.email,
            'id': counsellor.pk,
            'type': []
        }

        for _type in counsellor.counsellortype_set.all():
            _data['type'].append({
                'type': _type.type,
            })

        response_data['data'].append(_data)

    return make_response(
        response, 
        response_data
    )


@allowed_http_methods(['GET'])
def get_counsellor(req, id):
    response = HttpResponse()

    try:
        counsellor = Counsellor.objects.get(user=id)
    except:
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'invalid data'
            }
        )
    

    counsellor_obj = get_serialized_model(counsellor)
    user_obj = get_serialized_model(counsellor.user, [
        'email', 'username',
        'image', 'gender',
    ])
    
    response_data = {
        'data': {
            'id': counsellor_obj['pk'],
            **user_obj['fields'],
            **counsellor_obj['fields'],
        }
    }


    return make_response(
        response,
        response_data
    )



@allowed_http_methods(['POST'])
def get_reviews(req, id):

    response = HttpResponse()
    data = get_json_from_request(req) or {}

    page = data.get('page') or 1
    size = data.get('size') or 10

    try:
        counsellor = Counsellor.objects.get(pk=id)
    except:
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'Invalid data'
            },
            400
        )
    
    range = get_page_range(page, size)

    reviews = counsellor.review_set.all().order_by('-posting_time')[range[0]: range[1]+1]

    response_data = {
        'next': reviews.count() > size,
        'data': []
    }

    for index, review in enumerate(reviews):
        if ((index+1) == len(reviews) and len(reviews) > size):
            continue

        response_data['data'].append({
            **get_serialized_model(review)['fields'],
            'user': {
                **get_serialized_model(review.user, ['image', 'username'])['fields'],
            }
        })

    return make_response(
        response,
        response_data   
    )


@allowed_http_methods(['POST'])
def get_questions(req, id):

    response = HttpResponse()
    data = get_json_from_request(req) or {}
    
    page = data.get('page') or 1
    size = data.get('size') or 10

    try:
        counsellor = Counsellor.objects.get(pk=id)
    except:
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'Invalid data'
            },
            400
        )
    
    range = get_page_range(page, size)

    questions = (counsellor.question_set.filter(answer_time__isnull=False)
                 .order_by('-answer_time')[range[0]: range[1] + 1])
    response_data = {
        'next': questions.count() > size,
        'data': []
    }

    for index, question in enumerate(questions):
        if ((index+1) >= questions.count() and questions.count() > size):
            continue

        response_data['data'].append({
            **get_serialized_model(question)['fields'],
            'user': {
                **get_serialized_model(question.user, ['username', 'image'])['fields']
            }
        })

    return make_response(
        response,
        response_data
    )


@allowed_http_methods(['POST'])
@login_required
def request_contact(req, id):

    response = HttpResponse()
    data = get_json_from_request(req)

    try:
        counsellor = Counsellor.objects.get(pk=id)
    except:
        return make_response(
            response,
            {
                'statusCode': 404,
                'message': 'Counsellor not found'
            },
            404
        )
    
    try:
        appointment = Appointment(
            user=req.user,
            counsellor=counsellor,
            note=data.get('note'),
            preffered_date_from=get_datetime_from_str(data.get('fromDate')),
            preffered_date_to=get_datetime_from_str(data.get('toDate')),
            preffered_time_from=get_datetime_from_str(data.get('fromTime'), '%H:%M'),
            preffered_time_to=get_datetime_from_str(data.get('toTime'), '%H:%M'),
        )

        context = {
            **get_serialized_model(appointment)['fields'],
            'user': {
                **get_serialized_model(appointment.user)['fields']
            },
            'counsellor': {
                **get_serialized_model(appointment.counsellor)['fields'],
            }
        }

        # Send mail 
        send_mail(
            [counsellor.user.email],
            'Contact Request', 
            'Nothing',
            render_to_string(
                'mail.html', {
                    'data': context,
                },
                req,
                None,
            )
        )   

        send_mail(
            [req.user.email],
            'Contact Request', 
            'Nothing',
            render_to_string(
                'contact-request-user.html', {
                    'data': context,
                },
                req,
                None,
            )
        )   



        appointment.save()
    except Exception as e:
        print(e)
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'invalid data'
            },
            400
        )
    
    return make_response(
        response,
        {
            'created': True
        }
    )

@allowed_http_methods(['POST'])
def ask_question(req, id):

    # check if counsellor is is valid -> Done
    # check if user have any other question in last 3 days. -> Done
    # check if there is question and the max length is 255

    response = HttpResponse()
    data = get_json_from_request(req)

    if (not data or not data.get('question')):
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'Please provide an valid json'
            },
            400
        )
    
    if len(data.get('question')) > 255:
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'Question\'s length should not exceed 255 chars'
            },
            400
        )
    
    try:
        counsellor = Counsellor.objects.get(pk=id)
    except:
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'Invalid counsellor',
            },
            400
        )

    if (
        req.user.question_set.filter(counsellor=counsellor)
        .filter(posting_time__gte=get_past_datetime(60*60*24*3)).count() > 0
    ):
        return make_response(
            response, 
            {
                'statusCode': 400,
                'message': 'You can not ask new question within 3 days of previous question to same counsellor'
            },
            400
        )

    
    # Create Question
    question = Question.objects.create(
        question=data.get('question'),
        counsellor=counsellor,
        user=req.user,
    )

    return make_response(
        response,
        {
            'created': True,
        }
    )

@allowed_http_methods(["POST"])
def post_review(req, id):

    # check if json data is provided with valid values
    # check if counsellor id is valid
    # check if user and counsellor not same
    # check is there is no another review already there 

    response = HttpResponse()
    data = get_json_from_request(req)

    print(data)

    if (
        not data or 
        not data.get('rating') or data.get('rating') < 1 or data.get('rating') > 5 or
        not data.get('comment') or len(data.get('comment')) < 20 or len(data.get('comment')) > 1024
    ):
        return make_response(
            response, 
            {
                'statusCode': 400,
                'message': 'Provide valid json data',
            },
            400
        )
    

    try:
        counsellor = Counsellor.objects.get(pk=id)
    except:
        return make_response(
            response, 
            {
                'statusCode': '400',
                'message': 'Invalid counsellor'
            },
            400
        )

    if req.user == counsellor:
        return make_response(
            response, 
            {
                'statusCode': '400',
                'message': 'Counsellor and user both can\' be same',
            },
            400
        )
    

    if req.user.review_set.filter(counsellor=counsellor).count() > 0:
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'You have already posted an review on this counsellor'
            },
            400
        )
    
    review = Review.objects.create(
        comment=data.get('comment'),
        rating=data.get('rating'),
        user=req.user,
        counsellor=counsellor,
    )

    return make_response(
        response,
        {
            'created': True,
        }
    )