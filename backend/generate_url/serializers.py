from rest_framework import serializers
from .models import Url

class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = '__all__'
    short_url_pattern = serializers.CharField(required=False)

    def validate(self, data):
        """
        Custom validation for fields not explicitly declared in the serializer.
        """
        # Access the value of the 'long_url' (removing https:// if present)
        url = data.get('url', None)

        # Example: Check if 'another_field' meets specific criteria
        if url is not None and url.startswith('https://'):
            data["url"] = url.replace("https://",'',1)

        return data
