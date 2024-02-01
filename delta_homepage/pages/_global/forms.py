from django.forms import Form, CharField, PasswordInput

class PasswordField(CharField):
    widget = PasswordInput

class LoginForm(Form):
	username = CharField(label="Uzivatelske jmeno", max_length=30)
	password = PasswordField(label="Heslo", max_length=100)

class RegisterForm(Form):
	username = CharField(label="Uzivatelske jmeno", max_length=30)
	email = CharField(label="E-Mail", max_length=60)
	password = PasswordField(label="Heslo", max_length=100)
	name = CharField(label="Jmeno", max_length=40)
	surname = CharField(label="Prijmeni", max_length=40)
