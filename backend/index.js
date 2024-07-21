const express = require("express")
const app = express()
const dbConnection = require("./database/dbConnection")
const cors=require('cors')
require('dotenv').config({ path: './config/config.env' });
const port= process.env.PORT
dbConnection();

app.use(cors()) 
app.use(cors({
  origin: 'https://medikartwebsite.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");// react app address
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
})

app.get("/", (req, res)=>{
  res.send("Hello Backend is working fine. :)")
})
app.get("/api/payment", (req, res)=>{
  res.send("Hello Payment is working fine. :)")
})
app.use(express.json())
//routes
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.use('/api',require("./Routes/Payment"))

app.listen(port, ()=>{
  console.log(`Server started listening on ${port}`)
})



