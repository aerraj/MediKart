const express = require('express')
const authenticate = require('../middleware/auth')
const Order = require('../models/Orders')
const PendingOrder = require('../models/PendingOrder')
const User = require('../models/User')
const { requireEnv } = require('../config')
const { priceCart, summarizeCart } = require('../services/catalog')

const router = express.Router()
const stripeClient = () => require('stripe')(requireEnv('STRIPE_SECRET_KEY'))

router.post('/payment', authenticate, async (req, res, next) => {
  try {
    const [user, items] = await Promise.all([User.findById(req.user.id).select('email'), priceCart(req.body.products)])
    if (!user) return res.status(401).json({ success: false, error: 'Account no longer exists' })
    const totals = summarizeCart(items)
    const pending = await PendingOrder.create({ user: user._id, email: user.email, items, ...totals })
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const session = await stripeClient().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [...items.map((item) => ({ price_data: { currency: 'inr', product_data: { name: item.name }, unit_amount: Math.round(item.unitPrice * 100) }, quantity: item.quantity })), ...(totals.deliveryFee ? [{ price_data: { currency: 'inr', product_data: { name: 'Delivery' }, unit_amount: totals.deliveryFee * 100 }, quantity: 1 }] : [])],
      mode: 'payment',
      customer_email: user.email,
      metadata: { pendingOrderId: pending.id, userId: String(user._id) },
      success_url: `${frontendUrl}/myorder?payment=success`,
      cancel_url: `${frontendUrl}/?payment=cancelled`,
    })
    return res.json({ id: session.id })
  } catch (error) { return next(error) }
})

async function stripeWebhook(req, res, next) {
  try {
    const event = stripeClient().webhooks.constructEvent(req.body, req.get('stripe-signature'), requireEnv('STRIPE_WEBHOOK_SECRET'))
    if (event.type === 'checkout.session.completed' && event.data.object.payment_status === 'paid') {
      const session = event.data.object
      const pending = await PendingOrder.findById(session.metadata?.pendingOrderId)
      if (pending && !pending.completedAt) {
        await Order.findOneAndUpdate({ stripeSessionId: session.id }, { user: pending.user, email: pending.email, items: pending.items, subtotal: pending.subtotal, deliveryFee: pending.deliveryFee, total: pending.total, status: 'paid', paymentMethod: 'stripe', stripeSessionId: session.id }, { upsert: true, new: true, setDefaultsOnInsert: true })
        pending.completedAt = new Date()
        await pending.save()
      }
    }
    return res.json({ received: true })
  } catch (error) {
    if (error.type === 'StripeSignatureVerificationError') return res.status(400).json({ success: false, error: 'Invalid webhook signature' })
    return next(error)
  }
}

module.exports = { router, stripeWebhook }
