const test = require('node:test')
const assert = require('node:assert/strict')
const express = require('express')
const fs = require('node:fs')
const jwt = require('jsonwebtoken')
const path = require('node:path')
const request = require('supertest')

process.env.JWT_SECRET = 'test-secret-that-is-long-enough-for-tests'
const authenticate = require('../middleware/auth')
const catalogData = require('../data/catalog.json')
const { mergeCatalog, priceCartFromCatalog, summarizeCart } = require('../services/catalog')

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

test('bundled catalog has complete, unique, locally imaged category inventory', () => {
  const frontendCatalog = require('../../frontend/public/catalog.json')
  assert.deepEqual(frontendCatalog, catalogData)
  const wellness = catalogData.products.filter((product) => product.CategoryName === 'Wellness')
  const medicines = catalogData.products.filter((product) => product.CategoryName === 'Medicines')
  assert.ok(wellness.length >= 10)
  assert.ok(medicines.length >= 10)
  assert.equal(new Set(catalogData.products.map((product) => product._id)).size, catalogData.products.length)
  assert.equal(new Set(catalogData.products.map((product) => product.name.toLowerCase())).size, catalogData.products.length)

  for (const product of catalogData.products) {
    assert.ok(product.name)
    assert.ok(product.description)
    assert.ok(product.img.startsWith('/products/'))
    assert.ok(Object.keys(product.options?.[0] || {}).length)
    const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', product.img.replace(/^\/+/, ''))
    assert.ok(fs.existsSync(imagePath), `Missing product image: ${product.img}`)
  }
})

test('bundled catalog fills missing database categories without duplicating stored products', () => {
  const storedProduct = { ...catalogData.products[0], description: 'Database version' }
  const merged = mergeCatalog([storedProduct], [{ _id: 'wellness-db', CategoryName: 'wellness' }])
  assert.equal(merged.products.length, catalogData.products.length)
  assert.equal(merged.products.find((product) => product._id === storedProduct._id).description, 'Database version')
  assert.equal(merged.categories.filter((category) => category.CategoryName.toLowerCase() === 'wellness').length, 1)
})
