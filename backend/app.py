from bottle import route, run, template

@route('/')
def indexpage():
    print('Hello')
    return template('<b>hey Listen</b', )

@route('/hello/<name>')
def index(name):
    return template('<b>Hello {{name}}</b>!', name=name)

run(host='localhost', port=8080)