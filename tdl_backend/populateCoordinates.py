import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tdl_backend.settings")

import django
django.setup()
from tdl_backend.models import Rider
from tdl_backend.models import RiderToRiderTravelDistance
from tdl_backend.models import Event
import requests, json
from itertools import chain



def get_address(rider):
    return rider.addressLine1 + (' ' if rider.addressLine2 else '' ) + rider.addressLine2 + ' ' + rider.city + ' ' + rider.zipcode + ' ' + rider.state


# Get list of all riders
all_riders = Rider.objects.all()
first_rider = Rider.objects.get(riderID=1)
second_rider = Rider.objects.get(riderID=2)

# Get event details
event = Event.objects.get(eventID = 2) # This should be changed to get this Friday's 
event_address = get_address(event)

all_riders = all_riders[: 3] # This statement is only for development purposes (to reduce api calls)

# API details to Google Distance Matrix API
#api_key = "AIzaSyAk4Bfap0nzIjFV_M8kLqF9KP3r6Y1AanM"
url = "https://maps.googleapis.com/maps/api/distancematrix/json?"

for i in range(len(all_riders)):
    source = all_riders[i]
    dest = list(chain(all_riders[ : i], all_riders[i+1 : ]))

    formatted_dest = ''
    for j in range(len(dest)):
        formatted_dest = formatted_dest + '|' + get_address(dest[j])
    formatted_dest = formatted_dest[1: ] + '|' + event_address
    print(event_address)
    print(formatted_dest)
    print('\n')
    #r = requests.get(
     #   url + "origins=" + get_address(source) + "&destinations=" + formatted_dest + "&key=" + api_key
    #)

    x = None
    filepath = "jsonPlayGround/file" + str(i) + ".json"
    with open(filepath, 'r') as f:
        x = json.load(f)

    #x = r.json()
    print(x)
    with open("travelDistance3.json", "a") as f:
        f.write(str(x))
    

'''
trip = RiderToRiderTravelDistance()
trip.fromRider = first_rider
trip.toRider = second_rider
trip.drivingDistance = 0.1
trip.drivingTime = 1
trip.save()
'''


