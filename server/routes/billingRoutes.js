const config = require('../config/keys')
const stripe = require('stripe')(config.stripeSecretKey)

module.exports = app => {
  app.post('/api/stripe', (req, res, next) => {
    const { id: token } = req.body
    stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5$ for 5 credits',
      source: token
    })
  })
}