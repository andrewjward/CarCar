from django.db import models
from django.urls import reverse

# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

class SalesPerson(models.Model):

    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)


    class Meta:
        ordering = ("first_name", "last_name", "employee_id")

    def get_api_url(self):
        return reverse("api_show_salesperson")


class Customer(models.Model):

    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=12)


    class Meta:
        ordering = ("first_name", "last_name", "address", "phone_number")

    def get_api_url(self):
        return reverse("api_show_customer")


class SaleModel(models.Model):

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )

    sales_person = models.ForeignKey(
      SalesPerson,
      related_name="sales",
      on_delete=models.CASCADE,
    )

    customer = models.ForeignKey(
      Customer,
      related_name="customers",
      on_delete=models.CASCADE,
    )
    price= models.PositiveIntegerField()


    class Meta:
        ordering = ("automobile", "sales_person", "customer", "price")

    def get_api_url(self):
        return reverse("api_show_sale")
