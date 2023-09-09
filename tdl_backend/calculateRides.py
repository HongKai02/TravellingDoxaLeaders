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

best_arrangments = [0, 0, 0]# Place holder values 
best_arrangments_time = [9999, 9999, 9999] # Let this always be sorted
total_iter = 0


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


def get_optimal_path(riders, destination):
    shortest_ride = []
    min_time = 999999
    for p in (permutations(riders)):
        ride = []
        rider_sequence = []
        time_count = 0
        for c, r in enumerate(p):     
            if not rider_sequence:
                rider_sequence.append(r)

            if c + 1 < len(p):
                r_next = p[c+1]
                ride_info = RiderToRiderTravelDistance.objects.get(fromRider = r, toRider = r_next)
                rider_sequence.append(r_next)
                time_count += ride_info.drivingTime

            else: 
                ride_info = RiderToRiderTravelDistance.objects.get(fromRider = r, toRider = event)
                #rider_sequence.append(event)  // Removed this to match the input that list_all_rides_helper is expecting
                time_count += ride_info.drivingTime

        if time_count < min_time:
            min_time = time_count
            ride.append(tuple(rider_sequence))
            ride.append(time_count)
            shortest_ride = ride
    
    if min_time != 999999:
        return(shortest_ride)
    
    else:
        return None
        
            

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

    #TODO: DO NOT RUN IF LESS THAN 5 riders

    car_seats_combinations = calc_car_seats_required(len(rsvped_riders), math.ceil(len(rsvped_riders)/4))
    print(car_seats_combinations)
    for t in car_seats_combinations: # Think of t as (2,4,4)
        list_all_rides_helper(rsvped_riders, t, 0, [])


def list_all_rides_helper(rider_list, tup, counter, ride):
    global total_iter
    if counter == len(tup): # One possible ride arangement has been derived
        # Check if its efficiency ranks top 3 
        combined_driving_time = 0
        for group in ride:
            driving_time = group[len(group)-1]
            combined_driving_time += driving_time
            #print(driving_time)
        print(combined_driving_time)
        total_iter += 1

        if combined_driving_time < best_arrangments_time[2]:
            best_arrangments_time.pop # Remove third (last) arangement's time
            best_arrangments.pop
            if combined_driving_time < best_arrangments_time[1]:
                if combined_driving_time < best_arrangments_time[0]:
                    best_arrangments_time[0] = combined_driving_time
                    best_arrangments[0] = (ride)

                else:
                    best_arrangments_time[1] = combined_driving_time
                    best_arrangments[1] = (ride)
            else:
                best_arrangments_time[2] = combined_driving_time
                best_arrangments[2] = (ride)

        return
    
    for subset in combinations(rider_list, tup[counter]):
        opt_path = get_optimal_path(subset, this_event_address)
        if opt_path: # Null check
            remaining_riders = [x for x in rider_list if x not in subset]
            #updated_rides = ride.copy()
            
            new_ride = ride.copy()
            new_ride.append(opt_path)
            list_all_rides_helper(remaining_riders, tup, counter + 1, new_ride)




def get_best_rides(riders):
    list_all_rides(riders)
    for arrangement in best_arrangments:
        print(arrangement)
        print("\n")
    








