from rest_framework import viewsets, permissions
from .models import Journey
from .serializers import JourneySerializer

class JourneyViewSet(viewsets.ModelViewSet):
    queryset = Journey.objects.all()
    serializer_class = JourneySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_admin:
            return Journey.objects.all()
        return Journey.objects.filter(user=self.request.user) 