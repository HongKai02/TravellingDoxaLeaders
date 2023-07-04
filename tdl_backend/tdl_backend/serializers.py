from rest_framework import serializers
from tdl_backend.models import Rider, RiderRSVP, Event, Driver

class RiderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rider
        fields = '__all__'

class RiderRSVPSerializer(serializers.ModelSerializer):

    riderID = RiderSerializer() # This rider ID corresponds to the riderID in the RiderRSVP table

    class Meta:
        model = RiderRSVP
        fields = ('riderID', 'eventDate')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'