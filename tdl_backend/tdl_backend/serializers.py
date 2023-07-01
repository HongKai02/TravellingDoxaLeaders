from rest_framework import serializers
from tdl_backend.models import Rider 

class RiderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rider
        field = '__all__'