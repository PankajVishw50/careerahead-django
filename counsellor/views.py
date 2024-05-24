from django.shortcuts import render, HttpResponse
from .models import CounsellorType, Counsellor
from utils.http import make_response
import json
from utils.helpers import get_page_range
from utils.user import get_me_serialized

# Create your views here.
def get_counsellor_types(req):
    response = HttpResponse()

    types = CounsellorType.objects.all()

    response_data = {
        'total': types.count(),
        'data': []
    }

    for _type in types:
        response_data['data'].append({
            'id': _type.pk,
            'type': _type.type,
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
        counsellors = counsellors.filter(fee__lte=obj_data['filter'].get('priceUpto'))

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

        response_data['data'].append({
            'username': counsellor.user.username,
            'image': counsellor.user.image,
            'description': counsellor.description,
            'fee': counsellor.fee,
            'total_clients': counsellor.sessions.count(),
            'email': counsellor.user.email,
            'id': counsellor.pk
        })

    return make_response(
        response, 
        response_data
    )



def get_counsellor(req, id):
    response = HttpResponse()

    counsellor = Counsellor.objects.get(user=id)

    if not counsellor:
        return make_response(
            response,
            {
                'statusCode': 400,
                'message': 'invalid data'
            }
        )


    response_data = {
        'data': {
        'username': counsellor.user.username,
        'image': counsellor.user.image,
        'description': counsellor.description,
        'fee': counsellor.fee,
        'total_clients': counsellor.sessions.count()
        }
    }

    return make_response(
        response,
        response_data
    )