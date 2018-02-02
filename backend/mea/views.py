from django.http import HttpResponse
import .models import User

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
