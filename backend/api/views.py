from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ImageWithContext
from .serializers import ImageSerializer
from PIL import Image as pillow
from django.conf import settings
import os
from .imagemanager import saveImage


@api_view(["POST"])
def postImage(request):
    data = request.data
    image = data.pop("image")[0]
#    thumbnail = data.pop("thumbnail")[0]
    
    paths = saveImage(image, data["gallery_id"])
    
    if type(paths) == type(""):
        return Response({"ERROR": paths})
    
    data["image_url"] = paths[0]
    data["thumbnail_url"] = paths[1]
        
    serializer = ImageSerializer(data = data)

    if serializer.is_valid():
        print('serializer is valid')
        serializer.save()
        
    else: 
        print (serializer.errors)
        
    return Response({"message": "Hello, world!"})


@api_view(["GET"])
def getGalleryImages(request, gallery_id):
    images = [image.convert_to_json() for image in ImageWithContext.objects.filter(gallery_id = gallery_id)]    
    return Response(images)

