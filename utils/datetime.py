import datetime

def get_future_datetime(x, iso_format=False, now=datetime.datetime.now()):
    if not isinstance(x, int):
        return ValueError('x should be int')
    
    
    future_timedelta = datetime.timedelta(seconds=x)
    future = now + future_timedelta
    
    return future if not iso_format else future.isoformat()

def get_datetime_from_str(date_str, format='%Y-%m-%d'):
    try:
        date = datetime.datetime.strptime(date_str, format)

        return date
    except: 
        pass

    return False