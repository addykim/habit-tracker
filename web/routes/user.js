const router = require('express').Router()

router.route('/user')
  .get(function(req, res) {
    // TODO no param => all users
    // TODO param => user id
    res.send('Get user')
  })
  .post(function(req, res) {
    // create user
  })
  .put(function(req, res) {
    // TODO update user
  })

module.exports = router