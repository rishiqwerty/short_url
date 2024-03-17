from rest_framework import serializers
from .models import Url, CustomUrl

class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = '__all__'
    short_url_pattern = serializers.CharField(required=False)

class CustomUrlSerializer(serializers.ModelSerializer):
    # url = UrlSerializer()
    
    class Meta:
        model = CustomUrl
        fields = ['url', 'custom_pattern']
