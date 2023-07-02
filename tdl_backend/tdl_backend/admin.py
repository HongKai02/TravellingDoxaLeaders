# This file describes the admin site that has crud access to the databse
from django.contrib import admin
from tdl_backend.models import Rider 
from tdl_backend.models import RiderRSVP
from tdl_backend.models import Event

admin.site.register(Rider)

admin.site.register(RiderRSVP)

admin.site.register(Event)