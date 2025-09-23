from rest_framework import serializers
from .models import ImageContext



class ImageSerializer (serializers.ModelSerializer):
    class Meta:
        model = ImageContext
        fields = ["creator_name","gallery_id", "image_url", "thumbnail_url"]
        
        