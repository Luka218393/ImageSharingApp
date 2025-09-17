from django.urls import path
from . import views

urlpatterns = [
    path("image/", views.postImage),
    path("gallery/<uuid:gallery_id>/", views.getGalleryImages)
]