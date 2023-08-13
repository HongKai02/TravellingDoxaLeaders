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
from itertools import chain, combinations, permutations




def get_address(rider):
    return rider.addressLine1 + (' ' if rider.addressLine2 else '' ) + rider.addressLine2 + ' ' + rider.city + ' ' + rider.zipcode + ' ' + rider.state

# Get riders who rsvped for this week's event, and event's address
today = datetime.date.today()
nextFridayDate = today + datetime.timedelta( (4-today.weekday()) % 7)
thisEvent = Event.objects.get(date = nextFridayDate)
this_event_address = get_address(thisEvent)

event = Rider.objects.get(firstName = "Destination")
#rsvped_riders2 = RiderRSVP.objects.filter(eventID = thisEvent)
rsvped_riders = Rider.objects.filter(riderrsvp__eventID = thisEvent)


# Get all rider to rider travel distances 
#rider_pairs = RiderToRiderTravelDistance.objects.filter(fromRider in rsvped_riders)

#print(rider_pairs)
'''
for r in rsvped_riders:
    rider_pairs_1 = RiderToRiderTravelDistance.objects.filter(fromRider = r)
    rider_pairs_2 = RiderToRiderTravelDistance.objects.filter(toRider = r)
'''

def get_optimal_path(riders, destination):
    for p in (permutations(riders)):
        rides = []
        for c, r in enumerate(p):            
            if c + 1 < len(p):
                r_next = p[c+1]
                ride_info = RiderToRiderTravelDistance.objects.filter(fromRider = r, toRider = r_next)
                print(ride_info)

            else: 
                ride_info = RiderToRiderTravelDistance.objects.filter(fromRider = r, toRider = event)
                print(ride_info)


        
            

def pickRiders(iterable):
    r = len(iterable)
    d = math.ceil(len(iterable) / 4)

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
    

#Algorithm
if len(rsvped_riders) <= 4:
    get_optimal_path()

cars_needed = math.ceil(len(rsvped_riders) / 4)


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


def list_all_rides_helper(rider_list, tup, counter, ride):
    if counter == len(tup):
        print(ride)
        return # When this returns it doesn't end the function in the call Stack I believe
    for subset in combinations(rider_list, tup[counter]):
        #get_optimal_path(subset, this_event_address)
        #TODO: Pass in the sorted subset, i.e. the sequence they sohuld be picked up!!!!
        remaining_riders = [x for x in rider_list if x not in subset ]
        new_ride = ride.copy() # Create a copy of the current, possible incomplete ride
        new_ride.append(subset)
        list_all_rides_helper(remaining_riders, tup, counter + 1, new_ride )

#list_all_rides(rsvped_riders[:10])

temp = tuple(rsvped_riders[:3])
get_optimal_path(temp, this_event_address)



# Figure out different ways to group riders

# For each way to group riders, note down all ride trips

# Maybe hash all the riders in a trip to store their best combination

"""
r = # riders
d = ceil( r/ 4)
k is a viable trip size if k <=4 and (r - k) / 4 <= d-1 


"""



