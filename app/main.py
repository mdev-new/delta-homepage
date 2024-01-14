from datetime import datetime, timezone

import kivy
from kivy.app import App

from kivy.uix.boxlayout import BoxLayout
from kivy.lang.builder import Builder

KV = '''
BoxLayout:
    orientation: "vertical"

    Button:
        text: "Button"
        size_hint: 1, 0.2
'''

class MyApplication(App):
    def build(self):
        self.title = 'Delta Homepage'
        return Builder.load_string(KV)

if __name__ == "__main__":
    MyApplication().run()
