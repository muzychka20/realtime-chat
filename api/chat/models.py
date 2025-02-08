from django.contrib.auth.models import AbstractUser
from django.db import models


def upload_thumbnail(instance, filename):
    path = f'thumbnails/{instance.username}'
    print("🚀filename", filename)
    extension = filename.split('.')[-1]
    print("path: ", path)
    print("extension: ", extension)
    if extension:
        path = path + '.' + extension
    return path


class User(AbstractUser):
    thumbnail = models.ImageField(
        upload_to=upload_thumbnail, null=True, blank=True)

    def __str__(self):
        return self.username
