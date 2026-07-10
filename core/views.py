from django.shortcuts import render

def home(request):
    """Home page view"""
    context = {
        'page_title': 'PyCon Angola 2027',
        'year': 2027,
    }
    return render(request, 'core/home.html', context)