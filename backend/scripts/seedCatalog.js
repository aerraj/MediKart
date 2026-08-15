const path = require('path')
const mongoose = require('mongoose')
const { requireEnv } = require('../config')

const catalog = require(path.join(__dirname, '..', 'data', 'catalog.json'))

function exactName(value) {
  return new RegExp(`^${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i')
}

async function seedCatalog() {
  await mongoose.connect(requireEnv('MONGO_URI'))
  const database = mongoose.connection.db
  const categories = database.collection('medCategory')
  const products = database.collection('med_items')

  let categoriesInserted = 0
  let productsInserted = 0

  for (const category of catalog.categories) {
    const result = await categories.updateOne(
      { CategoryName: exactName(category.CategoryName) },
      {
        $set: { CategoryName: category.CategoryName },
        $setOnInsert: { _id: category._id },
      },
      { upsert: true },
    )
    categoriesInserted += result.upsertedCount
  }

  for (const product of catalog.products) {
    const { _id, ...fields } = product
    const result = await products.updateOne(
      { $or: [{ _id }, { name: exactName(product.name) }] },
      {
        $set: fields,
        $setOnInsert: { _id },
      },
      { upsert: true },
    )
    productsInserted += result.upsertedCount
  }

  const [wellnessCount, medicinesCount] = await Promise.all([
    products.countDocuments({ CategoryName: exactName('Wellness') }),
    products.countDocuments({ CategoryName: exactName('Medicines') }),
  ])

  return {
    categoriesInserted,
    productsInserted,
    productsUpdated: catalog.products.length - productsInserted,
    wellnessCount,
    medicinesCount,
  }
}

if (require.main === module) {
  seedCatalog()
    .then((summary) => {
      console.log('MediKart catalog seed complete')
      console.table(summary)
    })
    .catch((error) => {
      console.error('Catalog seed failed:', error.message)
      process.exitCode = 1
    })
    .finally(() => mongoose.disconnect())
}

module.exports = { exactName, seedCatalog }
