from django.db import models
from users.models import User
from vehicles.models import Vehicle

class Journey(models.Model):
    LOCATIONS = [
        ('KM', 'Kumbh Mela'),
        ('BD', 'Badrinath'),
        ('JG', 'Jagannath Yatra'),
        ('UJ', 'Ujjain'),
        ('KD', 'Kedarnath Mandir'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journeys')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='journeys')
    start_location = models.CharField(max_length=2, choices=LOCATIONS)
    end_location = models.CharField(max_length=2, choices=LOCATIONS)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    number_of_passengers = models.IntegerField()
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.get_start_location_display()} to {self.get_end_location_display()}"

    def save(self, *args, **kwargs):
        # Validate number of passengers against vehicle capacity
        if self.number_of_passengers > self.vehicle.max_capacity:
            raise ValueError(f"Number of passengers cannot exceed vehicle capacity of {self.vehicle.max_capacity}")
        super().save(*args, **kwargs) 