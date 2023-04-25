from django.urls import path
from .views import api_list_salespeople, api_salespeople, api_list_customers, api_customer, api_list_sales, api_sale


urlpatterns = [
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path("salespeople/<int:pk>/", api_salespeople, name="api_salespeople"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:pk>/", api_sale, name="api_sale"),
]
