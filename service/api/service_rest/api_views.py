from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Technician, ServiceAppointment, AutomobileVO
import json
from django.http import JsonResponse
from .encoders import TechnicianEncoder, ServiceAppointmentEncoder


@require_http_methods(["GET", "POST"])
def api_add_tech(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )



@require_http_methods(["GET"])
def api_list_upcoming_service_appointments(request):
    if request.method == "GET":
        services = ServiceAppointment.objects.filter(status="SCHEDULED")
        return JsonResponse(
            {"services": services},
            encoder=ServiceAppointmentEncoder,
        )


@require_http_methods(["GET", "POST"])
def api_list_all_service_appointments(request):
    if request.method == "GET":
        services = ServiceAppointment.objects.all()
        return JsonResponse(
            services,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(employee_number=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "That technician employee number is not in our system."},
                status=400,
            )

        service_appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            service_appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False
        )


@require_http_methods(["GET"])
def api_list_service_appointments_by_vin(request, vin):
    if not AutomobileVO.objects.filter(vin=vin).exists():
        return JsonResponse({"message": "The provided VIN does not match any AutomobileVO in the system."}, status=404)

    services = ServiceAppointment.objects.filter(vin=vin)
    return JsonResponse(
        {"services": services},
        encoder=ServiceAppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_finish_service_appointment(request, id):
    service_appointment = ServiceAppointment.objects.get(id=id)
    service_appointment.finish()
    return JsonResponse(
        service_appointment,
        encoder=ServiceAppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_cancel_service_appointment(request, id):
    service_appointment = ServiceAppointment.objects.get(id=id)
    service_appointment.cancel()
    return JsonResponse(
        service_appointment,
        encoder=ServiceAppointmentEncoder,
        safe=False,
    )
