from django.http import HttpResponse
from .models import LandingPageUser
from rest_framework import views
from django.db.utils import IntegrityError
import logging
import os

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

#user creation and login related tools
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_user
from django.contrib.auth import logout as logout_user

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


class SignUpView2(views.APIView):
    """
    Create a new user, requires an e-mail, username, and password
    """

    def post(self, request, *args, **kwargs):
        content = request.data

        try:
            email = content['email']
            username = content['username']
            password = content['password']
            firstName = content['firstName']
            lastName = content['lastName']
        except KeyError:
            return HttpResponse('Error in information format', status = 400)

        try:
            user = User.objects.create_user(username)
            user.set_password(password)
            user.email = email
            user.first_name = firstName
            user.last_name = lastName
            user.save()
        except IntegrityError:
            return HttpResponse("User alredy exists.", status=201)

        return HttpResponse("User Created!", status = 201)


class LoginView(views.APIView):
    """
    takes either user-name or e-mail and check if it matches with the password
    """
    def post(self, request, *args, **kwargs):
        content = request.data

        try:
            psw = content['password']
            usn = content['username']
        except KeyError:
            return HttpResponse('Error in information format', status = 400)

        user = authenticate(username = usn, password = psw)
        login_user(request, user)
        if user is not None:
            return HttpResponse("Success", status = 201)
        else:
            return HttpResponse("Access Denied", status = 201)


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
