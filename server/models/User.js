const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  socialId: String,
  credits: { type: Number, default: 0 }
})

const User = mongoose.model('users', userSchema)
