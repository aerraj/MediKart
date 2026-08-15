const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config', 'config.env') })

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} must be configured`)
  return value
}

module.exports = { requireEnv }
