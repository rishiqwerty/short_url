from django.db import transaction
from celery import shared_task
from .models import Analytics


@transaction.atomic
@shared_task
def update_click_count(url_info):
    data = Analytics(url=url_info)
    data.save()


def update_some(url_info):
    update_click_count.delay(url_info)
