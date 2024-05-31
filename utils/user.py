import json

from .serializers import json_serializer

def get_me_serialized(user):
    response_data = {
        'data': {
            'email': user.email,
            'username': user.username,
            'is_counsellor': user.is_counsellor,
            'is_setup': user.is_setup,
            'email_meta': None,
            'image': user.image,
            'pk': user.pk
        }
    }

    if hasattr(user, 'emailverification'):
        response_data['data']['email_meta'] = {
            'verified': user.emailverification.verified,
            'expiry_date': user.emailverification.expiry_date.isoformat(),
        }


    return response_data


def get_serialized_model(model, fields=None):

    model_serialized = json_serializer.serialize([model], fields=fields)
    model_json = json.loads(model_serialized)[0]
    model_json['fields']['pk'] = model_json['pk']

    return model_json

        