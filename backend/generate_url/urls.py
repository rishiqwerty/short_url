from django.urls import path
from .views import ShortURL, redirect_to_website

urlpatterns = [
    path('short-url/', ShortURL.as_view()),
    path('redirect/<str:short_url>',redirect_to_website),
]