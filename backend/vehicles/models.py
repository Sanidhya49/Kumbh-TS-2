from django.db import models
from users.models import User

class Vehicle(models.Model):
    VEHICLE_TYPES = [
        ('2W', 'Two Wheeler'),
        ('4W', 'Four Wheeler'),
        ('8W', 'Eight Wheeler'),
        ('TR', 'Traveler'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vehicles')
    vehicle_type = models.CharField(max_length=2, choices=VEHICLE_TYPES)
    plate_number = models.CharField(max_length=20, unique=True)
    model_name = models.CharField(max_length=100)
    max_capacity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_vehicle_type_display()} - {self.plate_number}"

    def save(self, *args, **kwargs):
        # Set max capacity based on vehicle type
        if self.vehicle_type == '2W':
            self.max_capacity = 2
        elif self.vehicle_type == '4W':
            self.max_capacity = 5
        elif self.vehicle_type == '8W':
            self.max_capacity = 8
        elif self.vehicle_type == 'TR':
            self.max_capacity = 15
        super().save(*args, **kwargs) 