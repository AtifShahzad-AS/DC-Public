import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
//global
const currency="inr"
const delieverycharges=10
import Stripe from "stripe"
import crypto from "crypto";
import qs from "qs";
const merchant_id = "YOUR_MERCHANT_ID";
const merchant_key = "YOUR_MERCHANT_KEY";
const return_url = "http://localhost:5173/verify?gateway=payfast";
const cancel_url = "http://localhost:5173/verify?gateway=payfast";
const notify_url = "https://your-backend.com/api/order/payfast_notify";


//gateway init
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
//place order using cod
const placeorder= async (req,res)=>{
    
    try {
        const {userId,items,amount,address}=req.body
        const orderdata= {
            userId,
            items,
            amount,
            address,
            paymentmethod:'cod',
            payment:false,
            date:Date.now()
        }
        const neworder= new ordermodel(orderdata)
        await neworder.save()

        await usermodel.findByIdAndUpdate(userId,{cartdata:{}})
        res.json({success:true,message:'Order Placed'})

    } 
    catch (error) 
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
   
}


//place order using stripe
const placeorderstripe= async (req,res)=>{
try {
        const {userId,items,amount,address}=req.body
        const {origin}=req.headers;
        const orderdata= {
            userId,
            items,
            amount,
            address,
            paymentmethod:'stripe',
            payment:false,
            date:Date.now()
        }
        const neworder= new ordermodel(orderdata)
        await neworder.save()

        const line_items=items.map((item)=>({
           price_data:{
            currency:currency,
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100
           },
           quantity:item.quantity
        }))
        line_items.push({
            price_data:{
            currency:currency,
            product_data:{
                name:"Delievery Charges"
            },
            unit_amount:delieverycharges * 100
           },
           quantity:1
        })
        const session= await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${neworder._id}`,
            line_items,
            mode:'payment'
        })

        res.json({success:true,session_url:session.url})

    } 
    catch (error) 
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}


//verify stripe
const verifystripe= async (req,res)=>{
    try
    {
    const {orderId,success,userId}=req.body
    if(success === "true"){
        await ordermodel.findByIdAndUpdate(orderId,{payment:true})
        await usermodel.findByIdAndUpdate(userId,{cartdata:{}})
        res.json({success:true})
    }
    else{
        await ordermodel.findOneAndDelete(orderId)
        res.json({success:false})
    }
}
     catch (error) 
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//all order data for admin paanel
const allorders= async (req,res)=>{
    try {
        const orders= await ordermodel.find({})
    res.json({success:true,orders})
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
    
}
//payfast
 const placeOrderPayFast = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // create order in DB
    const newOrder = await ordermodel.create({
      userId,
      items,
      amount,
      address,
      paymentmethod: "payfast",
      payment: false,
      date: Date.now(),
    });

    const data = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,
      amount: amount,
      item_name: "Order Payment",
    };

    // Generate signature
    const signature = crypto
      .createHash("md5")
      .update(qs.stringify(data))
      .digest("hex");

    const paymentUrl =
      "https://www.payfast.co.za/eng/process?" +
      qs.stringify({ ...data, signature });

    res.json({
      success: true,
      payment_url: paymentUrl,
      orderId: newOrder._id,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
 //verifypf
    const verifyPayFast = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;

    if (success === "true") {
      await ordermodel.findByIdAndUpdate(orderId, { payment: true });
      await usermodel.findByIdAndUpdate(userId, { cartdata: {} });
      res.json({ success: true });
    } else {
      await ordermodel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};


//user order data for frontend
const userorders= async (req,res)=>{
    try {
         const {userId}= req.body
    const orders= await ordermodel.find({userId})
    res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.messsage})
    }


}
  

//update order status from admin panel
const updatestatus= async (req,res)=>{
try {
    const {orderId,status}=req.body
    await ordermodel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status updated"})
    
} catch (error) {
        console.log(error)
        res.json({success:false,message:error.messsage})
    }
}
export {placeorder,placeorderstripe,allorders,userorders,updatestatus,verifystripe,placeOrderPayFast,verifyPayFast}