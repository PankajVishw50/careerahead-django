from typing import Optional
import json

def make_response(
        response: object, 
        content: Optional[str] = None,
        status_code: Optional[int] = 200,
        content_type: Optional[str] = 'application/json',
        serialize_json: Optional[bool] = True,
):
    '''
    Returns an HTTP reponse setted up with provided args
    '''

    if content and serialize_json:
        content = json.dumps(content)

    response.status_code = status_code if status_code else None
    response.headers['content-type'] = content_type if content_type else None
    response.write(content) if content else None

    return response


def get_json_from_request(req):

    try:
        data = json.loads(req.body)
    except:
        return False 
    
    return data