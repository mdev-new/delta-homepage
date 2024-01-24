from django.db.models import Model, SET_NULL, CharField, ForeignKey, DateTimeField
from django.conf import settings

class Ticket(Model):
    text = CharField(max_length=384)
    place = CharField(max_length=128)
    author = ForeignKey(settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

class Comment(Model):
    text = CharField(max_length=128)
    author = ForeignKey(settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
