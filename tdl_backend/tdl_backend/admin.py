# This file describes the admin site that has crud access to the databse
from django.contrib import admin
from tdl_backend.models import Rider 

admin.site.register(Rider)