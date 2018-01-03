const passport = require('passport')

const googleAuth = passport.authenticate('google', { 
  scope: ['profile', 'email']
})

module.exports = app => {

  app.get('/', (req, res, next) => {
    res.send({ message: 'message send from the router' })
  })

  app.get('/auth/google', googleAuth)

  app.get('/auth/google/callback', passport.authenticate('google'))

}

