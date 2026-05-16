from django.db import models
from user.models import *
class Conversations(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'conversations'
        ordering = ['created_at']# this creates
        verbose_name = 'conversation'
        verbose_name_plural = 'conversations'
class Friends(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    Conversation_id = models.ForeignKey(Conversations,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'friends'
        ordering = ['created_at']# this creates
        verbose_name = 'friend'
        verbose_name_plural = 'friends'
class Messages(models.Model):
    date_sent = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=300,null=True)
    files = models.FileField(upload_to="attachments/",null=True)
    from_user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversations,on_delete=models.CASCADE)
    class Meta:
        db_table = 'messages'
        ordering = ['date_sent']# this creates
        verbose_name = 'message'
        verbose_name_plural = "messages"

