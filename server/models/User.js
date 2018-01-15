const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  socialId: String
})

const User = mongoose.model('users', userSchema)
