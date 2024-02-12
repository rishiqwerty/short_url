from django.db import models


# Create your models here.
class Url(models.Model):
    url = models.CharField(unique=True)
    status = models.BooleanField(default=True, null=True, blank=True)
    short_url_pattern = models.CharField(unique=True)
    creation_date = models.DateTimeField(auto_now=True, auto_created=True)
    modification_date = models.DateTimeField(auto_now=True, auto_created=True)

# class Analytics(models.Model):
#     How to mangae this table since this is going to be getting very large
#     url - foreign key of Url
#     visit_time