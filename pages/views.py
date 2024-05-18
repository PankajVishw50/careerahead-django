from django.shortcuts import render

# Create your views here.

def react_app(req):
    return render(req, 'index.html')
