from rest_framework import viewsets, permissions
from .models import Vehicle
from .serializers import VehicleSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([SessionAuthentication, BasicAuthentication])
class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Vehicle.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs) 