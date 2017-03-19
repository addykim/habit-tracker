const router = require('express').Router()

// temporary database
let users = require('../static/data/users.json')

router.route('/user/:userId')
  .get(function(req, res) {
    let userId = req.params.userId
    // temporarily use array index - 1 to get user
    res.send(users[userId-1])
  })
  .post(function(req, res) {
    // create user
  })
  .put(function(req, res) {
    // TODO update user
    // return error if user does not exist
  })

module.exports = router