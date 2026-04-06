// import ordermodel from "../models/ordermodel.js";
// import usermodel from "../models/usermodel.js";
// //global
// import {
//   deductStockOnOrder,
//   restoreStockOnCancellation
// } from "./inventoryController.js"
// const currency="pkr"
// const delieverycharges=10
// import Stripe from "stripe"
// import crypto from "crypto";
// import qs from "qs";
// const merchant_id = "YOUR_MERCHANT_ID";
// const merchant_key = "YOUR_MERCHANT_KEY";
// const return_url = "http://localhost:5173/verify?gateway=payfast";
// const cancel_url = "http://localhost:5173/verify?gateway=payfast";
// const notify_url = "https://your-backend.com/api/order/payfast_notify";


// //gateway init
// const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
// //place order using cod
// const placeorder= async (req,res)=>{
    
//     try {
//         const {items,amount,address}=req.body
//         const userId = req.userId;
//         const orderdata= {
//             userId,
//             items,
//             amount,
//             address,
//             paymentmethod:'cod',
//             payment:false,
//             date:Date.now()
//         }

    

//         const neworder= new ordermodel(orderdata)
//         await neworder.save()

//         await usermodel.findByIdAndUpdate(userId,{cartdata:{}})
//         res.json({success:true,message:'Order Placed'})

//     } 
//     catch (error) 
//     {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
   
// }


// //place order using stripe
// const placeorderstripe= async (req,res)=>{
// try { 
//         const userId=req.userId;

//         const {items,amount,address}=req.body
//         const {origin}=req.headers;
//         const orderdata= {
//             userId,
//             items,
//             amount,
//             address,
//             paymentmethod:'stripe',
//             payment:false,
//             date:Date.now()
//         }
//         const neworder= new ordermodel(orderdata)
//         await neworder.save()

//         const line_items=items.map((item)=>({
//            price_data:{
//             currency:currency,
//             product_data:{
//                 name:item.name
//             },
//             unit_amount:item.price*100
//            },
//            quantity:item.quantity
//         }))
//         line_items.push({
//             price_data:{
//             currency:currency,
//             product_data:{
//                 name:"Delievery Charges"
//             },
//             unit_amount:delieverycharges * 100
//            },
//            quantity:1
//         })
//         const session= await stripe.checkout.sessions.create({
//             success_url:`${origin}/verify?success=true&orderId=${neworder._id}`,
//             cancel_url:`${origin}/verify?success=false&orderId=${neworder._id}`,
//             line_items,
//             mode:'payment'
//         })

//         res.json({success:true,session_url:session.url})

//     } 
//     catch (error) 
//     {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
    
// }


// //verify stripe
// const verifystripe= async (req,res)=>{
//     try
//     {
//         const userId=req.userId;
//     const {orderId,success}=req.body
//     if(success === "true"){
//         await ordermodel.findByIdAndUpdate(orderId,{payment:true})
//         await usermodel.findByIdAndUpdate(userId,{cartdata:{}})
//         res.json({success:true})
//     }
//     else{
//         await ordermodel.findOneAndDelete(orderId)
//         res.json({success:false})
//     }
// }
//      catch (error) 
//     {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }
// //all order data for admin paanel
// const allorders= async (req,res)=>{
//     try {
//         const orders= await ordermodel.find({})
//     res.json({success:true,orders})
//     } catch (error) {
//          console.log(error)
//         res.json({success:false,message:error.message})
//     }
    
// }


// //user order data for frontend
// const userorders= async (req,res)=>{
//     try {
//          const userId= req.userId;
//     const orders= await ordermodel.find({userId})
//     res.json({success:true,orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.messsage})
//     }


// }
  

// //update order status from admin panel
// const updatestatus= async (req,res)=>{
// try {
//     const {orderId,status}=req.body
//     await ordermodel.findByIdAndUpdate(orderId,{status})
//         res.json({success:true,message:"Status updated"})
    
// } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.messsage})
//     }
// }
// export {placeorder,placeorderstripe,allorders,userorders,updatestatus,verifystripe}



import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import { deductStockOnOrder,restoreStockOnCancellation } from "./inventoryController.js";

const currency = "pkr"
const delieverycharges = 10

import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// ── COD ──
const placeorder = async (req, res) => {
  try {
    const { items, amount, address } = req.body
    const userId = req.userId

    const orderdata = {
      userId,
      items,
      amount,
      address,
      paymentmethod: 'cod',
      payment:       false,
      date:          Date.now()
    }

    const neworder = new ordermodel(orderdata)
    await neworder.save()

    // ── Deduct stock for each item ──
    await deductStockOnOrder(items)

    await usermodel.findByIdAndUpdate(userId, { cartdata: {} })
    res.json({ success: true, message: 'Order Placed' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Stripe ──
const placeorderstripe = async (req, res) => {
  try {
    const userId = req.userId
    const { items, amount, address } = req.body
    const { origin } = req.headers

    const orderdata = {
      userId,
      items,
      amount,
      address,
      paymentmethod: 'stripe',
      payment:       false,
      date:          Date.now()
    }

    const neworder = new ordermodel(orderdata)
    await neworder.save()

    // ── Deduct stock when stripe session is created ──
    // Note: stock is deducted here optimistically
    // If payment fails, verifystripe will handle refund of stock
    await deductStockOnOrder(items)

    const line_items = items.map((item) => ({
      price_data: {
        currency:     currency,
        product_data: { name: item.name },
        unit_amount:  item.price * 100
      },
      quantity: item.quantity
    }))

    line_items.push({
      price_data: {
        currency:     currency,
        product_data: { name: "Delivery Charges" },
        unit_amount:  delieverycharges * 100
      },
      quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${neworder._id}`,
      cancel_url:  `${origin}/verify?success=false&orderId=${neworder._id}`,
      line_items,
      mode: 'payment'
    })

    res.json({ success: true, session_url: session.url })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Verify Stripe — restore stock if payment failed ──
const verifystripe = async (req, res) => {
  try {
    const userId = req.userId
    const { orderId, success } = req.body

    if (success === "true") {
      await ordermodel.findByIdAndUpdate(orderId, { payment: true })
      await usermodel.findByIdAndUpdate(userId, { cartdata: {} })
      res.json({ success: true })
    } else {
      // ── Payment failed — restore stock ──
      const order = await ordermodel.findById(orderId)
      if (order) {
        await restoreStockOnCancellation(order.items)
        await ordermodel.findByIdAndDelete(orderId)
      }
      res.json({ success: false })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: all orders ──
const allorders = async (req, res) => {
  try {
    const orders = await ordermodel.find({})
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── User: their orders ──
const userorders = async (req, res) => {
  try {
    const userId = req.userId
    const orders = await ordermodel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Update order status ──
// When admin marks order as cancelled → restore stock
const updatestatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    await ordermodel.findByIdAndUpdate(orderId, { status })

    // ── If cancelled by admin — restore stock ──
    if (status === 'Cancelled') {
      const order = await ordermodel.findById(orderId)
      if (order) {
        await restoreStockOnCancellation(order.items)
      }
    }

    res.json({ success: true, message: "Status updated" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export {
  placeorder,
  placeorderstripe,
  allorders,
  userorders,
  updatestatus,
  verifystripe
}