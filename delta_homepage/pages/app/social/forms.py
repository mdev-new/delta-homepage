from django.forms import Form, CharField, PasswordInput, FileField

class NewPost(Form):
	text = CharField(label="Text", max_length=512)
	file = FileField(label="Obrazek")
