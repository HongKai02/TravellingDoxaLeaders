from tdl_backend.models import Rider, RiderRSVP, Event, Driver
from django.http import JsonResponse
from tdl_backend.serializers import RiderSerializer, RiderRSVPSerializer, EventSerializer, DriverSerializer
import datetime 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

def EventDetails(request):
    data = Event.objects.all()
    serializer = EventSerializer(data, many=True)
    return JsonResponse({'Event': serializer.data})

@api_view(['GET', 'POST'])
def RiderList(request):
    if request.method == 'GET':
        # Invoke serializer (goes form database objects to JSON data) and return to client
        data = Rider.objects.all() # data is what we get from the DB
        serializer = RiderSerializer(data, many=True)
        print("I HaVE BEEN INVOKEDDDDD")
        return JsonResponse({'riders': serializer.data})
    
    elif request.method == 'POST':
        serializer = RiderSerializer(data=request.data) # Providing only one arg ==> replacing the data entirely
        if serializer.is_valid():
            print("Adding a rider to the database")
            serializer.save()
            return Response({'riders': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def RiderRSVPList(request):
    today = datetime.date.today()
    nextFridayDate = today + datetime.timedelta( (4-today.weekday()) % 7)
    thisEventID = Event.objects.get(date = nextFridayDate)
    data = RiderRSVP.objects.filter(eventID = thisEventID)
    #data = RiderRSVP.objects.all()
    serializer = RiderRSVPSerializer(data, many=True)
    return JsonResponse({'RSVPedRiders': serializer.data})

@api_view(['GET', 'POST', 'DELETE'])
def riderRSVP(request, id):
    today = datetime.date.today()
    nextFridayDate = today + datetime.timedelta( (4-today.weekday()) % 7)
    #fullData = RiderRSVP.objects.filter(eventID = thisEventID)
    try:
        thisEventID = Event.objects.get(date = nextFridayDate)
        data = RiderRSVP.objects.filter(eventID = thisEventID, riderID = id)
        fullData = RiderRSVP.objects.filter(eventID = thisEventID)
    except RiderRSVP.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = RiderRSVPSerializer(data, many=True)
        return Response({'riderRSVP': serializer.data})
    elif request.method == 'DELETE':
        data.delete()
        fullListSerializer = RiderRSVPSerializer(fullData, many=True)
        return JsonResponse({'RSVPedRiders': fullListSerializer.data})
        #return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'POST':
        serializer = RiderRSVPSerializer(data, data=request.data, many=True)
        # Validation
        if serializer.is_valid():
            serializer.save()
            return Response({'riderRSVP': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def DriverList(request):
    data = Driver.objects.all()
    serializer = DriverSerializer(data, many=True)
    return JsonResponse({'drivers': serializer.data})

@api_view(['GET', 'POST', 'DELETE']) # POST is the same update. Can be used to edit data
def rider(request, id):
    try:
        data = Rider.objects.get(pk=id)
        fullData = Rider.objects.all()
    except Rider.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RiderSerializer(data)
        print("I HaVE BEEN INVOKEDDDDD")
        return Response({'rider': serializer.data})
    elif request.method == 'DELETE':
        data.delete()
        fullListSerializer = RiderSerializer(fullData, many=True)
        print("Success")
        return JsonResponse({'riders': fullListSerializer.data})
    elif request.method == 'POST':
        serializer = RiderSerializer(data, data=request.data) # First argument original, second new
        print("I HaVE BEEN INVOKEDDDDD")
        # Validation
        if serializer.is_valid():
            serializer.save()
            return Response({'riders': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''
Called by : 
- Scheduled job? Like everynight or something. 
- Clicking next after selecting the list of riders 
'''
def solveRides(request):
    # Get RSVPed rider's names and addresses
    # Brute force it? 
        # if 4 or less, just make it one car
 
        # Think with 8 people first maybe? How would that be bruteforced
       
    try:
        today = datetime.date.today()
        nextFridayDate = today + datetime.timedelta( (4-today.weekday()) % 7)
        thisEventID = Event.objects.get(date = nextFridayDate)
        data = RiderRSVP.objects.filter(eventID = thisEventID)
        serializer = RiderRSVPSerializer(data, many=True)
        for rider in serializer.data:
            rider = rider['riderID']
            print(rider['firstName'])
            print(rider['longitude'] + rider['latitude'])
            #print(rider['latitude'])
            print('\n')
        return JsonResponse({'Rides': serializer.data})
    except :
        return None
    
'''
Called by: 
- solveRides function above
- Reassigning riders or something
'''
def calculateRideTime():
    pass