from django.contrib import admin

from .models import SaleModel, AutomobileVO


@admin.register(SaleModel)
class SaleModelAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass
