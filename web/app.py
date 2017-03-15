import json
from bottle import abort, error, get, post, put, request, route, run, static_file, template, view

########## Utility Functions ##########
# TODO remove hardcoded login answer
def check_login(username=None, password=None):
    if username == 'Meow':
        if password == 'Meow':
            return True
    return False

########## API ##########
@get('/user')
@get('/user/<userid>')
def get_user(userid=None):
    if userid is None:
        print(json.loads(TEMP_USER))
        return TEMP_USER
    print(json.loads(TEMP_USER))
    users = json.loads(TEMP_USER)
    print(userid)
    for user in users:
        # FIXME
        if user.get('id') == userid:
            print('Found match:', user)
            return json.dumps(user)
    return 'User Not Found'


@post('/user/register')
def register_user():
    name = request.form.get('name')
    email = request.form.get('email')

@post('/login')
def login_user():
    username = request.forms.get('username')
    password = request.forms.get('password')
    # TODO Return something else than just string
    if check_login(username, password):
        response.set_cookie("account", username, secret='some-secret-key')
        return template("<p>Welcome {{name}}! You are now logged in.</p>", name=username)
    else:
        return "<p>Login failed.</p>"

@put('/user/<userid>')
def update_user():
    print('updated user')