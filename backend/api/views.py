from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ImageContext
from .serializers import ImageSerializer
from PIL import Image as pillow
from django.conf import settings
from os import path, walk, remove
from .imagemanager import saveImage
import io
import zipfile
from django.http import HttpResponse


"""
Returns a list of ImageContext dicts
"""
@api_view(["GET"])
def getGalleryImages(request, gallery_id):
    images = [image.convert_to_dict() for image in ImageContext.objects.filter(gallery_id = gallery_id)]    
    return Response(images)


"""
Request that saves an image

creator_name: string
image: File
gallery_id: string
"""
@api_view(["POST"])
def postImage(request):
    data = request.data
    image = data.pop("image")[0]
    
    paths = saveImage(image, data["gallery_id"])
    
    if type(paths) == type(""):
        return Response({"ERROR": paths})
    
    data["image_url"] = paths[0]
    data["thumbnail_url"] = paths[1]
        
    serializer = ImageSerializer(data = data)

    if serializer.is_valid():
        serializer.save()       
    else: 
        print (serializer.errors)
        return Response("ERROR while saving the image")
    return Response("Success")


"""
Returns a zip file with all images from a gallery (to be downloaded)
"""
@api_view(["GET"])
def download_images_zip(request, gallery_id):
    folder_path = path.join(settings.MEDIA_DIR, "images", gallery_id)
    print(folder_path)
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for root, dirs, files in walk(folder_path):
            for file in files:
                file_path = path.join(root, file)
                arcname = path.relpath(file_path, folder_path)
                zip_file.write(file_path, arcname)

    buffer.seek(0)

    response = HttpResponse(buffer, content_type="application/zip")
    response['Content-Disposition'] = 'attachment; filename=images.zip'
    return response



@api_view(["DELETE"])
def deleteImage(request, image_id):
    
    print("deleting")
    try:
        image = ImageContext.objects.filter(id = image_id)[0]
        imageURL, thumbnailURL = image.image_directory()
        print(imageURL, thumbnailURL)
        remove(imageURL)
        remove(thumbnailURL)
        image.delete()
    except:
        print("ERROR")
        return Response("Failed to delete image")

    return Response("Success")