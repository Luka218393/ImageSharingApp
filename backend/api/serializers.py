from rest_framework import serializers
from .models import ImageWithContext

class ImageSerializer (serializers.ModelSerializer):
    class Meta:
        model = ImageWithContext
        fields = ["image"]
    """
    def get_image(self, obj):
        request = self.context.get("request")
        photo_url = obj.fingerprint.url
        return request.build_absolute_uri(photo_url)"""