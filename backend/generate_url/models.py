from django.db import models


# Create your models here.
class Url(models.Model):
    url = models.CharField(unique=True, max_length=500, null=False, blank=False)
    status = models.BooleanField(default=True, null=False, blank=False)
    short_url_pattern = models.CharField(
        unique=True, null=False, blank=False, max_length=200
    )
    creation_date = models.DateTimeField(auto_now=True, auto_created=True)
    modification_date = models.DateTimeField(auto_now=True, auto_created=True)


class CustomUrl(models.Model):
    url = models.ForeignKey(Url, on_delete=models.CASCADE)
    custom_pattern = models.TextField(max_length=100, null=False, blank=False)
    creation_date = models.DateTimeField(auto_now=True, auto_created=True)


# class Analytics(models.Model):
#     How to mangae this table since this is going to be getting very large
#     url - foreign key of Url
#     visit_time
