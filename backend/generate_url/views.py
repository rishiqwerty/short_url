from django.shortcuts import render
from rest_framework.views import APIView
from generate_url.serializers import UrlSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import generate_short_url_pattern
from rest_framework.decorators import api_view
from .models import Url


# Create your views here.
class ShortURL(APIView):
    def get(self, request):
        return Response({'message': 'This is the GET method'},status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request):
        data = request.data
        data["short_url_pattern"] = generate_short_url_pattern(data.get("url"))
        try:
            # If existing url then return that data
            existing_url = Url.objects.get(url=data["url"])
            serializer = UrlSerializer(existing_url)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            # Creating new short url if not already created
            serializer = UrlSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def redirect_to_website(request, short_url):
    """
    short_url: is the pattern passed through url
        which is used to redirect it to long url after checks
    This will redirect to the long url temporarily
    """
    try:
        url_info = Url.objects.get(short_url_pattern=short_url)
        long_url = url_info.url
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # return Response(status=302, headers={"Location": f"https://{long_url}"})
    return Response(status=200, data={"url": f"https://{long_url}"})
