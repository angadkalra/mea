from django.db import models

class LandingPageUser(models.Model):
	email = models.EmailField(unique=True)

class User(models.Model):
	username = models.CharField(max_length=20, unique=True)
	password = models.CharField(max_length=30)
	email = models.EmailField(unique=True)