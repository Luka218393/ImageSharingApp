from rest_framework import serializers
from .models import ImageWithContext



class ImageSerializer (serializers.ModelSerializer):
    class Meta:
        model = ImageWithContext
        fields = ["creator_name","gallery_id","image"]
        
    #This is called when instance is created
    def create(self, validated_data):
        instance = super.create(validated_data)
        
        
        instance.thumbnail_url = ""
        