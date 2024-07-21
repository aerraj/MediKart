const express=require('express');
const router=express.Router();
require('dotenv').config({ path: './config/config.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payment',async(req,res)=>{
    const {products}=req.body;
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name
            },
            unit_amount:(product.price * 100)/product.qty,
        },
        quantity:product.qty
    }));


    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"https://medikartwebsite.vercel.app/myorder",
        cancel_url:"https://medikartwebsite.vercel.app/",
    });
    res.json({id:session.id})
})

module.exports=router;