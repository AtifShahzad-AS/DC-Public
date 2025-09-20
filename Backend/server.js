import express from "express"
import cors from "cors"
import 'dotenv/config' 
import connectdb from "./config/mongodb.js";
import connectcloud from "./config/cloudinary.js";
import userrouter from "./routes/userroute.js";


// appconfig
const app=express()
const  port=process.env.PORT || 4000;
connectdb()
connectcloud()
// middleware
app.use(express.json())

app.use(cors())

//api endpoints
app.use('/api/user',userrouter)


app.get('/',(req,res)=>{
    res.send('api working')
})

app.listen(port,()=>console.log('server started on port:'+ port))