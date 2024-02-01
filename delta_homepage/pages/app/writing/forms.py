from django.forms import Form, CharField, PasswordInput

class NewPost(Form):
	text = CharField(label="Text", max_length=1024)
