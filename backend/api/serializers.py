from rest_framework import serializers
from .models import ImageWithContext



class ImageSerializer (serializers.ModelSerializer):
    class Meta:
        model = ImageWithContext
        fields = ["creator_name","gallery_id", "image_url", "thumbnail_url"]
        
        