from django.http import HttpResponse
import .models import User

class SignUpView()
	# Given email, create new user and add to User model. 
	def add_user(request):
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

# Given binary vector of movie likes, recommend other similar users. 
def recommend_curators(request):

