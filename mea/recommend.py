import numpy as np

from .models import Profile, Movie
from django.contrib.auth.models import User
from django.core import serializers

# Given a user, find similar users based on Jaccard similarity
# of movies they like.

class SimilarUsers(): 

	def find(user):
		# number of users
		n = Profile.objects.count()
		print("Number of users: ", n)

		# Create 2d array of profile id's and similarity scores
		scores = np.zeros((n,2))  

		# From user, get movies they selected. 
		user_movies = np.array(list(map(lambda x: x.id, user.profile.movies.all())))

		# get list of current users
		i = 0
		for profile in Profile.objects.all():

			if profile.id == user.id:
				scores[i, 0] = profile.id
				i += 1
				continue

			movies = np.array(list(map(lambda x: x.id, profile.movies.all())))

			intersection = np.intersect1d(user_movies, movies)
			union = np.union1d(user_movies, movies)
			jaccard = np.float(intersection.size/union.size)

			scores[i, 0] = profile.id
			scores[i, 1] = jaccard

			i += 1

		# Sort scores by decreasing order of similarity
		scores = scores[scores[:,1].argsort()[::-1]]
		
		# Return top 10 matches
		top_matches = scores[1:11,0].astype(np.int).tolist()

		data = []
		for p in top_matches:
			obj = {}
			profile = Profile.objects.get(id = p)
			
			obj['firstName'] = profile.user.first_name
			obj['lastName'] = profile.user.last_name
			obj['id'] = profile.user.id
			obj['username'] = profile.user.username

			data.append(obj)

		return data







