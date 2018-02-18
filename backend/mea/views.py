from django.http import HttpResponse
from .models import LandingPageUser
from rest_framework import views
from django.db.utils import IntegrityError

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
