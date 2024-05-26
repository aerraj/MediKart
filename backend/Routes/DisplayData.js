const express=require('express');
const router=express.Router();

router.post('/displayData',async(req,res)=>{
    try {
        res.send([global.med_items,global.medCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

module.exports=router;