import express from "express"
import cors from "cors"
import 'dotenv/config' 
import connectdb from "./config/mongodb.js";
import connectcloud from "./config/cloudinary.js";
import userrouter from "./routes/userroute.js";
import productrouter from "./routes/productroute.js";


// appconfig
const app=express()
const  port=process.env.PORT || 4000;
connectdb()
connectcloud()
// middleware
app.use(express.json())

app.use(cors())

//api endpoints
app.use('/api/user',userrouter);
app.use('/api/product',productrouter)


app.get('/',(req,res)=>{
    res.send('api working')
})

app.listen(port,()=>console.log('server started on port:'+ port))