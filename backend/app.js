const express = require("express")
const app = express()
const dbConnection = require("./database/dbConnection")
const cors=require('cors')
require('dotenv').config({ path: './config/config.env' });
const port= process.env.PORT
dbConnection();

app.use(cors())
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

app.get("/", (req, res)=>{
  res.send("Hello")
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

app.listen(port, ()=>{
  console.log(`Server started listening on ${port}`)
})



