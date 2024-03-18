from django.shortcuts import render, redirect
from rest_framework.views import APIView
from generate_url.serializers import UrlSerializer, CustomUrlSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import generate_short_url_pattern
from rest_framework.decorators import api_view
from .models import Url, CustomUrl


# Create your views here.
class ShortURL(APIView):
    def get(self, request):
        return Response(
            {"message": "This is the GET method"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def post(self, request):
        data = request.data
        custom_data = data.copy()
        try:
            data["short_url_pattern"] = generate_short_url_pattern(data.get("url"))
            # If existing url then return that data
            existing_url = Url.objects.get(url=data["url"].replace("https://",'',1))
            serializer = UrlSerializer(existing_url)
        except:
            # Creating new short url if not already created
            serializer = UrlSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
        try:
            # This will be for custom patterns created by users
            if custom_data.get("short_url_pattern"):
                existing_url_id = existing_url.id
                custom_pattern = CustomUrl.objects.get(
                    custom_pattern=custom_data["short_url_pattern"]
                )
                custom_data = {
                    "url": existing_url_id,
                    "custom_pattern": custom_data["short_url_pattern"],
                }
                serializer = CustomUrlSerializer(data=custom_data)
                serializer.is_valid()
                resp_data = serializer.data
                resp_data["message"] = "Url pattern already present"
                return Response(
                    resp_data,
                    status=status.HTTP_200_OK,
                )
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            custom_data = {
                "url": existing_url_id,
                "custom_pattern": custom_data["short_url_pattern"],
            }
            serializer = CustomUrlSerializer(data=custom_data)
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
        return redirect("https://"+long_url)
    except:
        try:
            long_url = CustomUrl.objects.get(custom_pattern=short_url).url.url
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
    # return Response(status=302, headers={"Location": f"https://{long_url}"})
    return Response(status=200, data={"url": f"https://{long_url}"})
