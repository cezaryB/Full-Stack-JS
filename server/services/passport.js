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
    .then(user => {
      if (user) done(null, user)
      return done(null, false)
    })
    .catch(err => done(err, false))
})

const googleOptions = {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}

const googleLogin =  new GoogleStrategy(googleOptions, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id})
    .then(user => {
      if (user) {
        return done(null, user)
      }
      new User({ googleId: profile.id })
        .save()
        .then(user => done(null, user))
        .catch(err => done(err, false))
    })
    .catch(err => {
      return done(err, false)
    })
})

passport.use(googleLogin)
