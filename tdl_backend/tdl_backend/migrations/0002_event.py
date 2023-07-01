# Generated by Django 4.2.2 on 2023-06-27 02:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tdl_backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('eventID', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('eventTitle', models.CharField(max_length=50)),
                ('addressLine1', models.CharField(max_length=80)),
                ('addressLine2', models.CharField(max_length=80)),
                ('city', models.CharField(max_length=20)),
                ('zipcode', models.CharField(max_length=15)),
                ('state', models.CharField(max_length=20)),
            ],
        ),
    ]
