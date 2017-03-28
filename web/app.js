const express = require('express')
const request = require('request')

var app = express()

app.use(require('cors')())

app.use('/api/user', require('./routes/user'))
app.use('/api/habit', require('./routes/habit').router)

app.use('/public', express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.send('Hello world!')
})

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('back');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
});

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

// TODO debug
// function restrict(req, res, next) {
//   if (req.session.user) {
//     next();
//   } else {
//     req.session.error = 'Access denied!';
//     res.redirect('/login');
//   }
// }

// TODO debug
// app.get('/restricted', restrict, function(req, res){
  // res.status(401).send('You are not logged in. Access denied')
// })

// TODO debug
// app.use(function(err, req, res, next) {
  // console.error(err.stack)
  // res.status(404).send('404 Not Found');  
// })

app.listen(8080, function() {
  console.log('Listening on port 8080 with CORS-enabled')
})