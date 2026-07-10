# website/context_processors.py
def language_processor(request):
    """Adiciona o idioma atual ao contexto de todas as páginas"""
    return {
        'LANGUAGE_CODE': request.session.get('language', 'pt'),
    }