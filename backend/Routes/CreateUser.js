const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtSecret="medikartisthebestpossibleappavailableforuse"
const axios = require('axios');
require('dotenv').config({ path: './config/config.env' });
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

router.post('/createUser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    body('recaptcha').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password, location, recaptcha } = req.body;

    try {
        // Verify reCAPTCHA
        const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptcha}`);
        
        if (!recaptchaResponse.data.success) {
            return res.status(400).json({ message: 'Recaptcha verification failed!' });
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
        return res.json({success:true,authToken:authToken})
     }
          catch (error) {
       console.log(error)
        res.json({success:false})
    }
})
module.exports=router;

