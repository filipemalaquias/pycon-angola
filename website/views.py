from django.shortcuts import render, redirect
from django.urls import reverse

def get_language_from_request(request):
    """Obtém o idioma atual da sessão"""
    return request.session.get('language', 'pt')

def home_pt(request):
    """Página inicial em Português"""
    request.session['language'] = 'pt'
    context = {
        'LANGUAGE_CODE': 'pt',
    }
    return render(request, 'website/home_pt.html', context)

def home_en(request):
    """Página inicial em Inglês"""
    request.session['language'] = 'en'
    context = {
        'LANGUAGE_CODE': 'en',
    }
    return render(request, 'website/home_en.html', context)

def home(request):
    """Redireciona para a página inicial com base no idioma atual"""
    lang = request.session.get('language', 'pt')
    if lang == 'en':
        return redirect('website:home_en')
    return redirect('website:home_pt')

def code_of_conduct_pt(request):
    """Página de Código de Conduta em Português"""
    request.session['language'] = 'pt'
    context = {
        'LANGUAGE_CODE': 'pt',
    }
    return render(request, 'website/code_of_conduct_pt.html', context)

def code_of_conduct_en(request):
    """Página de Código de Conduta em Inglês"""
    request.session['language'] = 'en'
    context = {
        'LANGUAGE_CODE': 'en',
    }
    return render(request, 'website/code_of_conduct_en.html', context)

def about_pt(request):
    """Página Sobre em Português"""
    request.session['language'] = 'pt'
    context = {
        'LANGUAGE_CODE': 'pt',
    }
    return render(request, 'website/about_pt.html', context)

def about_en(request):
    """Página Sobre em Inglês"""
    request.session['language'] = 'en'
    context = {
        'LANGUAGE_CODE': 'en',
    }
    return render(request, 'website/about_en.html', context)

def pyday_pt(request):
    """Página PyDay em Português"""
    request.session['language'] = 'pt'
    context = {
        'LANGUAGE_CODE': 'pt',
    }
    return render(request, 'website/pyday_pt.html', context)

def pyday_en(request):
    """Página PyDay em Inglês"""
    request.session['language'] = 'en'
    context = {
        'LANGUAGE_CODE': 'en',
    }
    return render(request, 'website/pyday_en.html', context)

def switch_language(request, lang):
    """Alterna o idioma e redireciona para a página atual no novo idioma"""
    request.session['language'] = lang
    
    # Obtém a URL atual
    referer = request.META.get('HTTP_REFERER', '/')
    
    # Mapeia as URLs para redirecionar corretamente
    if '/sobre/' in referer or '/about/' in referer:
        return redirect('website:about_pt' if lang == 'pt' else 'website:about_en')
    elif '/codigo-de-conduta/' in referer or '/code-of-conduct/' in referer:
        return redirect('website:code_of_conduct_pt' if lang == 'pt' else 'website:code_of_conduct_en')
    elif '/pyday/' in referer or '/pyday-angola/' in referer:
        return redirect('website:pyday_pt' if lang == 'pt' else 'website:pyday_en')
    else:
        return redirect('website:home_pt' if lang == 'pt' else 'website:home_en')