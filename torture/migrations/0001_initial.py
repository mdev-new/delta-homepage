# Generated by Django 5.0.1 on 2024-01-24 13:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=2048)),
                ('mode', models.PositiveSmallIntegerField(choices=[(0, 'Normalne'), (1, 'Po slepu'), (2, 'Po zpátku'), (3, 'Hledej začáteční písmenka'), (4, 'Hledej písmenka ve slovech'), (5, 'Hledej pribuzna slova'), (6, 'Bez mezer'), (7, 'Opis koreny slov')], default=0)),
                ('repeat', models.PositiveSmallIntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
