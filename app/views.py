from django.shortcuts import render

# Create your views here.
def handu(request):
    return render(request,'Handu.html')

def register(request):
    return render(request,'register.html')

def entry(request):
    return render(request,'entry.html')


