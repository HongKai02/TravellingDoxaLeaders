from tdl_backend.models import Rider
from django.http import JsonResponse
from tdl_backend.serializers import RiderSerializer

def RiderList(request):
    # Invoke serializer (goes form database objects to JSON data) and return to client
    data = Rider.objects.all()
    serializer = RiderSerializer(data, many=True)
    return JsonResponse({'riders': serializer.data})
