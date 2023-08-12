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

"""
Lists the number of riders each car should have to cover all riders.
Returns: A list of possible combinations of number of riders each car should have. Each combination is represented 
         as a tuple. 
"""
def calc_car_seats_required(rider_count, car_count):
    # Base Cases
    if rider_count <=4 : 
        return [(1)]
    elif rider_count == 5:
        return [(1,4), (2,3)]
    elif rider_count == 6:
        return [(2,4), (3,3)]
    elif rider_count == 7:
        return [(3,4)]
    elif rider_count == 8:
        return [(4,4)]
    else:
        full_list = []
        for i in range(1,5):
            if math.ceil((rider_count - i)/4) <= car_count - 1:
                # i is in tuple, 
                sub_list = calc_car_seats_required((rider_count - i), car_count - 1) # Remember, this returns a list of tuples, append i to each of the tuples
                for t in sub_list:
                    l = list(t)
                    l.insert(0, i)
                    l.sort()
                    tup = tuple(l)
                    full_list.append(tup)
        
        res = list(set(full_list))
        return res
    

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
#powerset2(rsvped_riders[:10], cars_needed)


def list_all_rides(rsvped_riders):
    """
    List all the possible ride arrangements

    :param rsvped_riders: Stores information about riders who rsvped for the event
    :return: TODO
    """
    car_seats_combinations = calc_car_seats_required(len(rsvped_riders), math.ceil(len(rsvped_riders)/4))
    print(car_seats_combinations)
    for t in car_seats_combinations: # Think of t as (2,4,4)
        list_all_rides_helper(rsvped_riders, t, 0, [])


def list_all_rides_helper2(rider_list, tup, counter, ride):
    for subset in combinations(rider_list, tup[counter]):
        print(subset)

c = 0

def list_all_rides_helper(rider_list, tup, counter, ride):
    global c
    if counter == len(tup):
        print(ride)
        c = c+1
        print("\n\n\n")
        return # When this returns it doesn't end the function in the call Stack I believe
    for subset in combinations(rider_list, tup[counter]):
        remaining_riders = [x for x in rider_list if x not in subset ]
        new_ride = ride.copy() # Create a copy of the current, possible incomplete ride
        new_ride.append(subset)
        list_all_rides_helper(remaining_riders, tup, counter + 1, new_ride )

'''
for t in car_seats_combination: # For each enumeration of combinations
    for seat_count in t[0:1]: # For each number in the enumeration
        comb = (combinations(rsvped_riders, seat_count))
        for subsets in comb:
            print(subsets)

'''    
list_all_rides(rsvped_riders[:10])
print(c)


#for subset in itertools.combinations(rsvped_riders, 4):
    #print(subset)
# Figure out different ways to group riders

# For each way to group riders, note down all ride trips

"""
r = # riders
d = ceil( r/ 4)
k is a viable trip size if k <=4 and (r - k) / 4 <= d-1 


"""



