========================
# JWT auth and React/Redux

Code for the "Full stack Django: Quick start with JWT auth and React/Redux" article


https://medium.com/@viewflow/full-stack-django-quick-start-with-jwt-auth-and-react-redux-part-i-37853685ab57

### setup

```
cd backend
virtualenv env
source env/bin/activate
pip install requirements.txt
./manage.py migrate
cd ../frontend
npm install
```

### activate backend

in backend

```
./manage.py runserver
```

should be running on localhost:8000

### activate frontend

in frontend

```
npm run start
```

should be running on localhost:3000