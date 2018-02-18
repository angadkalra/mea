from django.conf.urls import url, include
from django.views import generic
from rest_framework import status, serializers, views
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.schemas import get_schema_view

from mea.models import User

from django.conf.urls.static import static
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()


class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class SignUpView(views.APIView):
    # Given email, create new user and add to User model. 
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':

            content = request.POST
            try:
                data = content['email']
            except KeyError:
                return HttpResponse('Email not found.', status=400)

            user = User(email=data)
            user.save()
            
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=405)


urlpatterns = [
    url(r'^$', generic.RedirectView.as_view(url='/api/', permanent=False)),
    url(r'^api/$', get_schema_view()),
<<<<<<< HEAD
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),
    url(r'^api/echo/$', EchoView.as_view()),
    url(r'^api/signup/$', SignUpView.as_view())
=======
    # url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    # url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),
    url(r'^api/echo/$', EchoView.as_view()),
>>>>>>> landing_page
]