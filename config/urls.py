from django.conf.urls import url, include
from django.views import generic
from rest_framework import status, serializers, views
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.schemas import get_schema_view
from rest_framework.authtoken import views

from django.conf.urls.static import static
from mea.views import SignUpView, FrontendAppView, MoviesView, SignUpView2, LoginView
from mea.views import LogoutView, ProfileView, ProfileUpdateView, FindCuratorsView, PublicProfileView
from mea.views import GetTopMoviesView, RecommendMovieView

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()

class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

urlpatterns = [
    url(r'^$', FrontendAppView.as_view()),
    url(r'^api/$', get_schema_view()),
    url(r'^api/signup/$', SignUpView.as_view()),
    url(r'^api/signup2/$', SignUpView2.as_view()),
    url(r'^api/login/$', views.obtain_auth_token),
    url(r'^api/logout/$', LogoutView.as_view()),
    url(r'^api/movies/$', MoviesView.as_view()),
    url(r'^api/movies/top$', GetTopMoviesView.as_view()),
    url(r'^api/profile/$', ProfileView.as_view()),
    url(r'^api/profile/update$', ProfileUpdateView.as_view()),
    url(r'^api/profile/(?P<id>\d+)/$', PublicProfileView.as_view()),
    url(r'^welcome', FrontendAppView.as_view()),
    url(r'^api/match/$', FindCuratorsView.as_view()),
    url(r'^api/recommend/$', RecommendMovieView.as_view())
]