// fixOldOrders.js — run once with: node fixOldOrders.js
import mongoose from "mongoose"
import ordermodel from "./models/ordermodel.js"
import 'dotenv/config'

// await mongoose.connect(process.env.LOCAL_MONGO_URI)
   await mongoose.connect(`${process.env.LOCAL_MONGO_URI}/fyp`)


const orders = await ordermodel.find({})
let fixed = 0

for (const order of orders) {
  const updates = {}

  // Fix 1 — COD delivered orders should have payment: true
  if (
    order.paymentmethod === 'cod' &&
    order.status === 'delievered' &&
    order.payment === false
  ) {
    updates.payment = true
  }

  // Fix 2 — Stripe orders that were verified should have payment: true
  // If status is beyond "Order Placed" it means payment went through
  if (
    order.paymentmethod === 'stripe' &&
    order.payment === false &&
    ['Packing', 'Shiped', 'Out for delievery', 'delievered'].includes(order.status)
  ) {
    updates.payment = true
  }

  // Fix 3 — Cancelled orders should have payment: false
  if (order.status === 'Cancelled') {
    updates.payment = false
  }

  if (Object.keys(updates).length > 0) {
    await ordermodel.findByIdAndUpdate(order._id, updates)
    fixed++
    console.log(`Fixed order ${order._id}: ${JSON.stringify(updates)}`)
  }
}

console.log(`\nDone — fixed ${fixed} of ${orders.length} orders`)
await mongoose.disconnect()