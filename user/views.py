from django.shortcuts import render

# Create your views here.
def profile(request):
    return render(request,"profile.html")
def sign_up(request):
    return render(request,"signup.html")
def log_in(request):
    return render(request,"login.html")