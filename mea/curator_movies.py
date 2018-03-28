from .models import Profile, Movie
import numpy as np

class CuratorMovies:

	def get(pid):

		recommendations = []

		profile = Profile.objects.get(id=pid)
		my_movies = profile.movies.all()

		curators = profile.followings.all()

		all_movies = set()

		for c in curators:
			c_movies = set(c.movies.all())
			all_movies = all_movies.union(c_movies)

		new_movies = all_movies.difference(my_movies)

		for m in new_movies:
			data = {}
			data['imdbID'] = m.imdbId 
			data['title'] = m.title
			data['poster'] = m.poster
			recommendations.append(data)

		return recommendations