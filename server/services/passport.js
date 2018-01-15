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

const googleLogin =  new GoogleStrategy(googleOptions, (accessToken, refreshToken, profile, done) => {
  User.findOne({ socialId: profile.id})
    .then(user => {
      if (user) {
        return done(null, user)
      }
      new User({ socialId: profile.id })
        .save()
        .then(user => done(null, user))
        .catch(err => done(err, false))
    })
    .catch(err => {
      return done(err, false)
    })
})

passport.use(googleLogin)

