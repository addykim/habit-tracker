const router = require('express').Router()

router.use(function(req, res, next) {
  console.log(req.method, req.url)
  next()
})

// makeshift database
let habits = require('../static/data/user1.json')
.concat(require('../static/data/user2.json'))

router.route('/:habitId')
  .get(function(req, res) {
    // temporarily get habit based on index, disregarding id
    let habitId = req.params.habitId
    // input validation
    res.send(habits[habitId-1])
  })
  .post(function(req, res) {
    // TODO create habit
    // Probably need to create a route to get the latest habit id
  })
  .put(function(req, res) {
    //TODO update habit
  })

module.exports = router