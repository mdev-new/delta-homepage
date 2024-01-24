from django.db.models import (
    Model,
    CharField,
    DateTimeField,
    ForeignKey,
    CASCADE
)

from django.conf import settings

class Listing(Model):
    text = CharField(max_length=512)
    author = ForeignKey(settings.AUTH_USER_MODEL, on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

# todo files, thumbnail
