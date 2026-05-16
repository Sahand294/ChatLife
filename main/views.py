from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,"home.html")
def conversations(request):
    return render(request,"conversations.html")
