const router = require('express').Router()

router.route('/habit')
  .get(function(req, res) {
    res.send('Get habit')
    // TODO get habit
  })
  .post(function(req, res) {
    // TODO create habit
  })
  .put(function(req, res) {
    //TODO update habit
  })

module.exports = router