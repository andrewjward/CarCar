from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from encoders import AutomobileVOEncoder, SalesPersonEncoder, CustomerEncoder, SaleEncoder
from .models import SalesPerson, Customer, SaleModel, AutomobileVO
# Create your views here.

#####################################
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        people = SalesPerson.objects.all()
        return JsonResponse(
            {"people": people},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create SalesPerson"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_salespeople(request, pk):

    if request.method == "GET":
        try:
            hat = HatModel.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatsEncoder,
                safe=False
            )
        except HatModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            location = HatModel.objects.get(id=pk)
            location.delete()
            return JsonResponse(
                location,
                encoder=HatsEncoder,
                safe=False,
            )
        except HatModel.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            location = HatModel.objects.get(id=pk)

            props = ["fabric", "style_name", "color", "url", "location"]
            for prop in props:
                if prop in content:
                    setattr(location, prop, content[prop])
            location.save()
            return JsonResponse(
                location,
                encoder=HatsEncoder,
                safe=False,
            )
        except HatModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

#####################################
@require_http_methods(["GET", "POST"])
def api_list_customers(request, location_vo_id=None):

    if request.method == "GET":
        if location_vo_id is not None:
            hats = HatModel.objects.filter(location=location_vo_id)
        else:
            hats = HatModel.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatsEncoder,
        )
    else:
        content = json.loads(request.body)

        # Get the Location object and put it in the content dict
        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        hat = HatModel.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, pk):

    if request.method == "GET":
        try:
            hat = HatModel.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatsEncoder,
                safe=False
            )
        except HatModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            location = HatModel.objects.get(id=pk)
            location.delete()
            return JsonResponse(
                location,
                encoder=HatsEncoder,
                safe=False,
            )
        except HatModel.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            location = HatModel.objects.get(id=pk)

            props = ["fabric", "style_name", "color", "url", "location"]
            for prop in props:
                if prop in content:
                    setattr(location, prop, content[prop])
            location.save()
            return JsonResponse(
                location,
                encoder=HatsEncoder,
                safe=False,
            )
        except HatModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
#####################################
@require_http_methods(["GET", "POST"])
def api_list_sales(request, location_vo_id=None):

    if request.method == "GET":
        if location_vo_id is not None:
            hats = HatModel.objects.filter(location=location_vo_id)
        else:
            hats = HatModel.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatsEncoder,
        )
    else:
        content = json.loads(request.body)

        # Get the Location object and put it in the content dict
        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        hat = HatModel.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_sale(request, pk):

    if request.method == "GET":
        try:
            hat = HatModel.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatsEncoder,
                safe=False
            )
        except HatModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            location = HatModel.objects.get(id=pk)
            location.delete()
            return JsonResponse(
                location,
                encoder=HatsEncoder,
                safe=False,
            )
        except HatModel.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            location = HatModel.objects.get(id=pk)

            props = ["fabric", "style_name", "color", "url", "location"]
            for prop in props:
                if prop in content:
                    setattr(location, prop, content[prop])
            location.save()
            return JsonResponse(
                location,
                encoder=HatsEncoder,
                safe=False,
            )
        except HatModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
