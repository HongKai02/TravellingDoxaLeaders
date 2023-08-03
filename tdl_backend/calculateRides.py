import math
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tdl_backend.settings")

import datetime
import django
django.setup()
from tdl_backend.models import Rider
from tdl_backend.models import RiderToRiderTravelDistance
from tdl_backend.models import Event
from tdl_backend.models import RiderRSVP

#rsvped_riders = RiderRSVP.objects.filter()

# Get this week's event

# Get riders who rsvped for this week's event

def get_address(rider):
    return rider.addressLine1 + (' ' if rider.addressLine2 else '' ) + rider.addressLine2 + ' ' + rider.city + ' ' + rider.zipcode + ' ' + rider.state

def get_single_car_ride(rsvped_riders, destination):
    print("Assume rides generated...")

today = datetime.date.today()
nextFridayDate = today + datetime.timedelta( (4-today.weekday()) % 7)
thisEvent = Event.objects.get(date = nextFridayDate)
this_event_address = get_address(thisEvent)
rsvped_riders = RiderRSVP.objects.filter(eventID = thisEvent)
print(rsvped_riders)
print(this_event_address)

#Algorithm
print(len(rsvped_riders))
if len(rsvped_riders) <= 4:
    get_single_car_ride()

cars_needed = math.ceil(len(rsvped_riders) / 4)
print(cars_needed)
# Figure out different ways to group riders

# For each way to group riders, note down all ride trips



