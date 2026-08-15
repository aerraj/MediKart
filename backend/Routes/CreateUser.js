const express = require('express')
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User')
const { requireEnv } = require('../config')

const router = express.Router()
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false, message: { success: false, error: 'Too many authentication attempts. Please try again later.' } })
const issueToken = (user) => jwt.sign({ user: { id: user.id } }, requireEnv('JWT_SECRET'), { expiresIn: process.env.JWT_TTL || '7d' })
const publicUser = (user) => ({ name: user.name, email: user.email, avatar: user.avatar })
const sessionCookie = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', maxAge: 7 * 24 * 60 * 60 * 1000, path: '/' }
const signIn = (res, user) => { res.cookie('medikart_session', issueToken(user), sessionCookie); return res.json({ success: true, user: publicUser(user) }) }

router.post('/createUser', authLimiter, [body('email').normalizeEmail().isEmail(), body('name').trim().isLength({ min: 2, max: 80 }), body('password').isLength({ min: 8, max: 128 }), body('recaptcha').custom((value) => !process.env.RECAPTCHA_SECRET_KEY || Boolean(value))], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() })
  const { email, name, password, location, recaptcha } = req.body
  try {
    if (await User.exists({ email })) return res.status(409).json({ success: false, error: 'An account with this email already exists' })
    if (process.env.RECAPTCHA_SECRET_KEY) {
      const { data } = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, { params: { secret: process.env.RECAPTCHA_SECRET_KEY, response: recaptcha } })
      if (!data.success) return res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' })
    }
    const user = await User.create({ name, password: await bcrypt.hash(password, 12), email, location })
    return res.status(201).json({ success: true, user: publicUser(user) })
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, error: 'An account with this email already exists' })
    return next(error)
  }
})

router.post('/loginUser', authLimiter, [body('email').normalizeEmail().isEmail(), body('password').isLength({ min: 8, max: 128 })], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() })
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.password || !await bcrypt.compare(req.body.password, user.password)) return res.status(401).json({ success: false, error: 'Incorrect email or password' })
    return signIn(res, user)
  } catch (error) { return next(error) }
})

router.post('/auth/google', authLimiter, async (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID) return res.status(503).json({ success: false, error: 'Google authentication is not configured' })
  try {
    const ticket = await new OAuth2Client(process.env.GOOGLE_CLIENT_ID).verifyIdToken({ idToken: req.body.credential, audience: process.env.GOOGLE_CLIENT_ID })
    const payload = ticket.getPayload()
    if (!payload.email_verified) return res.status(401).json({ success: false, error: 'Google email is not verified' })
    const email = payload.email.toLowerCase()
    let user = await User.findOne({ email })
    if (!user) user = await User.create({ name: payload.name || email.split('@')[0], email, avatar: payload.picture || '', authProvider: 'google' })
    else if (!user.avatar && payload.picture) { user.avatar = payload.picture; await user.save() }
    return signIn(res, user)
  } catch (error) {
    if (error.message?.includes('Token used too late') || error.message?.includes('Wrong recipient')) return res.status(401).json({ success: false, error: 'Google authentication failed' })
    return next(error)
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('medikart_session', { httpOnly: true, secure: sessionCookie.secure, sameSite: sessionCookie.sameSite, path: '/' })
  return res.json({ success: true })
})

module.exports = router
