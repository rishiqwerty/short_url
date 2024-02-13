from rest_framework import serializers
from .models import Url

class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = '__all__'
    short_url_pattern = serializers.CharField(required=False)

        