from django.db import models
from django.conf import settings
import uuid
import json

# Create your models here.
def upload_to(instance, filename):
    return "media/{0}/{1}".format(instance.gallery_id, filename)

class Gallery (models.Model):
    id = models.UUIDField(default = uuid.uuid4, unique=True, primary_key=True)
    creator_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, null = True,  blank = True, default=None, related_name="user_galery")#remove blank
    title = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)

class ImageWithContext (models.Model):
    id = models.UUIDField(default = uuid.uuid4, unique=True, primary_key=True)
    gallery_id = models.ForeignKey(Gallery, on_delete = models.CASCADE, null=True, related_name="gallery_images")#remove blank
    image = models.ImageField(upload_to=upload_to)  
    # cropped_image = models.ImageField(upload_to="media/gallery2/")
    creator_name = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now=True)
    
    def convert_to_json(self):
        data = {
            "id": str(self.id),
            "gallery_id": str(self.gallery_id),
            "creator_name": self.creator_name,
            "image_url": "http://127.0.0.1:8000/" + self.image.url
        }
        return json.dumps(data)
    def __str__(self):
        return str(self.id)