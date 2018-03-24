import numpy as np

from .models import Profile, Movie
from django.contrib.auth.models import User

class SimilarUsers(): 

	def find(user):
		# number of users
		n = Profile.objects.count()

		# Create 2d array of profile id's and similarity scores
		scores = np.empty([n,2], dtype=np.float)  

		# From user, get movies they selected. 
		user_movies = np.array(list(map(lambda x: x.id, user.profile.movies.all())))

		# get list of current users
		for profile in Profile.objects.all():
			index = profile.id

			if profile.id == user.id:
				scores[index-1, 1] = 0
				scores[index-1, 0] = index
				continue

			movies = np.array(list(map(lambda x: x.id, profile.movies.all())))

			intersection = np.intersect1d(user_movies, movies)
			union = np.union1d(user_movies, movies)
			jaccard = np.float(intersection.size/union.size)

			scores[index-1, 0] = index
			scores[index-1, 1] = jaccard

		scores = scores[scores[:,1].argsort()[::-1]]
		
		scores = scores[1:6,0].astype(np.int).tolist()

		return scores








