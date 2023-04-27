from django.db import models


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True)
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField(unique=True)


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    auto_owner = models.CharField(max_length=100)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="service_appointments",
        on_delete=models.PROTECT
    )
    service_reason = models.TextField()

    status = models.CharField(max_length=100, default="SCHEDULED")

    def __str__(self):
        return f"{self.technician} - {self.appointment_date} {self.appointment_time}"

    def finish(self):
        self.status = "FINISHED"
        self.save()

    def cancel(self):
        self.status = "CANCELED"
        self.save()

    class Meta():
        ordering = ("appointment_date", "appointment_time", "technician")
