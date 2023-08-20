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

def set_address_changed():
    pass


# Get list of all riders
all_riders = Rider.objects.all()

# Set all rider's addressChanged to false
for rider in all_riders:
    rider.addressChanged = True

Rider.objects.bulk_update(all_riders, ['addressChanged'])

# Get event details
event = Event.objects.get(eventID = 2) #TODO: This should be changed to get this Friday's 
event_address = get_address(event)

#all_riders = all_riders[:3] # This statement is only for development purposes (to reduce api calls)

# API details to Google Distance Matrix API
api_key = "AIzaSyAk4Bfap0nzIjFV_M8kLqF9KP3r6Y1AanM"
url = "https://maps.googleapis.com/maps/api/distancematrix/json?"

for i in range(len(all_riders)):
    source = all_riders[i]
    dest = list(chain(all_riders[ : i], all_riders[i+1 : ])) # Exclude source rider

    formatted_dest = ''
    for j in range(len(dest)):
        if source.addressChanged or dest[j].addressChanged:
            formatted_dest = formatted_dest + '|' + get_address(dest[j])

    #formatted_dest = formatted_dest[1: ] + '|' + event_address # Trim off first deliminator and add event address

    formatted_dest = formatted_dest[1: ]

    #print(formatted_dest)

    # API Call (Commented out for testing purposes)
    r = requests.get(
        url + "origins=" + get_address(source) + "&destinations=" + formatted_dest + "&key=" + api_key
    )

    r = r.json()

    #print(r)

    ##################################### Development code to reduce api calls ###############################
    '''
    x = {}
    filepath = "jsonPlayGround/file" + str(i) + ".json"
    with open(filepath, 'r') as f:
        x = json.load(f)
    '''
    ###########################################################################################################

    all_trip_info = r['rows'][0]['elements'] #TODO: Replace x with r
    #print(all_trip_info)

    print("From rider is")
    print(source)
    # Enter data into 'rider to rider travel distance' table
    for count, toRider in enumerate(dest):
        print(toRider)
        # Get driving distance and driving time
        drivingDistance = all_trip_info[count]['distance']['text']
        drivingTime = all_trip_info[count]['duration']['text']

        # Removing trailing strings
        print(drivingDistance)
        if drivingDistance[len(drivingDistance) -2: ] == "km":
            formatted_driving_distance = drivingDistance[: len(drivingDistance) - 3]
        
        else: formatted_driving_distance = drivingDistance[:len(drivingDistance)- 2]

        print(drivingTime)
        if drivingTime[len(drivingTime) - 4: ] == "mins":
            formatted_driving_time = drivingTime[:len(drivingTime) -5]

        else: formatted_driving_time = drivingTime[: len(drivingTime) - 4]

        # Preparing trip database entry
        trip = RiderToRiderTravelDistance()
        trip.fromRider = source
        trip.toRider = toRider
        trip.drivingTime = float(formatted_driving_time)
        trip.drivingDistance = float(formatted_driving_distance)

        trip.save()

# Set all rider's addressChanged to false
for rider in all_riders:
    rider.addressChanged = False

Rider.objects.bulk_update(all_riders, ['addressChanged'])



