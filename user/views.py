from django.shortcuts import render, redirect
from .models import *
# Create your views here.
def profile(request):
    return render(request,"profile.html")
def sign_up(request):
    if request.method == "POST":
        first_name = request.POST["firstname"]
        last_name = request.POST["lastname"]
        username = request.POST["username"]
        password = request.POST["password"]
        email = request.POST["email"]
        birthday = request.POST["birthday"]
        gender = request.POST["gender"]
        User.objects.create_user(username=username,password=password,email=email,last_name=last_name,first_name=first_name,birthday=birthday,gender=gender)
        return redirect("home")
    return render(request,"signup.html")
def log_in(request):
    return render(request,"login.html")