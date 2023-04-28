from common.json import ModelEncoder
from datetime import date, time
from .models import Technician, ServiceAppointment, AutomobileVO


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
        "id",
    ]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "status",
        "vin",
        "auto_owner",
        "appointment_date",
        "appointment_time",
        "technician",
        "service_reason",
        "id",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        count = AutomobileVO.objects.filter(vin=o.vin).count()
        return {"vip_treatment": count > 0}

    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()
        elif isinstance(obj, time):
            return obj.strftime('%H:%M:%S')
        return super().default(obj)
