from django.contrib import admin
from threadApp.models import ThreadNode, ThreadEdge

# Register your models here.
admin.site.register(ThreadNode)
admin.site.register(ThreadEdge)
