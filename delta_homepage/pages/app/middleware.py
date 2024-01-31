from django.shortcuts import redirect

def check_auth(get_response):
    def middleware(request):
        response = get_response(request)
        isApp = request.path.startswith('/app/')
        if isApp and request.user.is_authenticated:
            return response
        elif isApp:
            return redirect('/')
        else:
            return response

    return middleware
