from django.shortcuts import render
import base64

# Create your views here.
def generate_base64_url(url):
    # Convert the URL to bytes
    url_bytes = url.encode('utf-8')

    # Base64 encode the URL bytes
    base64_encoded = base64.urlsafe_b64encode(url_bytes)

    # Decode the bytes to a UTF-8 string
    base64_string = base64_encoded.decode('utf-8')

    return base64_string
