from django.core import serializers


json_serializer = serializers.get_serializer('json')()
