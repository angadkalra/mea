import logging, os, json

from django.http import HttpResponse
from .models import LandingPageUser, Movie, Profile
from rest_framework import views
from django.db.utils import IntegrityError
from django.views.generic import View
from django.conf import settings

#user creation and login related tools
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_user
from django.contrib.auth import logout as logout_user

from imdbpie import Imdb

class SignUpView(views.APIView):

    # Create new user and add to LandingPageUser model

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


class LogoutView(views.APIView):
    """
    logout the user
    """
    def get(self, request, *args, **kwargs):
        logout_user(request)
        return HttpResponse("Logged-out", status = 201)

        
class ProfileView(views.APIView):
    """
    returns the profile information for the current user
    """

    def get(self, request, *arg, **kwargs):
        current_user = request.user

        if current_user.is_authenticated:
            data = {}
            data['username'] = current_user.username
            data['bio'] = current_user.profile.bio
            data['movies'] = {}
            #data['picture'] = current_user.profile.profilePicture
            #PROFILE PICTURE IS TO DO
            user_movies = current_user.profile.movies.all()
            #add in the data dictionary under movies a list
            #of all the movies
            index = 0
            for m in user_movies:
                index = index + 1
                m_dict = {}
                m_dict['imdbId'] = m.imdbId
                m_dict['title'] = m.title
                m_dict['posterUrl'] = m.poster
                m_dict['year'] = m.year
                m_dict['genres'] = m.genre
                data['movies'][str(index)] = m_dict

            return HttpResponse(json.dumps(data))

        else:
            return HttpResponse("No user logged-in.", status = 201)


class ProfileUpdateView(views.APIView):

    """
    updates user profile information such as bio, add or remove movies,
    or update the profile picture
    """
    def post(self, request, *arg, **kwargs):
        content = request.data
        current_user = request.user

        if current_user.is_authenticated:
            #if key is no present - no need to update
            changeMade = False
            try:
                newBio = content['bio']
                current_user.profile.bio = newBio
                changeMade = True
            except KeyError:
                pass

            try:
                pictureUrl = content['profile_image']
                #TODO
            except KeyError:
                pass

            try:
                toAdd = content['add_movie']

                if Movie.objects.filter(imdbId = toAdd).exists():
                    pass
                else:
                    AddMovieToDB(toAdd)

                movieObject = Movie.objects.get(imdbId = toAdd)
                current_user.profile.movies.add(movieObject)
                changeMade = True
            except KeyError:
                pass
            except IntegrityError:
                return HttpResponse("Hmm Something went wrong", status = 400)
            except ValueError:
                return HttpResponse("Some of the IMDB ids passed do not exist", status = 400)

            try:
                toRemove = content['remove_movie']
                movieObject = Movie.objects.get(imdbId = toRemove)
                current_user.profile.movies.remove(movieObject)
                changeMade = True
            except KeyError:
                pass
            except ValueError:
                return HttpResponse("Movie requested for removal is not on user list", status = 400)
        else:
            return HttpResponse("No user logged-in.", status = 201)

        if changeMade:
            current_user.profile.save()
            return HttpResponse("Profile updated", status = 201)
        else:
            return HttpResponse("No change made - check format", status = 400)



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

class RecommendCuratorsView(views.APIView):

    # Given a new user and movies they selected, find similar users

    def post(self, request, *args, **kwargs):
        # The request data will contain the movies selected by user and their user
        # ID. Response will contain user IDs of the recommended curators and other
        # info needed. 

        pass

#------------------------------Helper Functions-----------------------------#

"""
Adds a movie to the database, raises a ValueError exception
if the imdbId of the title given does not exist

raise exception of the movie is already in the db
"""
def AddMovieToDB(imdbId):
    ia = Imdb()
    data = ia.get_title(imdbId)
    title = data['base']['title']
    imageUrl = data['base']['image']['url']
    genres = ia.get_title_genres(imdbId)['genres']
    year = data['base']['year']

    movie = Movie(imdbId = imdbId, year = year, poster = imageUrl, genre = genres, title = title)

    movie.save()

    return
