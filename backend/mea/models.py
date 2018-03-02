from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

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
	bio = models.TextField(max_length = 300, blank = True)
	profilePicture = models.ImageField(upload_to = None, height_field = None, width_field = None, max_length = 200)
	
	@receiver(post_save, sender=User)
	def create_user_profile(sender, instance, created, **kwargs):
		if created:
			Profile.objects.create(user=instance)

	@receiver(post_save, sender=User)
	def save_user_profile(sender, instance, **kwargs):
		instance.profile.save()
