from django.urls import path

from .api_views import (
    api_list_upcoming_service_appointments,
    api_list_all_service_appointments,
    api_finish_service_appointment,
    api_cancel_service_appointment,
    api_list_service_appointments_by_vin,
    api_add_tech,
)



urlpatterns = [
    path("services/upcoming/", api_list_upcoming_service_appointments, name="api_list_upcoming_services"),
    path("services/all/", api_list_all_service_appointments, name="api_list_all_services"),
    path("services/<int:id>/finish/", api_finish_service_appointment, name="api_finish_service_appointment"),
    path("services/<int:id>/cancel/", api_cancel_service_appointment, name="api_cancel_service_appointment"),
    path("services/<str:vin>/", api_list_service_appointments_by_vin, name="api_list_service_appointments_by_vin"),
    path("services/tech/list/", api_add_tech, name="api_add_tech"),
]
