const test = require('node:test')
const assert = require('node:assert/strict')
const express = require('express')
const jwt = require('jsonwebtoken')
const request = require('supertest')

process.env.JWT_SECRET = 'test-secret-that-is-long-enough-for-tests'
const authenticate = require('../middleware/auth')
const { priceCartFromCatalog, summarizeCart } = require('../services/catalog')

const catalog = [{ _id: 'medicine-1', name: 'Trusted medicine', img: '/medicine.webp', options: [{ '10 tablets': 125 }] }]

test('server catalog price replaces any client-supplied price', () => {
  const [item] = priceCartFromCatalog([{ id: 'medicine-1', size: '10 tablets', qty: 2, price: 1 }], catalog)
  assert.equal(item.unitPrice, 125)
  assert.equal(item.lineTotal, 250)
})

test('delivery and total are computed on the server', () => {
  assert.deepEqual(summarizeCart([{ lineTotal: 250 }]), { subtotal: 250, deliveryFee: 49, total: 299 })
  assert.deepEqual(summarizeCart([{ lineTotal: 500 }]), { subtotal: 500, deliveryFee: 0, total: 500 })
})

test('cart pricing rejects unknown products and invalid quantities', () => {
  assert.throws(() => priceCartFromCatalog([{ id: 'missing', size: 'x', qty: 1 }], catalog), /Unknown product/)
  assert.throws(() => priceCartFromCatalog([{ id: 'medicine-1', size: '10 tablets', qty: 0 }], catalog), /Quantity/)
})

test('auth middleware rejects anonymous requests and accepts signed httpOnly cookie tokens', async () => {
  const app = express()
  app.get('/private', authenticate, (req, res) => res.json({ userId: req.user.id }))
  await request(app).get('/private').expect(401)
  const token = jwt.sign({ user: { id: 'user-123' } }, process.env.JWT_SECRET, { expiresIn: '1h' })
  const response = await request(app).get('/private').set('Cookie', `medikart_session=${token}`).expect(200)
  assert.equal(response.body.userId, 'user-123')
})
