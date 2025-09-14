from django.urls import path
from . import views

urlpatterns = [
    path("image/", views.postImage),
    path("image/1", views.getAllImages),
    path("gallery/<uuid:gallery_id>/", views.getGalleryImages)
]