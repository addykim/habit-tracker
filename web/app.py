from bottle import error, get, post, request, route, run, static_file, template, view

########## User Facing Routes ##########
@route('/')
@view('hello.html')
def index():
    return dict()

# Refactor this to a template
@get('/login') # or @route('/login')
def login():
    return '''
        <form action="/login" method="post">
            Username: <input name="username" type="text" />
            Password: <input name="password" type="password" />
            <input value="Login" type="submit" />
        </form>
    '''

@post('/login') # or @route('/login', method='POST')
def do_login():
    username = request.forms.get('username')
    password = request.forms.get('password')
    if check_login(username, password):
        return "<p>Your login information was correct.</p>"
    else:
        return "<p>Login failed.</p>"

# TODO remove hardcoded login answer
def check_login(username=None, password=None):
    if username == 'Meow':
        if password == 'Meow':
            return True
    return False

########## Interally Used Routes ##########

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')

# TODO use the fancy template
@error(404)
def error404(error):
    return 'Nothing here, sorry'

run(host='localhost', port=8080)
