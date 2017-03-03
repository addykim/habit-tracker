from bottle import route, run, template, view

@route('/')
@view('hello.html')
def index():
    return dict()

run(host='localhost', port=8080)
