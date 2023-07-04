from tdl_backend.models import Rider, RiderRSVP, Event, Driver
from django.http import JsonResponse
from tdl_backend.serializers import RiderSerializer, RiderRSVPSerializer, EventSerializer, DriverSerializer
import datetime 

def EventDetails(request):
    data = Event.objects.all()
    serializer = EventSerializer(data, many=True)
    return JsonResponse({'Event': serializer.data})

def RiderList(request):
    # Invoke serializer (goes form database objects to JSON data) and return to client
    data = Rider.objects.all()
    serializer = RiderSerializer(data, many=True)
    return JsonResponse({'riders': serializer.data})

def RiderRSVPList(request):
    today = datetime.date.today()
    nextFridayDate = today + datetime.timedelta( (4-today.weekday()) % 7)
    thisEventID = Event.objects.get(date = nextFridayDate)
    data = RiderRSVP.objects.filter(eventID = thisEventID)
    #data = RiderRSVP.objects.all()
    serializer = RiderRSVPSerializer(data, many=True)
    return JsonResponse({'RSVPedRiders': serializer.data})

def DriverList(request):
    data = Driver.objects.all()
    serializer = DriverSerializer(data, many=True)
    return JsonResponse({'drivers': serializer.data})
