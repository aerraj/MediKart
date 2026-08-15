const express = require('express')
const authenticate = require('../middleware/auth')
const Order = require('../models/Orders')
const User = require('../models/User')
const { priceCart, summarizeCart } = require('../services/catalog')

const router = express.Router()

router.post('/orderData', authenticate, async (req, res, next) => {
  try {
    const [user, items] = await Promise.all([User.findById(req.user.id).select('email'), priceCart(req.body.products)])
    if (!user) return res.status(401).json({ success: false, error: 'Account no longer exists' })
    const totals = summarizeCart(items)
    const order = await Order.create({ user: user._id, email: user.email, items, ...totals, status: 'placed', paymentMethod: 'cod' })
    return res.status(201).json({ success: true, orderId: order.id })
  } catch (error) { return next(error) }
})

router.get('/myOrderData', authenticate, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).lean()
    return res.json({ success: true, orders })
  } catch (error) { return next(error) }
})

router.post('/myOrderData', authenticate, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).lean()
    return res.json({ success: true, orders })
  } catch (error) { return next(error) }
})

module.exports = router
