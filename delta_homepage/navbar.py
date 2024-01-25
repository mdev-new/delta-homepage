def navbar(user):
    navbar = [
        {'route': '/', 'name': 'Home'},
        {'route': '/food/', 'name': 'Food'},
        {'route': '/market/', 'name': 'Market'},
        {'route': '/tickets/', 'name': 'Tickets'},
        {'route': '/help/', 'name': 'Helpdesk'},
        {'route': '/route/', 'name': 'Route'},
        {'route': '/torture/', 'name': 'Šhrekova bažina'} # Todo : Conditional render based on if the user is in 1st grade
    ]

    return navbar
