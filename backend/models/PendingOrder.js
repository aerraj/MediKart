const mongoose = require('mongoose')

const PendingItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.Mixed, required: true },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  lineTotal: { type: Number, required: true, min: 0 },
}, { _id: false })

const PendingOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  email: { type: String, required: true, lowercase: true },
  items: { type: [PendingItemSchema], required: true },
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true },
  completedAt: Date,
}, { timestamps: true })

PendingOrderSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 })
module.exports = mongoose.model('pending_order', PendingOrderSchema)
