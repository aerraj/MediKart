const express = require('express')
const cors = require('cors')
const dbConnection = require('./database/dbConnection')
const { requireEnv } = require('./config')
const payment = require('./Routes/Payment')

requireEnv('JWT_SECRET')
const app = express()
const allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map((value) => value.trim())

app.disable('x-powered-by')
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.post('/api/stripe/webhook', (req, res, next) => { dbConnection().then(() => next()).catch(next) }, express.raw({ type: 'application/json' }), payment.stripeWebhook)
app.use(express.json({ limit: '100kb' }))
app.use((req, res, next) => { dbConnection().then(() => next()).catch(next) })
app.get('/', (req, res) => res.json({ service: 'MediKart API', status: 'ok' }))
app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/DisplayData'))
app.use('/api', require('./Routes/OrderData'))
app.use('/api', payment.router)
app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }))
app.use((error, req, res, next) => {
  console.error(error)
  if (res.headersSent) return next(error)
  return res.status(error.status || 500).json({ success: false, error: error.status ? error.message : 'Internal server error' })
})

if (require.main === module) {
  const port = Number(process.env.PORT) || 5000
  dbConnection().then(() => app.listen(port, () => console.log(`Server started listening on ${port}`))).catch((error) => { console.error(error); process.exitCode = 1 })
}

module.exports = app
