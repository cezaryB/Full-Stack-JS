const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')


mongoose.connect(keys.dbURI)

const app = express()

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App has started on port ${PORT}`)
})
