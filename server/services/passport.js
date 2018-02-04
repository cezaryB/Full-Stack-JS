const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
})

const googleOptions = {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}

const googleLogin =  new GoogleStrategy(googleOptions, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ socialId: profile.id })
    if (existingUser) {
      return done(null, existingUser)
    }
    const user = await new User({ socialId: profile.id }).save()
    done(null, user)
  }
  catch (err) {
    return done(err, false)
  }
})

passport.use(googleLogin)

