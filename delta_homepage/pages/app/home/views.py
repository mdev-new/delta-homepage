from django.shortcuts import render

from django.http import HttpResponse
from delta_homepage.navbar import navbar
# Create your views here.

from _global.models import User

def index(request):
    context = {
        'name': 'Domov',
        'path': request.path,
        'posts': [
            {
                'title': 'test post',
                'author': { 'username': 'mdev' },
                'text': 'I love this webpage.',
                'created_at': 'now'
            },
            {
                'title': 'test post',
                'author': { 'username': 'mdev' },
                'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Quisque porta. Vestibulum fermentum tortor id mi. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Aliquam erat volutpat. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Vivamus luctus egestas leo. Aenean vel massa quis mauris vehicula lacinia. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Pellentesque ipsum. Curabitur bibendum justo non orci. Maecenas sollicitudin. Donec quis nibh at felis congue commodo. Cras elementum.',
                'created_at': '20 minutes ago'
            },
            {
                'title': 'test post',
                'author': { 'username': 'mdev' },
                'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Quisque porta. Vestibulum fermentum tortor id mi. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Aliquam erat volutpat. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Vivamus luctus egestas leo. Aenean vel massa quis mauris vehicula lacinia. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Pellentesque ipsum. Curabitur bibendum justo non orci. Maecenas sollicitudin. Donec quis nibh at felis congue commodo. Cras elementum.',
                'created_at': '20 minutes ago'
            }
        ],
       # 'toast': {
        #    'text': 'my message',
        #    'type': 'success'
       # },
       'chats': [{'name': 'Family Group Chat'}, {'name': '@acopier'}],
        'navbar' : navbar(request)
    }
    return render(request, 'app/home/index.html', context)
