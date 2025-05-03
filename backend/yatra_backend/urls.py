from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/journeys/', include('journeys.urls')),
    path('api/vehicles/', include('vehicles.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) 