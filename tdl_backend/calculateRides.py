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
import itertools
from itertools import chain, combinations

#rsvped_riders = RiderRSVP.objects.filter()

# Get this week's event

# Get riders who rsvped for this week's event

def get_address(rider):
    return rider.addressLine1 + (' ' if rider.addressLine2 else '' ) + rider.addressLine2 + ' ' + rider.city + ' ' + rider.zipcode + ' ' + rider.state

def get_single_car_ride(rsvped_riders, destination):
    print("Assume rides generated...")

def powerset(iterable):
    s = list(iterable)
    return chain.from_iterable(combinations(s,r) for r in range(1, len(s) + 1))

count = 0
'''
Lists all possible combinations of riders a driver can pick up, without hindering the number of cars needed to pick 
up the rest of the riders
    iterable: The set the combination is being picked out of
    setCount: Number of cars (sets) available
'''
def powerset2(iterable, setCount):
    if len(iterable) <= 4:
        print("This is the last remaining 4 or less riders: ")
        print(iterable)
        global count
        count += 1
        return
    for r in range(1, len(iterable) + 1):
        for subset in combinations(iterable,r):
            # Only get the sets that have 1-4 riders
            if len(subset) <=4:
                print(subset)
                print("This is what's remaining")
                print([x for x in iterable if x not in subset ])
                print("\n")

                powerset2([x for x in iterable if x not in subset ], 0)

def pickRiders(iterable):
    r = len(iterable)
    d = math.ceil(len(iterable) / 4)


    for set in powerset(iterable):
        print("duide")

def enumerateRides(iterable):
    r = len(iterable)
    d = math.ceil(len(iterable) / 4)
    for set in powerset2(iterable):
        if len(set) <=4 and math.ceil((r - len(set)) / 4) <= d-1:
            print(set)
            print("\n")

        

today = datetime.date.today()
nextFridayDate = today + datetime.timedelta( (4-today.weekday()) % 7)
thisEvent = Event.objects.get(date = nextFridayDate)
this_event_address = get_address(thisEvent)
rsvped_riders = RiderRSVP.objects.filter(eventID = thisEvent)

#Algorithm
if len(rsvped_riders) <= 4:
    get_single_car_ride()

cars_needed = math.ceil(len(rsvped_riders) / 4)

#for set in powerset(rsvped_riders):
 #   if len(set) <=4:
  #      print(set)

#enumerateRides(rsvped_riders)
powerset2(rsvped_riders[:10], cars_needed)

print(count)

#for subset in itertools.combinations(rsvped_riders, 4):
    #print(subset)
# Figure out different ways to group riders

# For each way to group riders, note down all ride trips

"""
r = # riders
d = ceil( r/ 4)
k is a viable trip size if k <=4 and (r - k) / 4 <= d-1 


"""



