from django.db.models import (
    Model,
    DateTimeField,
    ForeignKey,
    SET_NULL
)

class CalendarEvent(Model):
    when = DateTimeField()
    remind = DateTimeField()
    belongs_to = ForeignKey(settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

class Alarm(Model):
    pass
