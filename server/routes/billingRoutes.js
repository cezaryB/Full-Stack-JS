const config = require('../config/keys')
const stripe = require('stripe')(config.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res, next) => {

      const { id: token } = req.body
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '5$ for 5 credits',
        source: token
      })

      req.user.credits += 5
      const updatedUser = await req.user.save()
      return res.send({ user: updatedUser })
      
  })
}

