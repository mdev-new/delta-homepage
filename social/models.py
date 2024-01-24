from django.db.models import Model, SET_NULL, DateTimeField, ForeignKey, CharField
from django.conf import settings

class Post(Model):
    text = CharField(max_length=512)
    author = ForeignKey(settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True)
    response_to = ForeignKey('self', on_delete=SET_NULL, null=True, blank=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
