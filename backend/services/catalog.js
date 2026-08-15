const mongoose = require('mongoose')

function productId(product) {
  return String(product._id || product.id || product.name)
}

async function getCatalog() {
  const database = mongoose.connection.db
  if (!database) throw new Error('Catalog database is unavailable')
  const [products, categories] = await Promise.all([
    database.collection('med_items').find({}).toArray(),
    database.collection('medCategory').find({}).toArray(),
  ])
  return { products, categories }
}

async function priceCart(requestedItems) {
  const { products } = await getCatalog()
  return priceCartFromCatalog(requestedItems, products)
}

function priceCartFromCatalog(requestedItems, products) {
  if (!Array.isArray(requestedItems) || requestedItems.length === 0 || requestedItems.length > 50) {
    const error = new Error('Cart must contain between 1 and 50 items')
    error.status = 400
    throw error
  }
  const byId = new Map(products.map((product) => [productId(product), product]))

  return requestedItems.map((requested) => {
    const id = String(requested.id || '')
    const quantity = Number(requested.qty)
    const product = byId.get(id)
    if (!product) { const error = new Error(`Unknown product: ${id}`); error.status = 400; throw error }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) { const error = new Error('Quantity must be an integer between 1 and 20'); error.status = 400; throw error }
    const options = product.options?.[0] || {}
    const size = String(requested.size || '')
    const unitPrice = Number(options[size])
    if (!size || !Number.isFinite(unitPrice) || unitPrice < 0) { const error = new Error(`Invalid pack size for ${product.name}`); error.status = 400; throw error }
    return { productId: product._id, name: product.name, image: product.img || '', size, quantity, unitPrice, lineTotal: unitPrice * quantity }
  })
}

function summarizeCart(items) {
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)
  const deliveryFee = subtotal >= 499 ? 0 : 49
  return { subtotal, deliveryFee, total: subtotal + deliveryFee }
}

module.exports = { getCatalog, priceCart, priceCartFromCatalog, productId, summarizeCart }
