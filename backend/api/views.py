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

    return Response({"message": "Hello, world!"})

@api_view(["GET"])
def getAllImages(request):
    images =  ImageWithContext.objects.first()
    print("I am trying sth")

    return Response(
         [
            "http://127.0.0.1:8000/media/gallery1/IMG_20230713_161544.jpg",
            "http://127.0.0.1:8000/media/gallery1/IMG_20240717_205107_g9rbayU.jpg",
            "http://127.0.0.1:8000/media/gallery1/backend/gallery1/IMG_20240717_205107.jpg"
         ]
        
    )