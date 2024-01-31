from django.db.models import (
    Model,
    DateTimeField,
    ForeignKey,
    BooleanField,
    SET_NULL
)

class CalendarEvent(Model):
    when = DateTimeField()
    remind = DateTimeField()
    active = BooleanField(default=False)
    title = CharField(max_length=128)
    comment = CharField(max_length=256)
    belongs_to = ForeignKey(settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

class Alarm(Model):
    when = DateTimeField()
    active = BooleanField(default=False)
    title = CharField(max_length=128)
    comment = CharField(max_length=256)
    belongs_to = ForeignKey(settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
