from .views import *
from django.urls import path
urlpatterns = [path('sign_up/', sign_up, name="sign_up"),
               path('log_in/', log_in, name="log_in"),
               path('profile/', profile, name="profile")]
