const express = require('express')

const router = express.Router()
const authRouter = express.Router()

router.use(function(req, res, next) {
  console.log(req.method, req.url)
  next()
})

// authRouter.use(require('../authenticate'))


// temporary database
let users = require('../static/data/users.json')

router.route('/:userId')
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

// TODO switch this to authRouter once authentication is implemented
router.route('/:userId/habits')
  .get(function(req, res) {
    // TODO lol temporarily hardcoded`
    if (req.params.userId === 1)
      res.send(require('../static/data/user1.json'))
    if (req.params.userId === 2)
      res.send(require('../static/data/user2.json'))
  })

module.exports = router