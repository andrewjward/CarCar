# Generated by Django 4.0.3 on 2023-04-26 19:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salemodel',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='customers', to='sales_rest.customer'),
        ),
        migrations.AlterField(
            model_name='salemodel',
            name='sales_person',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.salesperson'),
        ),
    ]
