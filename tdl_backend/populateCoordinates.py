import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tdl_backend.settings")

import django
django.setup()

from tdl_backend.models import Rider
from tdl_backend.models import RiderToRiderTravelDistance

import requests, json

api_key = 'AIzaSyAk4Bfap0nzIjFV_M8kLqF9KP3r6Y1AanM'

riders = Rider.objects.all()
first_rider = Rider.objects.get(riderID=1)
second_rider = Rider.objects.get(riderID = 2)
print ("Printing this from python script")

for rider in riders:
    print(rider)

# Get list of all riders 
all_riders = Rider.objects.all()

url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'

https://routes.googleapis.com/directions/v2:computeRoutes?key=YOUR_API_KEY


trip = RiderToRiderTravelDistance()
trip.fromRider = first_rider
trip.toRider = second_rider
trip.drivingDistance = 0.1
trip.drivingTime = 1
trip.save()

43.069144313928476
-89.39067961933209