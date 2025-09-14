from django.db import models

# Create your models here.


class Gallery (models.Model):
    # user_id = models.ForeignKey(models.User)
    title = models.CharField(max_length=50)


class ImageWithContext (models.Model):
    # gallery_id = models.ForeignKey(Gallery, on_delete = models.CASCADE)
    date_created = models.DateTimeField(auto_now = True)   
    image = models.ImageField(upload_to="gallery1/")
     