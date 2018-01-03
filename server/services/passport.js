const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

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