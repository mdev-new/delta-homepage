def navbar(request):
    navbar = [
        {'route': '/', 'name': 'Domov'},
        {'route': '/app/grades/', 'name': 'Znamky'},
        {'route': '/app/food/', 'name': 'Jídlo'},
        {'route': '/app/market/', 'name': 'Marketplace'},
        {'route': '/app/tickets/', 'name': 'Problémy'},
        {'route': '/app/help/', 'name': 'Code helpdesk'},
        {'route': '/app/route/', 'name': 'Spojení'},
        {'route': '/app/torture/', 'name': 'Šhrekova bažina'} # Todo : Conditional render based on if the user is in 1st grade
    ]

    publicNavBar = [
        {'route': '/', 'name': 'Domov'},
        {'route': '/login/', 'name': 'Login'}
    ]

    return navbar if request.user.is_authenticated else publicNavBar
