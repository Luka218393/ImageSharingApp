from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ImageWithContext
from .serializers import ImageSerializer


@api_view(["POST"])
def postImage(request):
    serializer = ImageSerializer(data = request.data)

    if serializer.is_valid():
        serializer.save()
        
    else: 
        print (serializer.errors)
        
    return Response({"message": "Hello, world!"})


@api_view(["GET"])
def getGalleryImages(request, gallery_id):
    images = [image.convert_to_json() for image in ImageWithContext.objects.filter(gallery_id = gallery_id)]    
    return Response(images)

