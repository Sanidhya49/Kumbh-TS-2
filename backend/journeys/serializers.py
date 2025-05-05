from rest_framework import serializers
from .models import Journey
 
class JourneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Journey
        fields = '__all__'
        read_only_fields = ('user', 'is_approved') 