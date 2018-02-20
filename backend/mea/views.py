from django.http import HttpResponse
from .models import LandingPageUser
from rest_framework import views
from django.db.utils import IntegrityError
import logging
import os

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

from imdbpie import Imdb
import json

class SignUpView(views.APIView):

    # Given email, create new user and add to User model. 
    def post(self, request, *args, **kwargs):
        content = request.data

        try:
            data = content['email']
        except KeyError:
            return HttpResponse('Email not found.', status=400)

        user = LandingPageUser(email=data)
        try:
        	user.save()
        except IntegrityError:
        	return HttpResponse('User already added!', status=201)
        
        return HttpResponse(status=201)


class MoviesView(views.APIView):
    """
    This view responds with json file containing movie data based on request
    """

    def post(self, request, *arg, **kwargs ):
        content = request.data
        ia = Imdb()

        try:
            #pass in imdb movie id to get movie details
            data = content['movieId']
            try:
                movie = ia.get_title(data)
                return HttpResponse(json.dumps(movie))
            except ValueError:
                return HttpResponse("Invalid IMDB id", status = 400)
        except KeyError:
            pass

        try:
            #pass in a keyword to get a list
            #of movies that match
            data = content['search']
            try:
                searchResult = ia.search_for_title(data)
                return HttpResponse(json.dumps(searchResult))
            except ValueError:
                return HttpResponse("Invalid query, does not contain chars", status = 400)
        except KeyError:
            pass

        try:
            #pass int argument between 1-100 to get a list
            #of the top movies right now
            data = content['top']
            top100 = ia.get_popular_movies()
            try:
                return HttpResponse(json.dumps(top100['ranks'][:int(data)]))
            except ValueError:
                return HttpResponse("ValueError, int between 1-100 plz", status = 400)
        except KeyError:
            pass

        try:
            #pass imdb id to get a list of similar titles
            data = content['similar']
            try:
                similarTitles = ia.get_title_similarities(data)
                return HttpResponse(json.dumps(similarTitles))
            except ValueError:
                return HttpResponse("Invalid IMDB id", status = 400)
        except KeyError:
            return HttpResponse('Request Not Understood.', status = 400)






class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )
