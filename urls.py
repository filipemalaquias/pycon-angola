from django.urls import path
from . import views

app_name = 'website'

urlpatterns = [
    # Home
    path('', views.home, name='home'),
    path('pt/', views.home_pt, name='home_pt'),
    path('en/', views.home_en, name='home_en'),
    
    # About
    path('sobre/', views.about_pt, name='about_pt'),
    path('about/', views.about_en, name='about_en'),
    
    # Code of Conduct
    path('codigo-de-conduta/', views.code_of_conduct_pt, name='code_of_conduct_pt'),
    path('code-of-conduct/', views.code_of_conduct_en, name='code_of_conduct_en'),
    
    # Switch Language
    path('mudar-idioma/<str:lang>/', views.switch_language, name='switch_language'),
    path('switch-language/<str:lang>/', views.switch_language, name='switch_language'),
]