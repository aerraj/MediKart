const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config({ path: './config/config.env' });
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const jwtSecret = process.env.JWT_SECRET || "medikartisthebestpossibleappavailableforuse";
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/createUser', [
    body('email').isEmail(),
    body('name').isLength({ min: 2 }),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
    body('recaptcha').custom((value) => !RECAPTCHA_SECRET || Boolean(value))
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password, location, recaptcha } = req.body;

    try {
        // Verify reCAPTCHA
        if (RECAPTCHA_SECRET) {
            const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptcha}`);
            if (!recaptchaResponse.data.success) {
                return res.status(400).json({ message: 'Recaptcha verification failed!' });
            }
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);

        // Create the user
        await User.create({
            name,
            password: secPassword,
            email,
            location
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
router.post('/loginUser',[ body('email').isEmail(), body('password','Incorrect Password').isLength({ min: 5 })
],
async(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
       let userData= await User.findOne({email})
        if (!userData) {
            return res.status(400).json({ errors: "Try logging in with correct Email and Password." })
        }
        const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare){
            return res.status(400).json({ errors: "Try logging in with correct Email and Password." })
        }
        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({success:true,authToken:authToken,user:{name:userData.name,email:userData.email,avatar:userData.avatar}})
     }
          catch (error) {
       console.log(error)
        res.json({success:false})
    }
})

router.post('/auth/google', async (req, res) => {
    if (!process.env.GOOGLE_CLIENT_ID) return res.status(503).json({ success: false, error: 'Google authentication is not configured' });
    try {
        const ticket = await googleClient.verifyIdToken({ idToken: req.body.credential, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        if (!payload.email_verified) return res.status(401).json({ success: false, error: 'Google email is not verified' });
        let user = await User.findOne({ email: payload.email.toLowerCase() });
        if (!user) user = await User.create({ name: payload.name || payload.email.split('@')[0], email: payload.email, avatar: payload.picture || '', authProvider: 'google' });
        else if (!user.avatar && payload.picture) { user.avatar = payload.picture; await user.save(); }
        const authToken = jwt.sign({ user: { id: user.id } }, jwtSecret, { expiresIn: '7d' });
        return res.json({ success: true, authToken, user: { name: user.name, email: user.email, avatar: user.avatar } });
    } catch (error) {
        console.error('Google authentication failed:', error.message);
        return res.status(401).json({ success: false, error: 'Google authentication failed' });
    }
});
module.exports=router;
