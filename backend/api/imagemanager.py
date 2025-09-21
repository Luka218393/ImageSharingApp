from os import path
from PIL import Image as pillow
from django.conf import settings
from uuid import uuid4
import time


def saveImage(request_image, gallery_id  ):
    
    time1 = time.time()
    
    imageUUID = uuid4()
    image, thumbnail = "",""
    
    try:
        image = pillow.open(request_image)              
    except: 
        return "Failed to open image"
    

    thumbnail = image.copy()
    thumbnail.thumbnail((640, (640 * image.height / image.width)))

    image_path = path.join("media", "images", gallery_id, f"{imageUUID}.jpeg")
    thumbnail_path= path.join("media", "thumbnails", gallery_id, f"{imageUUID}.jpeg")
    
    try:
        image.save(image_path)
        thumbnail.save(thumbnail_path)
    except:
        return "Failed to save images"
    
    print((time.time()-time1))
    return (image_path, thumbnail_path)
