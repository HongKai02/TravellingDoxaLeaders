# Generated by Django 4.2.2 on 2023-06-27 02:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tdl_backend', '0002_event'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Drivers',
            new_name='Driver',
        ),
        migrations.RenameModel(
            old_name='Riders',
            new_name='Rider',
        ),
    ]
