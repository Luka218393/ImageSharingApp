from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ImageWithContext
from .serializers import ImageSerializer
import io

@api_view(["POST"])
def postImage(request):
    serializer = ImageSerializer(data = request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()

    return Response({"message": "Hello, world!"})



@api_view(["GET"])
def getAllImages(request):
    images =  [ i.image.url for i in ImageWithContext.objects.all()]
    print(images)

    return Response(
         [
            "http://127.0.0.1:8000/media/gallery1/IMG_20240717_205107_g9rbayU.jpg",
            "http://127.0.0.1:8000/media/gallery1/backend/gallery1/IMG_20240717_205107.jpg"
         ]
    )



@api_view(["GET"])
def getGalleryImages(request, gallery_id):
    images =[image.convert_to_json() for image in ImageWithContext.objects.filter(gallery_id = gallery_id)]
    return Response(images)