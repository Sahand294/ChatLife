from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .models import *
# Create your views here.
def profile(request):
    if request.method == "POST":
        request.user.username = request.POST["username"]
        request.user.birthday = request.POST["birthday"]
        request.user.gender = request.POST["gender"]
        request.user.first_name = request.POST["first_name"]
        request.user.last_name = request.POST["last_name"]
        request.user.save()
    user = request.user
    if user.is_authenticated:
        if not user.username or not user.birthday or not user.gender:
            print(user.username, user.birthday, user.gender)
            return redirect("complete")
    initials = f"{request.user.first_name[0].upper()}{request.user.last_name[0].upper()}"
    return render(request,"profile.html",{"user":request.user,"initials":initials})
def complete_account(request):
    if request.method == "POST":
        user = request.user
        user.gender =   request.POST["gender"]
        user.birthday = request.POST["birthday"]
        user.username = request.POST["username"]
        user.save()
        return redirect("home")
    # if request.user.is_authenticated:
    #     return redirect("home")
    return render(request,"complete.html")
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
    if request.user.is_authenticated:
        return redirect("home")
    return render(request,"signup.html")
def log_in(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        auth = authenticate(username=username,password=password)
        if auth:
            login(request,auth)
            print("loged in")
            return redirect("cons")
        else:
            return render(request,"login.html",{"message":"Wrong Username or Password"})
    if request.user.is_authenticated:
        return redirect("home")
    return render(request,"login.html")