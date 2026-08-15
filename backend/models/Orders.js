const mongoose = require('mongoose')

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.Mixed, required: true },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  lineTotal: { type: Number, required: true, min: 0 },
}, { _id: false })

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true },
  email: { type: String, required: true, lowercase: true, index: true },
  items: { type: [OrderItemSchema], required: true },
  subtotal: { type: Number, required: true, min: 0 },
  deliveryFee: { type: Number, required: true, min: 0, default: 0 },
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['placed', 'paid', 'cancelled', 'refunded'], default: 'placed' },
  paymentMethod: { type: String, enum: ['cod', 'stripe'], required: true },
  stripeSessionId: { type: String, unique: true, sparse: true },
}, { timestamps: true })

module.exports = mongoose.model('order_v2', OrderSchema)
