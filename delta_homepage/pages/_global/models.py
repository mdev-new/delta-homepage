from django.contrib.auth.models import AbstractUser
from django.db.models import (
    IntegerField
)

class User(AbstractUser):
    # You can pay tuition with this, or buy on marketplace etc
    # Basically we become a bank
    credit = IntegerField(default=0)
