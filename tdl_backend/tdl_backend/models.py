# Reminder: Model is just another word for database table 

from django.db import models

class Rider(models.Model):
    # Django will asign an id for this table as primary key
    riderID = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length = 30)
    lastName = models.CharField(max_length = 30, blank=True)
    phoneNumber = models.CharField(max_length = 20, blank=True)
    addressLine1 = models.CharField(max_length = 100)
    addressLine2 = models.CharField(max_length = 100, blank=True)
    city = models.CharField(max_length=20)
    zipcode = models.CharField(max_length = 15)
    state = models.CharField(max_length=20, blank=True, default="Wisconsin")
    rideBuddy1 = models.ForeignKey('Rider', on_delete=models.SET_NULL, blank=True, null=True)
    rideBuddy2 = models.CharField(max_length= 30, blank=True)
    rideBuddy3= models.CharField(max_length= 30, blank=True)
    rideBuddy4 = models.CharField(max_length= 30, blank=True)
    longitude = models.CharField(max_length = 20, blank=True)
    latitude = models.CharField(max_length = 20, blank=True)
    addressChanged = models.BooleanField(default=True, blank=False)

    def __str__(self):
        return self.firstName


class Driver(models.Model):
    firstName = models.CharField(max_length = 30)
    lastName = models.CharField(max_length = 30, blank=True)
    phoneNumber = models.CharField(max_length = 20, blank=True)
    addressLine1 = models.CharField(max_length = 100, blank=True)
    addressLine2 = models.CharField(max_length = 100, blank=True)
    city = models.CharField(max_length=20, blank=True)
    zipcode = models.CharField(max_length = 15, blank=True)
    state = models.CharField(max_length=20, blank=True)
    preferredRider1 = models.ForeignKey('Rider', on_delete=models.SET_NULL, related_name='preferredRider1', blank=True, null=True)
    preferredRider2 = models.ForeignKey('Rider', on_delete=models.SET_NULL, related_name='preferredRider2', blank=True, null=True)
    preferredRider3 = models.ForeignKey('Rider', on_delete=models.SET_NULL, related_name='preferredRider3', blank=True, null=True)
    preferredRider4 = models.ForeignKey('Rider', on_delete=models.SET_NULL, related_name='preferredRider4', blank=True, null=True)
    longitude = models.CharField(max_length = 20, blank=True)
    latitude = models.CharField(max_length = 20, blank=True)
    carCapacity = models.IntegerField(blank=True, default=4)

    def __str__(self):
        return self.firstName


    
class Event(models.Model):
    eventID = models.AutoField(primary_key=True)
    date = models.DateField()
    eventTitle = models.CharField(max_length = 50)
    addressLine1 = models.CharField(max_length = 80)
    addressLine2 = models.CharField(max_length = 80, blank=True)
    city = models.CharField(max_length=20)
    zipcode = models.CharField(max_length = 15)
    state = models.CharField(max_length=20)

    def __str__(self):
        return self.eventTitle + str(self.date)

class RiderRSVP(models.Model):
    riderID = models.ForeignKey('Rider', on_delete=models.CASCADE, blank=True, null=True)
    eventID = models.ForeignKey('Event', on_delete=models.SET_NULL, blank=True, null=True)
    eventDate = models.DateField()

    def __str__(self):
        return str(self.riderID)

class RiderToRiderTravelDistance(models.Model):
    fromRider = models.ForeignKey('Rider', on_delete=models.CASCADE, blank=True, null=True, related_name='fromRider')
    fromRiderLongitude = models.CharField(max_length = 20, blank=True)
    fromRiderLatitude = models.CharField(max_length = 20, blank=True)
    toRider = models.ForeignKey('Rider', on_delete=models.CASCADE, blank=True, null=True, related_name='toRider')
    toRiderLongitude = models.CharField(max_length = 20, blank=True)
    toRiderLatitude = models.CharField(max_length = 20, blank=True)
    drivingTime = models.IntegerField(blank=True)
    drivingDistance = models.DecimalField(blank=True, decimal_places=4, max_digits=7)

    def __str__(self):
        return str(self.fromRider) + " to " + str(self.toRider)
