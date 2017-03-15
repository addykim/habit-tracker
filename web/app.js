const express = require('express')
const request = require('request')

var app = express()

app.use('/api', require('./routes/user'))
app.use('/api', require('./routes/habit'))

app.use('/public', express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.send('Hello world!')
})

function checkAuthenticated(res) {
  res.status(401).send('You are not logged in. Access denied')
}

function notFound(res) {
  res.status(404).send('404 Not Found');
}

app.listen(8080, function() {
  console.log('Listening on port 8080')
})