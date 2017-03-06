from bottle import abort, error, get, post, request, route, run, static_file, template, view

########## User Facing Routes ##########
@route('/')
@view('index.html')
def index():
    return dict()

@post('/login') # or @route('/login', method='POST')
def do_login():
    username = request.forms.get('username')
    password = request.forms.get('password')
    # TODO Return something else than just string
    if check_login(username, password):
        response.set_cookie("account", username, secret='some-secret-key')
        return template("<p>Welcome {{name}}! You are now logged in.</p>", name=username)
    else:
        return "<p>Login failed.</p>"

# TODO remove hardcoded login answer
def check_login(username=None, password=None):
    if username == 'Meow':
        if password == 'Meow':
            return True
    return False

########## API ##########
@get('/habit/<habitid>')
def get_habit(habitid):
    return {"habitid": habitid, "name": "Programming": "userid": 3, "streak": 3}

@get('/user/<userid>')
def get_user(userid):
    return {"userid": userid, "name": "Jane Kim"}

@post('/habit')
def create_habit():
    name = requests.forms.get('name')

@post('/user')
def create_user():
    name = requests.form.get('name')
    email = requests.form.get('email')

# @put('/habit')
# def update_habit():

# @put('/user/<userid>')
# def update_user():

########## Interally Used Routes ##########

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')

@route('/restricted')
def restricted():
    username = request.get_cookie("account", secret='some-secret-key')
    if username:
        return template("Hello {{name}}. Welcome back.", name=username)
    else:
        return "You are not logged in. Access denied."

@error(404)
def error404(error):
    return template('404.html',)

run(host='localhost', port=8080, reloader=True)
