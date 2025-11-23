from rest_framework import serializers
from .models import ThreadNode, ThreadEdge


class ThreadNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreadNode
        fields = "__all__"


class ThreadEdgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreadEdge
        fields = "__all__"
