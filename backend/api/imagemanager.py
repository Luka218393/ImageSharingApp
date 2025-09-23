from os import path
from PIL import Image as pillow
from django.conf import settings
from uuid import uuid4
import time

# Function saves image and creates thumbnail for it
def saveImage(request_image, gallery_id):
    
    imageUUID, extension = uuid4(), request_image.content_type.split("/")[1]
    image, thumbnail = None, None

    try:
        image = pillow.open(request_image)              
    except: 
        return "Failed to open image"
    

    thumbnail = image.copy()
    thumbnail.thumbnail((640, (640 * image.height / image.width)))

    image_path = path.join("media", "images", gallery_id, f"{imageUUID}.{extension}")
    thumbnail_path= path.join("media", "thumbnails", gallery_id, f"{imageUUID}.{extension}")

    try:
        image.save(image_path)
        thumbnail.save(thumbnail_path)
    except:
        return "Failed to save images"
    
    return (image_path, thumbnail_path)
