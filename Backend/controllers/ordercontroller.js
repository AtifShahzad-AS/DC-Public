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
// ── Stripe ──
const placeorderstripe = async (req, res) => {
  try {
    const userId = req.userId
    const { items, amount, address } = req.body
    const { origin } = req.headers

    // ── Validate cart is not empty ──
    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" })
    }

    // ── Build line items for Stripe first — before saving order ──
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

    // ── Save order with payment: false ──
    const orderdata = {
      userId,
      items,
      amount,
      address,
      paymentmethod: 'stripe',
      payment:       false,         // not paid yet
      date:          Date.now()
    }

    const neworder = new ordermodel(orderdata)
    await neworder.save()

    // ── Create Stripe session — pass orderId in URLs ──
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

// ── Verify Stripe payment ──
const verifystripe = async (req, res) => {
  try {
    const userId = req.userId
    const { orderId, success } = req.body

    if (success === "true") {
      // ── Payment confirmed — mark as paid and deduct stock ──
      const order = await ordermodel.findById(orderId)

      if (!order) {
        return res.json({ success: false, message: "Order not found" })
      }

      await ordermodel.findByIdAndUpdate(orderId, { payment: true })

      // Deduct stock only after successful payment
      await deductStockOnOrder(order.items)

      // Clear cart
      await usermodel.findByIdAndUpdate(userId, { cartdata: {} })

      res.json({ success: true, message: "Payment successful" })

    } else {
      // ── Payment cancelled or failed — delete the pending order ──
      const order = await ordermodel.findById(orderId)

      if (order) {
        // No need to restore stock since we never deducted it
        await ordermodel.findByIdAndDelete(orderId)
      }

      res.json({ success: false, message: "Payment cancelled" })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Verify Stripe — restore stock if payment failed ──
// const verifystripe = async (req, res) => {
//   try {
//     const userId = req.userId
//     const { orderId, success } = req.body

//     if (success === "true") {
//       await ordermodel.findByIdAndUpdate(orderId, { payment: true })
//       await usermodel.findByIdAndUpdate(userId, { cartdata: {} })
//       res.json({ success: true })
//     } else {
//       // ── Payment failed — restore stock ──
//       const order = await ordermodel.findById(orderId)
//       if (order) {
//         await restoreStockOnCancellation(order.items)
//         await ordermodel.findByIdAndDelete(orderId)
//       }
//       res.json({ success: false })
//     }

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

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

// ── Analytics: monthly revenue + top products ──
export const getAnalytics = async (req, res) => {
  try {
    const allOrders = await ordermodel.find({})
    const paidOrders = allOrders.filter(o => o.status !== 'Cancelled')

    // ── Monthly revenue (last 6 months) — FIXED date logic ──
    const now = new Date()
    const monthlyData = []

    for (let i = 5; i >= 0; i--) {
      // ── Correct way to go back i months ──
      const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const endDate   = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)

      // JS Date handles negative months automatically:
      // new Date(2026, -1, 1) → December 2025 ✓
      // new Date(2026, -2, 1) → November 2025 ✓

      const label = startDate.toLocaleString('en-US', { month: 'short' }) +
                    " '" + String(startDate.getFullYear()).slice(2)

      const monthOrders = paidOrders.filter(o => {
        if (!o.date) return false
        // Handle both timestamp (number) and Date object
        const d = new Date(
          typeof o.date === 'number' ? o.date : Number(o.date)
        )
        if (isNaN(d.getTime())) return false
        return d >= startDate && d < endDate
      })

      const revenue = monthOrders.reduce((sum, o) => sum + (o.amount || 0), 0)

      monthlyData.push({
        label,
        revenue,
        orders:    monthOrders.length,
        startDate: startDate.toISOString(),   // for debugging
        endDate:   endDate.toISOString(),
      })
    }

    // ── Debug — log each month's range and count ──
    monthlyData.forEach(m => {
      console.log(`${m.label}: ${m.orders} orders, revenue ${m.revenue} | ${m.startDate} → ${m.endDate}`)
    })

    //
    // ── Sales by Category ──
// ── Sales by Category ──
const categorySales = {}

paidOrders.forEach(order => {
  if (!order.items || !Array.isArray(order.items)) return
  order.items.forEach(item => {

    // ── FIX: normalize category to consistent casing ──
    // Trim whitespace + capitalize first letter, lowercase rest
    const rawCat = item.category || 'Other'
    const cat = rawCat.trim().charAt(0).toUpperCase() +
                rawCat.trim().slice(1).toLowerCase()

    if (!categorySales[cat]) {
      categorySales[cat] = { category: cat, quantity: 0, revenue: 0 }
    }
    categorySales[cat].quantity += Number(item.quantity) || 1
    categorySales[cat].revenue  += (Number(item.price) || 0) * (Number(item.quantity) || 1)
  })
})

const totalQuantity = Object.values(categorySales)
  .reduce((sum, c) => sum + c.quantity, 0)

const categoryData = Object.values(categorySales)
  .sort((a, b) => b.quantity - a.quantity)
  .slice(0, 6)
  .map(c => ({
    ...c,
    percentage: totalQuantity > 0
      ? Math.round((c.quantity / totalQuantity) * 100)
      : 0
  }))

    // ── Top 5 products ──
    const productSales = {}
    paidOrders.forEach(order => {
      if (!order.items || !Array.isArray(order.items)) return
      order.items.forEach(item => {
        const id = (item.productId || item._id)?.toString()
        if (!id) return
        if (!productSales[id]) {
          productSales[id] = {
            id,
            name:     item.name || 'Unknown',
            quantity: 0,
            revenue:  0,
            image:    item.image || []
          }
        }
        productSales[id].quantity += Number(item.quantity) || 1
        productSales[id].revenue  += (Number(item.price) || 0) * (Number(item.quantity) || 1)
      })
    })

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)

    // ── Status breakdown ──
    const statusBreakdown = {
      'Order Placed':      0,
      'Packing':           0,
      'Shiped':            0,
      'Out for delievery': 0,
      'delievered':        0,
      'Cancelled':         0,
    }
    allOrders.forEach(o => {
      if (statusBreakdown.hasOwnProperty(o.status)) {
        statusBreakdown[o.status]++
      }
    })

    res.json({
      success: true,
      monthlyData,
      topProducts,
      statusBreakdown,categoryData,
    })

  } catch (error) {
    console.log('Analytics error:', error)
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
