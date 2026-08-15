const express = require('express')
const { getCatalog } = require('../services/catalog')

const router = express.Router()

async function displayData(req, res, next) {
  try {
    const { products, categories } = await getCatalog()
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
    return res.json([products, categories])
  } catch (error) { return next(error) }
}

router.get('/displayData', displayData)
router.post('/displayData', displayData)
module.exports = router
