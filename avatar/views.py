from django.shortcuts import render, HttpResponse
import uuid
import requests
from urllib.parse import urljoin

from careerahead.configs import MULTIAVATAR_URL, MULTIAVATAR_API_KEY

# Create your views here.
def get_avatar(req, random):

    response = HttpResponse()

    try:
        random = (uuid.UUID(random).hex) + '.svg'
    except Exception as e:
        print(e)
        response.headers['failed-fetching'] = 'uuid error'
        response.write('invalid uuid')
        return response
    
    # Get the data 
    url = urljoin(MULTIAVATAR_URL, random)
    http_response = requests.get(url, params={
        'apikey': MULTIAVATAR_API_KEY
    })

    print(http_response.url)

    if not http_response.status_code == 200:
        print(http_response.text)
        response.headers['failed-fetching'] = 'failed to fetch svg'
        return HttpResponse('failed to fetch image')
    

    response.headers['content-type'] = 'image/svg+xml'
    response.headers['Content-Disposition'] = 'inline; filename=me.svg'
    response.headers['returned_image'] = 'yes'
    response.write(http_response.text)

    return response