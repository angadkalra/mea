from django.http import HttpResponse
from .models import LandingPageUser
from rest_framework import views
from django.db.utils import IntegrityError
import logging
import os

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

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
