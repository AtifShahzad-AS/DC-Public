import express from "express"
import cors from "cors"
import 'dotenv/config' 
import connectdb from "./config/mongodb.js";
import connectcloud from "./config/cloudinary.js";
import userrouter from "./routes/userroute.js";
import productrouter from "./routes/productroute.js";
import cartrouter from "./routes/cartroute.js";
import orderrouter from "./routes/orderroutes.js";
import googleAuthRoute from "./routes/googleAuthRoute.js";
import path from "path";
import adminrouter from "./routes/adminRoute.js"
import { seedSuperAdmin } from "./controllers/adminController.js"
// import custom from "./routes/userroute.js";
import wishlistRoute from "./routes/wishlistRoute.js"
import slideRouter from "./routes/slideRoute.js"
import inventoryrouter from "./routes/inventoryRoute.js"
// import productmodel from "./models/productmodel.js"
import reviewrouter from "./routes/reviewRoute.js"
import settingsrouter from "./routes/settingsRoute.js"
import bannerrouter from "./routes/bannerRoute.js"
import contactRoute from "./routes/contactRoute.js";
import categoryRouter from "./routes/categoryRoute.js"


// appconfig
const app=express()
const  port=process.env.PORT || 4000;
connectdb()
seedSuperAdmin()
// connectcloud()
// middleware
app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


app.use(cors())

//api endpoints
app.use('/api/user',userrouter);
app.use('/api/product',productrouter)
app.use('/api/cart',cartrouter)
app.use('/api/order',orderrouter)
app.use('/api/auth', googleAuthRoute);
app.use("/api/wishlist",wishlistRoute)
app.use('/api/customer', userrouter);
app.use('/api/admin', adminrouter)
app.use("/api/slide", slideRouter)
app.use("/api/inventory", inventoryrouter)
app.use("/api/review", reviewrouter)
app.use("/api/settings", settingsrouter)
app.use("/api/banner", bannerrouter)
app.use("/api/contact", contactRoute);
app.use("/api/category", categoryRouter)

app.get('/',(req,res)=>{
    res.send('api working')
})

// app.listen(port,()=>console.log('server started on port:'+ port))
app.listen(port, "0.0.0.0", () => {
  console.log("Server started on port:", port);
});