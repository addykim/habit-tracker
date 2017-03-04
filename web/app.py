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

@route('/restricted')
def restricted():
    abort(401, "Sorry, access denied.")

@error(404)
def error404(error):
    return template('404.html',)

run(host='localhost', port=8080, reloader=True)
