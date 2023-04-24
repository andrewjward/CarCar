from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import AutomobileVOEncoder, SalesPersonEncoder, CustomerEncoder, SaleEncoder
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
                {"message": "Could not create Sales Employee"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_salespeople(request, pk):

    if request.method == "GET":
        try:
            person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                person,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            person = SalesPerson.objects.get(id=pk)
            person.delete()
            return JsonResponse(
                person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            location = SalesPerson.objects.get(id=pk)

            props = ["first_name", "last_name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(person, prop, content[prop])
            person.save()
            return JsonResponse(
                person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Sales Peron oes not exist"})
            response.status_code = 404
            return response

#####################################
@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create a new Customer"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, pk):

    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)

            props = ["first_name", "last_name", "address", "phone number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
#####################################
@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = SaleModel.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            auto = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = auto
        except AutomobileVO.DoesNotExist:
            response = JsonResponse(
                {"message": "Automobile doesn't exist"}
            )
            response.status_code = 400
            return response
        try:
            employee_id = content["employee_id"]
            sales_person = SalesPerson.objects.get(pk=employee_id)
            content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            response = JsonResponse(
                {"message": "Sales Person doesn't exist"}
            )
            response.status_code = 400
            return response

        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer Does not Exist"},
                status=400,
            )

        try:
            content = json.loads(request.body)
            sale = SaleModel.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create a new Sale"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_sale(request, pk):

    if request.method == "GET":
        try:
            sale = SaleModel.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except SaleModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = SaleModel.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except SaleModel.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            sale = SaleModel.objects.get(id=pk)

            props = ["automobile", "sales_person", "customer", "price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except SaleModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
