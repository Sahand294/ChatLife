from django.shortcuts import render

# Create your views here.
def home(request):
    if request.session["user_id"]:
        return render(request,"home.html",{"user_id":int(request.session["user_id"])})
    return render(request,"home.html")
def conversations(request):
    if request.session["user_id"]:
        return render(request,"conversations.html",{"user_id":int(request.session["user_id"])})
    return render(request,"conversations.html")
