const mongoose = require('mongoose')
const { requireEnv } = require('../config')

let connectionPromise
function dbConnection() {
  if (!connectionPromise) connectionPromise = mongoose.connect(requireEnv('MONGO_URI')).catch((error) => { connectionPromise = undefined; throw error })
  return connectionPromise
}

module.exports = dbConnection
