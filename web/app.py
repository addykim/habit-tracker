from bottle import abort, error, get, post, put, request, route, run, static_file, template, view

TEMP_HABIT = {
    "habitid": 1, 
    "name": "Programming", 
    "startdate": "2017-05-03",
    "userid": 3
    }

TEMP_USER = {
    "userid": 1, 
    "name": 
    "Jane Kim", 
    "email": "jane@gmail.com"
    } 

########## User Facing Routes ##########
@route('/')
@view('index.html')
def index():
    return dict()

########## Utility Functions ##########
# TODO remove hardcoded login answer
def check_login(username=None, password=None):
    if username == 'Meow':
        if password == 'Meow':
            return True
    return False

########## API ##########
@get('/habit/<habitid>')
def get_habit(habitid):
    return TEMP_HABIT

@get('/user/<userid>')
def get_user(userid):
    return TEMP_USER

@post('/habit')
def create_habit():
    name = request.forms.get('name')
    goal_streak = request.forms.get('goal_streak')
    # swap out today's date for habit_started date"
    # add github issue to handle different date zones
    habit_started = "today"
    print('created habit')

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

@put('/habit/<habitid>')
def update_habit(habitid):
    print('updated habit streak count')

@put('/user/<userid>')
def update_user():
    print('updated user')

########## Interally Used Routes ##########

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')

@route('/dist/<filename>')
def dist_static(filename):
    return static_file(filename, root='./dist')

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
