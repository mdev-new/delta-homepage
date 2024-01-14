from datetime import datetime, timezone

import kivy
from kivy.app import App

from kivy.uix.boxlayout import BoxLayout

class MainView(BoxLayout):
    def __init__(self):
        super(MainView, self).__init__()

class MyApplication(App):
    def build(self):
        self.title = 'Vstup do školy'
        return MainView()

if __name__ == "__main__":
    MyApplication().run()
