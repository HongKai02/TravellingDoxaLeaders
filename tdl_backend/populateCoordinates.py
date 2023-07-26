import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tdl_backend.settings")

import django
django.setup()
from tdl_backend.models import Rider
from tdl_backend.models import RiderToRiderTravelDistance
from tdl_backend.models import Event
import requests, json
from itertools import chain






# Get list of all riders
all_riders = Rider.objects.all()
first_rider = Rider.objects.get(riderID=1)
second_rider = Rider.objects.get(riderID=2)

# Get event details
event = Event.objects.get(eventID = 2) # This should be changed to get this Friday's 
print(event.addressLine1, event.addressLine2, event.city, event.zipcode, event.state)

all_riders = all_riders[: 3] # This statement is only for development purposes (to reduce api calls)


for i in range(len(all_riders)):
    source = all_riders[i]
    dest = list(chain(all_riders[ : i], all_riders[i+1 : ]))
    #print("##################" + str(source) + "(Source) ##################")
    #for j in range(len(dest)):
        #print(dest[j])
    formatted_dest = ''
    for j in range(len(dest)):
        formatted_dest = formatted_dest + '|' + dest[j].addressLine1 + ' ' + dest[j].addressLine2 + ' ' + dest[j].city + ' ' + dest[j].zipcode + ' ' + dest[j].state
    print(formatted_dest)

    


    



# API call to Google Distance Matrix API
api_key = "AIzaSyAk4Bfap0nzIjFV_M8kLqF9KP3r6Y1AanM"
url = "https://maps.googleapis.com/maps/api/distancematrix/json?"

source = "409 W Johnson St, Madison Wisconsin"

dest = "7012 Companion Lane, Middleton Wisconsin"

'''
r = requests.get(
    url + "origins=" + source + "&destinations=" + dest + "&key=" + api_key
)

x = r.json()

print(x)

with open("travelDistance.txt", "w") as f:
    f.write(str(x))
'''


trip = RiderToRiderTravelDistance()
trip.fromRider = first_rider
trip.toRider = second_rider
trip.drivingDistance = 0.1
trip.drivingTime = 1
trip.save()

