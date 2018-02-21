from django.conf.urls import url, include
from django.views import generic
from rest_framework import status, serializers, views
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.schemas import get_schema_view

from django.conf.urls.static import static
from mea.views import SignUpView
from mea.views import FrontendAppView
from mea.views import MoviesView
from mea.views import SignUpView2
from mea.views import LoginView
from mea.views import LogoutView
from mea.views import ProfileView
from mea.views import ProfileUpdateView

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

urlpatterns = [
    url(r'^api/$', get_schema_view()),
    url(r'^api/echo/$', EchoView.as_view()),
    url(r'^api/signup/$', SignUpView.as_view()),
    url(r'^api/signup2/$', SignUpView2.as_view()),
    url(r'^api/login/$', LoginView.as_view()),
    url(r'^api/logout/$', LogoutView.as_view()),
    url(r'^api/movies/$', MoviesView.as_view()),
    url(r'^api/profile/$', ProfileView.as_view()),
    url(r'^api/profile/update$', ProfileUpdateView.as_view()),
    url(r'^$', FrontendAppView.as_view()),

    #url(r'^(?:.*)/?$', FrontendAppView.as_view()),
    # url(r'^$', generic.RedirectView.as_view(url='/api/', permanent=False)),
    # url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    # url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view())
]