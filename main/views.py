from django.shortcuts import render, redirect


# Create your views here.
def home(request):
    user = request.user
    if user.is_authenticated:
        if not user.username or not user.birthday or not user.gender:
            print(user.username, user.birthday, user.gender)
            return redirect("complete")
    return render(request,"home.html",{"user":request.user})
def conversations(request):
    user = request.user
    if user.is_authenticated:
        if not user.username or not user.birthday or not user.gender:
            print(user.username, user.birthday, user.gender)
            return redirect("complete")
    return render(request,"conversations.html",{"user":request.user})
