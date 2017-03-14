import json
from bottle import abort, error, get, post, put, request, route, run, static_file, template, view

########## Utility Functions ##########
# TODO remove hardcoded login answer
def check_login(username=None, password=None):
    if username == 'Meow':
        if password == 'Meow':
            return True
    return False

def read_json_as_string(path):
    output = ''
    for line in open(path):
        output = output + line
    return output

########## DEBUG CONSTANTS ##########
TEMP_HABIT = {
    "habitid": 1, 
    "name": "Programming", 
    "startdate": "2017-05-03",
    "userid": 3
    }

TEMP_USER = read_json_as_string('./static/data/users.json')

########## User Facing Routes ##########
@route('/')
@view('index.html')
def index():
    return {'title':'Index'}

########## API ##########
@get('/habit/<habitid>')
def get_habit(habitid):
    return TEMP_HABIT

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

@post('/habit')
def create_habit():
    # name = request.forms.get('habitName')
    # goal_streak = request.forms.get('goalStreak')
    # swap out today's date for habit_started date"
    # add github issue to handle different date zones
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

# @route('/static/<filename:path>')
# def server_static(filename):
    # return static_file(filename, root='./static/')

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
