from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,"home.html",{"user":request.user})
def conversations(request):

    return render(request,"conversations.html",{"user":request.user})
