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
        return JsonResponse({'riders': serializer.data})
    
    elif request.method == 'POST':
        serializer = RiderSerializer(data=request.data) # Providing only one arg ==> replacing the data entirely
        if serializer.is_valid():
            serializer.save()
            return Response({'rider': serializer.data}, status=status.HTTP_201_CREATED)
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
    try:
        thisEventID = Event.objects.get(date = nextFridayDate)
        data = RiderRSVP.objects.filter(eventID = thisEventID, riderID = id)
    except RiderRSVP.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = RiderRSVPSerializer(data, many=True)
        return Response({'riderRSVP': serializer.data})
    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
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
    except Rider.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RiderSerializer(data)
        return Response({'rider': serializer.data})
    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'POST':
        serializer = RiderSerializer(data, data=request.data) # First argument original, second new
        # Validation
        if serializer.is_valid():
            serializer.save()
            return Response({'riders': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
