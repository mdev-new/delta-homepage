def navbar(user):
    navbar = [
        {'route': '/', 'name': 'Domov'},
        {'route': '/grades/', 'name': 'Znamky'},
        {'route': '/food/', 'name': 'Jídlo'},
        {'route': '/market/', 'name': 'Marketplace'},
        {'route': '/tickets/', 'name': 'Problémy'},
        {'route': '/help/', 'name': 'Code helpdesk'},
        {'route': '/route/', 'name': 'Spojení'},
        {'route': '/torture/', 'name': 'Šhrekova bažina'} # Todo : Conditional render based on if the user is in 1st grade
    ]

    return navbar
