import test from 'node:test'
import assert from 'node:assert/strict'
import { cartReducer } from '../src/components/cartReducer.js'

const product = {
  type: 'ADD',
  id: 'daily-multivitamin',
  name: 'Daily Multivitamin',
  image: '/products/daily-multivitamin-tablets.webp',
  price: 299,
  unitPrice: 299,
  qty: 1,
  size: '30 tablets',
}

test('adding the same product selection increases quantity instead of adding a row', () => {
  const once = cartReducer([], product)
  const twice = cartReducer(once, product)

  assert.equal(twice.length, 1)
  assert.equal(twice[0].qty, 2)
  assert.equal(twice[0].price, 598)
})

test('adding several units aggregates quantity and total price', () => {
  const once = cartReducer([], product)
  const updated = cartReducer(once, { ...product, qty: 2, price: 598 })

  assert.equal(updated.length, 1)
  assert.equal(updated[0].qty, 3)
  assert.equal(updated[0].price, 897)
})

test('different pack sizes remain separate cart rows', () => {
  const standard = cartReducer([], product)
  const withLargePack = cartReducer(standard, {
    ...product,
    price: 499,
    unitPrice: 499,
    size: '60 tablets',
  })

  assert.equal(withLargePack.length, 2)
  assert.deepEqual(withLargePack.map((item) => item.size), ['30 tablets', '60 tablets'])
})
