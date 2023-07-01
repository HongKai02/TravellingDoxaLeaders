# Generated by Django 4.2.2 on 2023-06-27 02:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Drivers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=30)),
                ('lastName', models.CharField(max_length=30)),
                ('phoneNumber', models.CharField(max_length=20)),
                ('addressLine1', models.CharField(max_length=100)),
                ('addressLine2', models.CharField(blank=True, max_length=100)),
                ('city', models.CharField(max_length=20)),
                ('zipcode', models.CharField(max_length=15)),
                ('state', models.CharField(max_length=20)),
                ('rideBuddy1', models.CharField(blank=True, max_length=30)),
                ('rideBuddy2', models.CharField(blank=True, max_length=30)),
                ('rideBuddy3', models.CharField(blank=True, max_length=30)),
                ('rideBuddy4', models.CharField(blank=True, max_length=30)),
                ('longitude', models.CharField(blank=True, max_length=20)),
                ('latitude', models.CharField(blank=True, max_length=20)),
                ('carCapacity', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Riders',
            fields=[
                ('riderID', models.AutoField(primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=30)),
                ('lastName', models.CharField(max_length=30)),
                ('phoneNumber', models.CharField(max_length=20)),
                ('addressLine1', models.CharField(max_length=100)),
                ('addressLine2', models.CharField(blank=True, max_length=100)),
                ('city', models.CharField(max_length=20)),
                ('zipcode', models.CharField(max_length=15)),
                ('state', models.CharField(max_length=20)),
                ('rideBuddy2', models.CharField(blank=True, max_length=30)),
                ('rideBuddy3', models.CharField(blank=True, max_length=30)),
                ('rideBuddy4', models.CharField(blank=True, max_length=30)),
                ('longitude', models.CharField(blank=True, max_length=20)),
                ('latitude', models.CharField(blank=True, max_length=20)),
                ('rideBuddy1', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tdl_backend.riders')),
            ],
        ),
    ]
