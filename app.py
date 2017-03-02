from bottle import route, run, template

@route('/')
def index():
    print('Hello')
    return template('hey')

@route('/hello/<name>')
def index(name):
    return template('<b>Hello {{name}}</b>!', name=name)

run(host='localhost', port=8080)