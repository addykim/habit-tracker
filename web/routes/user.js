const express = require('express')
const habits = require('./habit')

const router = express.Router()
const authRouter = express.Router()

router.use(function(req, res, next) {
  console.log(req.method, req.url)
  next()
})

// authRouter.use(require('../authenticate'))

function getUser(userId) {
  return users[userId-1]
}

// temporary database
let users = require('../static/data/users.json')

router.route('/:userId')
  .get(function(req, res) {
    let userId = req.params.userId
    // temporarily use array index - 1 to get user
    res.send(getUser(userId))
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
    let userId = req.params.userId
    // TODO input validation
    let habit_ids = getUser(userId).habit_ids
    console.log(habit_ids)

    let userHabits = []
    // TODO convert to lambda
    habit_ids.forEach(function(habit_id) {
      console.log(habit_id)
      userHabits.push(habits.getHabit(habit_id))
    })
    res.send(userHabits)
  })

module.exports = router