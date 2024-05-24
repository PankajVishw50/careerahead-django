

def get_me_serialized(user):
    response_data = {
        'data': {
            'email': user.email,
            'username': user.username,
            'is_counsellor': user.is_counsellor,
            'setup': user.setup,
            'email_meta': None,
            'image': user.image
        }
    }

    if hasattr(user, 'emailverification'):
        response_data['data']['email_meta'] = {
            'verified': user.emailverification.verified,
            'expiry_date': user.emailverification.expiry_date.isoformat(),
        }


    return response_data
