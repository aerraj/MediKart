const jwt = require('jsonwebtoken')
const { requireEnv } = require('../config')

function authenticate(req, res, next) {
  const header = req.get('authorization') || ''
  const cookies = Object.fromEntries((req.get('cookie') || '').split(';').map((part) => part.trim().split('=').map(decodeURIComponent)).filter((pair) => pair.length === 2))
  const token = header.startsWith('Bearer ') ? header.slice(7) : cookies.medikart_session
  if (!token) return res.status(401).json({ success: false, error: 'Authentication required' })

  try {
    const payload = jwt.verify(token, requireEnv('JWT_SECRET'))
    req.user = payload.user
    return next()
  } catch {
    return res.status(401).json({ success: false, error: 'Session is invalid or expired' })
  }
}

module.exports = authenticate
