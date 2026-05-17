from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    birthday = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=6,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=100,null=True, blank=True)
    email = models.EmailField(unique=True)
    class Meta:
        db_table = "users"
        ordering = ["created_at"]
        verbose_name = "user"
        verbose_name_plural = "users"