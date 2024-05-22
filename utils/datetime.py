import datetime

def get_future_datetime(x, iso_format=False, now=datetime.datetime.now()):
    if not isinstance(x, int):
        return ValueError('x should be int')
    
    
    future_timedelta = datetime.timedelta(seconds=x)
    future = now + future_timedelta
    
    return future if not iso_format else future.isoformat()
