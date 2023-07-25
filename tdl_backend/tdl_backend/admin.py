# This file describes the admin site that has crud access to the databse
from django.contrib import admin
from tdl_backend.models import Rider 
from tdl_backend.models import RiderRSVP
from tdl_backend.models import Event
from tdl_backend.models import Driver
from tdl_backend.models import RiderToRiderTravelDistance

admin.site.register(Rider)

admin.site.register(RiderRSVP)

admin.site.register(Event)

admin.site.register(Driver)

admin.site.register(RiderToRiderTravelDistance)