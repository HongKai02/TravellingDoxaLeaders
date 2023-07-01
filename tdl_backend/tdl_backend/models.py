# Reminder: Model is just another word for database table 

from django.db import models

class Rider(models.Model):
    # Django will asign an id for this table as primary key
    riderID = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length = 30)
    lastName = models.CharField(max_length = 30)
    phoneNumber = models.CharField(max_length = 20)
    addressLine1 = models.CharField(max_length = 100)
    addressLine2 = models.CharField(max_length = 100, blank=True)
    city = models.CharField(max_length=20)
    zipcode = models.CharField(max_length = 15)
    state = models.CharField(max_length=20)
    rideBuddy1 = models.ForeignKey('Rider', on_delete=models.SET_NULL, blank=True, null=True)
    rideBuddy2 = models.CharField(max_length= 30, blank=True)
    rideBuddy3= models.CharField(max_length= 30, blank=True)
    rideBuddy4 = models.CharField(max_length= 30, blank=True)
    longitude = models.CharField(max_length = 20, blank=True)
    latitude = models.CharField(max_length = 20, blank=True)

    def __str__(self):
        return self.firstName


class Driver(models.Model):
    firstName = models.CharField
    firstName = models.CharField(max_length = 30)
    lastName = models.CharField(max_length = 30)
    phoneNumber = models.CharField(max_length = 20)
    addressLine1 = models.CharField(max_length = 100)
    addressLine2 = models.CharField(max_length = 100, blank=True)
    city = models.CharField(max_length=20)
    zipcode = models.CharField(max_length = 15)
    state = models.CharField(max_length=20)
    rideBuddy1 = models.CharField(max_length= 30, blank=True) # Note that this should be linked to another rider's first and last name x
    rideBuddy2 = models.CharField(max_length= 30, blank=True)
    rideBuddy3= models.CharField(max_length= 30, blank=True)
    rideBuddy4 = models.CharField(max_length= 30, blank=True)
    longitude = models.CharField(max_length = 20, blank=True)
    latitude = models.CharField(max_length = 20, blank=True)
    carCapacity = models.IntegerField()


    
class Event(models.Model):
    eventID = models.AutoField(primary_key=True)
    date = models.DateField()
    eventTitle = models.CharField(max_length = 50)
    addressLine1 = models.CharField(max_length = 80)
    addressLine2 = models.CharField(max_length = 80)
    city = models.CharField(max_length=20)
    zipcode = models.CharField(max_length = 15)
    state = models.CharField(max_length=20)


