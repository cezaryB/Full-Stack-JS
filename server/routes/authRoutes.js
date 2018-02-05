const passport = require('passport')

const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
})

const facebookAuth = passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
})

module.exports = app => {

  app.get('/', (req, res, next) => {
    res.send({ message: 'message send from the router' })
  })

  app.get('/auth/google', googleAuth)

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/surveys')
  })

  app.get('/auth/facebook', facebookAuth)

  app.get('/auth/facebook/callback', passport.authenticate('facebook'))

  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
    res.send({ message: 'You are logged out'})
  })

  app.get('/api/current_user', (req, res, next) => {
    res.send(req.user)
  })

}
