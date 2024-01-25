from django.db.models import (
    Model,
    CharField,
    DateTimeField,
    PositiveSmallIntegerField,
    BooleanField,
    IntegerChoices,
    ForeignKey,
    SET_NULL
)

from django.conf import settings

class LessonType(IntegerChoices):
    NORMAL = 0, 'Normalne'
    BLIND = 1, 'Po slepu'
    ARAB = 2, 'Po zpátku'
    GRANDMA = 3, 'Hledej začáteční písmenka'
    GRANDMA_ALT_ACCOUNT = 4, 'Hledej písmenka ve slovech'
    ALABAMA = 5, 'Hledej pribuzna slova'
    NO_SPACE = 6, 'Bez mezer'
    STROM = 7, 'Opis koreny slov'

class Lesson(Model):
    text = CharField(max_length=2048)
    mode = PositiveSmallIntegerField(default=LessonType.NORMAL, choices=LessonType.choices)
    repeat = PositiveSmallIntegerField(default=1)
    backspace = BooleanField(default=False),
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    author = ForeignKey(settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True)
