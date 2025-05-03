from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JourneyViewSet

router = DefaultRouter()
router.register(r'', JourneyViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 