import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO


def get_automobile_vin():
    url = "http://inventory-api:8000/api/automobiles/"
    response = requests.get(url)
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"],
            defaults={
                "vin": automobile["vin"],
            }
        )


def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_automobile_vin()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
