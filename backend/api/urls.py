from django.urls import path
from . import views

urlpatterns = [
    path("image/", views.postImage),
    path("gallery/<str:gallery_id>/", views.getGalleryImages),
    path("download/<str:gallery_id>/", views.download_images_zip),
    path("delete/image/<str:image_id>/", views.deleteImage),
]
