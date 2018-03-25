from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class LandingPageUser(models.Model):
	email = models.EmailField(unique=True)


class Movie(models.Model):
	poster = models.TextField(max_length = None, blank = True)
	imdbId = models.CharField(max_length = 30, unique =True)
	title = models.TextField(max_length = None)
	genre = models.TextField(max_length = None)
	year = models.CharField(max_length = 10)
	

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	movies = models.ManyToManyField(Movie)
	recommended_movies = models.ManyToManyField(Movie, related_name="recommended_movies")
	bio = models.TextField(max_length = 300, blank = True)
	profilePicture = models.ImageField(upload_to = None, height_field = None, width_field = None, max_length = 200)
	fake = models.BooleanField(default = False)

	followers = models.ManyToManyField("Profile", blank=True, related_name="followerz")
	followings = models.ManyToManyField("Profile", blank=True, related_name="followingz")

	@receiver(post_save, sender=User)
	def create_user_profile(sender, instance, created, **kwargs):
		if created:
			Profile.objects.create(user=instance)

	@receiver(post_save, sender=User)
	def save_user_profile(sender, instance, **kwargs):
		instance.profile.save()

	@receiver(post_save, sender=settings.AUTH_USER_MODEL)
	def create_auth_token(sender, instance=None, created=False, **kwargs):
	    if created:
	        Token.objects.create(user=instance)
