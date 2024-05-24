
from django.shortcuts import HttpResponse

from utils.http import make_response


def allowed_http_methods(methods: list = []):

    def decorator(func):
        def inner_decorator(request, *args, **kwargs):

            if request.method not in methods:
                return make_response(
                    HttpResponse(),
                    {
                        'statusCode': 405,
                        'message': f"Method not allowed: {request.method}"
                    },
                    405
                )                

            return func(request, *args, **kwargs)
        
        return inner_decorator
    
    return decorator