


// import ordermodel from "../models/ordermodel.js";
// import productmodel from "../models/productmodel.js";
// import usermodel from "../models/usermodel.js";
// import { deductStockOnOrder,restoreStockOnCancellation } from "./inventoryController.js";

// const currency = "pkr"
// const delieverycharges = 10

// import Stripe from "stripe"
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// // ── COD ──
// const placeorder = async (req, res) => {
//   try {
//     const { items, amount, address } = req.body
//     const userId = req.userId
// //chk stock

//     // ── Validate stock before placing order ──
//     const outOfStockItems = []

//     for (const item of items) {
//       const product = await productmodel.findById(item.productId || item._id)
//       if (!product || product.stock < item.quantity) {
//         outOfStockItems.push(product?.name || "Unknown product")
//       }
//     }

//     if (outOfStockItems.length > 0) {
//       return res.json({
//         success: false,
//         message: `These items are out of stock: ${outOfStockItems.join(", ")}. Please update your cart.`,
//         outOfStockItems
//       })
//     }


//     const orderdata = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentmethod: 'cod',
//       payment:       false,
//       date:          Date.now()
//     }

//     const neworder = new ordermodel(orderdata)
//     await neworder.save()

//     // ── Deduct stock for each item ──
//     await deductStockOnOrder(items)

//     await usermodel.findByIdAndUpdate(userId, { cartdata: {} })
//     res.json({ success: true, message: 'Order Placed' })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// const placeorderstripe = async (req, res) => {
//   try {
//     const userId = req.userId
//     const { items, amount, address } = req.body
//     const { origin } = req.headers

//     // ── Validate cart is not empty ──
//     if (!items || items.length === 0) {
//       return res.json({ success: false, message: "Cart is empty" })
//     }

//     // ── Build line items for Stripe first — before saving order ──
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency:     currency,
//         product_data: { name: item.name },
//         unit_amount:  item.price * 100
//       },
//       quantity: item.quantity
//     }))

//     line_items.push({
//       price_data: {
//         currency:     currency,
//         product_data: { name: "Delivery Charges" },
//         unit_amount:  delieverycharges * 100
//       },
//       quantity: 1
//     })

//     // ── Save order with payment: false ──
//     const orderdata = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentmethod: 'stripe',
//       payment:       false,         // not paid yet
//       date:          Date.now()
//     }

//     const neworder = new ordermodel(orderdata)
//     await neworder.save()

//     // ── Create Stripe session — pass orderId in URLs ──
//     const session = await stripe.checkout.sessions.create({
//       success_url: `${origin}/verify?success=true&orderId=${neworder._id}`,
//       cancel_url:  `${origin}/verify?success=false&orderId=${neworder._id}`,
//       line_items,
//       mode: 'payment'
//     })

//     res.json({ success: true, session_url: session.url })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }



// const verifystripe = async (req, res) => {
//   try {
//     const userId = req.userId
//     const { orderId, success } = req.body

//     const order = await ordermodel.findById(orderId)

//     if (!order) {
//       return res.json({ success: false, message: "Order not found" })
//     }

//     // ✅ CHECK STOCK USING ORDER ITEMS
//     const outOfStockItems = []

//     for (const item of order.items) {
//       const product = await productmodel.findById(item.productId || item._id)

//       if (!product || product.stock < item.quantity) {
//         outOfStockItems.push(product?.name || "Unknown product")
//       }
//     }

//     if (outOfStockItems.length > 0) {
//       return res.json({
//         success: false,
//         message: `Out of stock: ${outOfStockItems.join(", ")}`
//       })
//     }

//     if (success === "true") {

//       await ordermodel.findByIdAndUpdate(orderId, { payment: true })

//       // ✅ deduct stock
//       await deductStockOnOrder(order.items)

//       // ✅ clear cart
//       await usermodel.findByIdAndUpdate(userId, { cartdata: {} })

//       return res.json({ success: true })

//     } else {
//       await ordermodel.findByIdAndDelete(orderId)
//       return res.json({ success: false })
//     }

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }


// const allorders = async (req, res) => {
//   try {
//     const orders = await ordermodel.find({})
//     res.json({ success: true, orders })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ── User: their orders ──
// const userorders = async (req, res) => {
//   try {
//     const userId = req.userId
//     const orders = await ordermodel.find({ userId })
//     res.json({ success: true, orders })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ── Update order status ──
// // When admin marks order as cancelled → restore stock
// const updatestatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body

//     await ordermodel.findByIdAndUpdate(orderId, { status })

//     // ── If cancelled by admin — restore stock ──
//     if (status === 'Cancelled') {
//       const order = await ordermodel.findById(orderId)
//       if (order) {
//         await restoreStockOnCancellation(order.items)
//       }
//     }

//     res.json({ success: true, message: "Status updated" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }


// export const getAnalytics = async (req, res) => {
//   try {
//     const allOrders = await ordermodel.find({})

//     // ── Only count delivered/active orders for revenue — exclude cancelled ──
//     const paidOrders = allOrders.filter(
//       o => o.payment === true && o.status !== 'Cancelled'
//     )

//     // ── Monthly revenue (last 6 months) ──
//     const now = new Date()
//     const monthlyData = []

//     for (let i = 5; i >= 0; i--) {
//       const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
//       const endDate   = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)

//       const label = startDate.toLocaleString('en-US', { month: 'short' }) +
//                     " '" + String(startDate.getFullYear()).slice(2)

//       const monthOrders = paidOrders.filter(o => {
//         if (!o.date) return false
//         const d = new Date(typeof o.date === 'number' ? o.date : Number(o.date))
//         if (isNaN(d.getTime())) return false
//         return d >= startDate && d < endDate
//       })

//       const revenue = monthOrders.reduce((sum, o) => sum + (o.amount || 0), 0)

//       monthlyData.push({
//         label,
//         revenue,
//         orders: monthOrders.length,
//       })
//     }

//     // ── Sales by Category ──
//     // Fix: fetch product categories from DB since items don't store category
//     const categorySales = {}

//     for (const order of paidOrders) {
//       if (!order.items || !Array.isArray(order.items)) continue

//       for (const item of order.items) {
//         // ── Get category from product in DB — reliable source of truth ──
//         const productId = item.productId || item._id
//         let category = 'Other'

//         if (productId) {
//           const product = await productmodel
//             .findById(productId)
//             .select('category')
//             .lean()

//           if (product?.category) {
//             // Normalize: capitalize first letter
//             const raw = product.category.trim()
//             category  = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
//           }
//         }

//         if (!categorySales[category]) {
//           categorySales[category] = { category, quantity: 0, revenue: 0 }
//         }
//         categorySales[category].quantity += Number(item.quantity) || 1
//         categorySales[category].revenue  +=
//           (Number(item.price) || 0) * (Number(item.quantity) || 1)
//       }
//     }

//     const totalQuantity = Object.values(categorySales)
//       .reduce((sum, c) => sum + c.quantity, 0)

//     const categoryData = Object.values(categorySales)
//       .sort((a, b) => b.quantity - a.quantity)
//       .slice(0, 6)
//       .map(c => ({
//         ...c,
//         percentage: totalQuantity > 0
//           ? Math.round((c.quantity / totalQuantity) * 100)
//           : 0
//       }))

//     // ── Top 5 products ──
//     const productSales = {}
//     paidOrders.forEach(order => {
//       if (!order.items || !Array.isArray(order.items)) return
//       order.items.forEach(item => {
//         const id = (item.productId || item._id)?.toString()
//         if (!id) return
//         if (!productSales[id]) {
//           productSales[id] = {
//             id,
//             name:     item.name || 'Unknown',
//             quantity: 0,
//             revenue:  0,
//             image:    item.image || []
//           }
//         }
//         productSales[id].quantity += Number(item.quantity) || 1
//         productSales[id].revenue  +=
//           (Number(item.price) || 0) * (Number(item.quantity) || 1)
//       })
//     })

//     const topProducts = Object.values(productSales)
//       .sort((a, b) => b.quantity - a.quantity)
//       .slice(0, 5)

//     // ── Status breakdown — all orders including cancelled ──
//     const statusBreakdown = {
//       'Order Placed':      0,
//       'Packing':           0,
//       'Shiped':            0,
//       'Out for delievery': 0,
//       'delievered':        0,
//       'Cancelled':         0,
//     }
//     allOrders.forEach(o => {
//       if (statusBreakdown.hasOwnProperty(o.status)) {
//         statusBreakdown[o.status]++
//       }
//     })

//     res.json({
//       success: true,
//       monthlyData,
//       topProducts,
//       statusBreakdown,
//       categoryData,
//     })

//   } catch (error) {
//     console.log('Analytics error:', error)
//     res.json({ success: false, message: error.message })
//   }
// }
// export {
//   placeorder,
//   placeorderstripe,
//   allorders,
//   userorders,
//   updatestatus,
//   verifystripe
// }

import ordermodel from "../models/ordermodel.js";
import productmodel from "../models/productmodel.js";
import usermodel from "../models/usermodel.js";
import { deductStockOnOrder, restoreStockOnCancellation } from "./inventoryController.js";
import settingsmodel from "../models/settingsModel.js"

const currency = "pkr"
const getDeliveryFee = async (orderAmount) => {
  try {
    const settings = await settingsmodel.findOne({}).lean()
    const fee           = settings?.deliveryFee       ?? 200
    const freeAbove     = settings?.freeDeliveryAbove ?? 3000
    return orderAmount >= freeAbove ? 0 : fee
  } catch {
    return 200 // fallback
  }}

import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// ── Helper: enrich items with category from DB ──
const enrichItemsWithCategory = async (items) => {
  return await Promise.all(
    items.map(async (item) => {
      const productId = item.productId || item._id
      if (!productId) return item
      const product = await productmodel
        .findById(productId)
        .select('category')
        .lean()
      return {
        ...item,
        category: product?.category || item.category || 'Other'
      }
    })
  )
}

// ── COD ──
// const placeorder = async (req, res) => {
//   try {
//     const { items, amount, address } = req.body
//     const userId = req.userId

//     // ── Validate stock before placing order ──
//     const outOfStockItems = []
//     for (const item of items) {
//       const product = await productmodel.findById(item.productId || item._id)
//       if (!product || product.stock < item.quantity) {
//         outOfStockItems.push(product?.name || "Unknown product")
//       }
//     }
//     if (outOfStockItems.length > 0) {
//       return res.json({
//         success: false,
//         message: `These items are out of stock: ${outOfStockItems.join(", ")}. Please update your cart.`,
//         outOfStockItems
//       })
//     }

//     // ── Enrich items with category from DB ──
//     const enrichedItems = await enrichItemsWithCategory(items)

//     const orderdata = {
//       userId,
//       items:         enrichedItems,   // ← now has category on each item
//       amount,
//       address,
//       paymentmethod: 'cod',
//       payment:       false,
//       date:          Date.now()
//     }

//     const neworder = new ordermodel(orderdata)
//     await neworder.save()

//     await deductStockOnOrder(enrichedItems)
//     await usermodel.findByIdAndUpdate(userId, { cartdata: {} })
//     res.json({ success: true, message: 'Order Placed' })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }
// ── COD ──
const placeorder = async (req, res) => {
  try {
    const { items, amount, address } = req.body
    const userId = req.userId
 
    // ── Validate stock ──
    const outOfStockItems = []
    for (const item of items) {
      const product = await productmodel.findById(item.productId || item._id)
      if (!product || product.stock < item.quantity) {
        outOfStockItems.push(product?.name || "Unknown product")
      }
    }
    if (outOfStockItems.length > 0) {
      return res.json({
        success: false,
        message: `These items are out of stock: ${outOfStockItems.join(", ")}. Please update your cart.`,
        outOfStockItems
      })
    }
 
    // ── Enrich items with category ──
    const enrichedItems = await enrichItemsWithCategory(items)
 
    // ── amount sent from frontend already includes delivery fee from Carttotal ──
    const orderdata = {
      userId,
      items:         enrichedItems,
      amount,
      address,
      paymentmethod: 'cod',
      payment:       false,
      date:          Date.now()
    }
 
    const neworder = new ordermodel(orderdata)
    await neworder.save()
 
    await deductStockOnOrder(enrichedItems)
    await usermodel.findByIdAndUpdate(userId, { cartdata: {} })
    res.json({ success: true, message: 'Order Placed' })
 
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Stripe ──
// const placeorderstripe = async (req, res) => {
//   try {
//     const userId = req.userId
//     const { items, amount, address } = req.body
//     const { origin } = req.headers

//     if (!items || items.length === 0) {
//       return res.json({ success: false, message: "Cart is empty" })
//     }

//     const line_items = items.map((item) => ({
//       price_data: {
//         currency:     currency,
//         product_data: { name: item.name },
//         unit_amount:  item.price * 100
//       },
//       quantity: item.quantity
//     }))

//     line_items.push({
//       price_data: {
//         currency:     currency,
//         product_data: { name: "Delivery Charges" },
//         unit_amount:  delieverycharges * 100
//       },
//       quantity: 1
//     })

//     // ── Enrich items with category from DB ──
//     const enrichedItems = await enrichItemsWithCategory(items)

//     const orderdata = {
//       userId,
//       items:         enrichedItems,   // ← now has category on each item
//       amount,
//       address,
//       paymentmethod: 'stripe',
//       payment:       false,
//       date:          Date.now()
//     }

//     const neworder = new ordermodel(orderdata)
//     await neworder.save()

//     const session = await stripe.checkout.sessions.create({
//       success_url: `${origin}/verify?success=true&orderId=${neworder._id}`,
//       cancel_url:  `${origin}/verify?success=false&orderId=${neworder._id}`,
//       line_items,
//       mode: 'payment'
//     })

//     res.json({ success: true, session_url: session.url })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }
// ── Stripe ──
const placeorderstripe = async (req, res) => {
  try {
    const userId = req.userId
    const { items, amount, address } = req.body
    const { origin } = req.headers
 
    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" })
    }
 
    // ── Get delivery fee dynamically from DB ──
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const fee      = await getDeliveryFee(subtotal)
 
    // ── Build Stripe line items ──
    const line_items = items.map((item) => ({
      price_data: {
        currency:     currency,
        product_data: { name: item.name },
        unit_amount:  item.price * 100
      },
      quantity: item.quantity
    }))
 
    // Only add delivery line if fee > 0 (not free delivery)
    if (fee > 0) {
      line_items.push({
        price_data: {
          currency:     currency,
          product_data: { name: "Delivery Charges" },
          unit_amount:  fee * 100
        },
        quantity: 1
      })
    }
 
    // ── Enrich items with category ──
    const enrichedItems = await enrichItemsWithCategory(items)
 
    const orderdata = {
      userId,
      items:         enrichedItems,
      amount:        subtotal + fee,  // recalculated on backend
      address,
      paymentmethod: 'stripe',
      payment:       false,
      date:          Date.now()
    }
 
    const neworder = new ordermodel(orderdata)
    await neworder.save()
 
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

    const order = await ordermodel.findById(orderId)
    if (!order) {
      return res.json({ success: false, message: "Order not found" })
    }

    // ── Check stock using order items ──
    const outOfStockItems = []
    for (const item of order.items) {
      const product = await productmodel.findById(item.productId || item._id)
      if (!product || product.stock < item.quantity) {
        outOfStockItems.push(product?.name || "Unknown product")
      }
    }
    if (outOfStockItems.length > 0) {
      return res.json({
        success: false,
        message: `Out of stock: ${outOfStockItems.join(", ")}`
      })
    }

    if (success === "true") {
      await ordermodel.findByIdAndUpdate(orderId, { payment: true })
      await deductStockOnOrder(order.items)
      await usermodel.findByIdAndUpdate(userId, { cartdata: {} })
      return res.json({ success: true })
    } else {
      await ordermodel.findByIdAndDelete(orderId)
      return res.json({ success: false })
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
// const updatestatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body

//     // ── If cancelling — restore stock BEFORE updating status ──
//     if (status === 'Cancelled') {
//       const order = await ordermodel.findById(orderId)
//       if (order) {
//         await restoreStockOnCancellation(order.items)
//       }
//     }

//     await ordermodel.findByIdAndUpdate(orderId, { status })
//     res.json({ success: true, message: "Status updated" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }
const updatestatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    if (status === 'Cancelled') {
      const order = await ordermodel.findById(orderId)
      if (order) await restoreStockOnCancellation(order.items)
    }

    // ── Auto mark COD as paid when delivered ──
    const updateData = { status }
    if (status === 'delievered') {
      updateData.payment = true
    }

    await ordermodel.findByIdAndUpdate(orderId, updateData)
    res.json({ success: true, message: "Status updated" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Analytics ──
export const getAnalytics = async (req, res) => {
  try {
    const allOrders = await ordermodel.find({})

    // ── Only paid + non-cancelled orders count for revenue ──
    // const paidOrders = allOrders.filter(
    //   o => o.payment === true && o.status !== 'Cancelled'
    // )
    const paidOrders = allOrders.filter(
  o => (o.payment === true || o.status === 'delievered') && o.status !== 'Cancelled'
)

    // ── Monthly revenue (last 6 months) ──
    const now = new Date()
    const monthlyData = []

    for (let i = 5; i >= 0; i--) {
      const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const endDate   = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)

      const label = startDate.toLocaleString('en-US', { month: 'short' }) +
                    " '" + String(startDate.getFullYear()).slice(2)

      const monthOrders = paidOrders.filter(o => {
        if (!o.date) return false
        const d = new Date(typeof o.date === 'number' ? o.date : Number(o.date))
        if (isNaN(d.getTime())) return false
        return d >= startDate && d < endDate
      })

      const revenue = monthOrders.reduce((sum, o) => sum + (o.amount || 0), 0)

      monthlyData.push({ label, revenue, orders: monthOrders.length })
    }

    // ── Sales by Category ──
    // Try item.category first (new orders have it) — fallback to DB lookup
    const categorySales = {}

    for (const order of paidOrders) {
      if (!order.items || !Array.isArray(order.items)) continue

      for (const item of order.items) {
        let category = 'Other'

        // ── New orders: category already stored on item ──
        if (item.category) {
          const raw = item.category.trim()
          category  = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()

        // ── Old orders: look up from DB ──
        } else {
          const productId = item.productId || item._id
          if (productId) {
            const product = await productmodel
              .findById(productId)
              .select('category')
              .lean()
            if (product?.category) {
              const raw = product.category.trim()
              category  = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
            }
          }
        }

        if (!categorySales[category]) {
          categorySales[category] = { category, quantity: 0, revenue: 0 }
        }
        categorySales[category].quantity += Number(item.quantity) || 1
        categorySales[category].revenue  +=
          (Number(item.price) || 0) * (Number(item.quantity) || 1)
      }
    }

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
        productSales[id].revenue  +=
          (Number(item.price) || 0) * (Number(item.quantity) || 1)
      })
    })

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)

    // ── Status breakdown — all orders ──
    // const statusBreakdown = {
    //   'Order Placed':      0,
    //   'Packing':           0,
    //   'Shiped':            0,
    //   'Out for delievery': 0,
    //   'delievered':        0,
    //   'Cancelled':         0,
    // }
    // ── Status breakdown — dynamic, counts ALL statuses ──
const statusBreakdown = {}

// Initialize your display statuses at 0
const displayStatuses = [
  'Order Placed', 'Packing', 'Shiped',
  'Out for delievery', 'delievered', 'Cancelled'
]
displayStatuses.forEach(s => { statusBreakdown[s] = 0 })

// Count all orders — including any with unexpected status values
allOrders.forEach(o => {
  const status = o.status?.trim() || 'Order Placed'
  if (statusBreakdown.hasOwnProperty(status)) {
    statusBreakdown[status]++
  } else {
    // Unknown status — add it so nothing is lost
    statusBreakdown[status] = (statusBreakdown[status] || 0) + 1
  }
})

// Log for debugging
console.log('statusBreakdown:', statusBreakdown)
console.log('Total counted:', Object.values(statusBreakdown).reduce((s, v) => s + v, 0))
console.log('Total in DB:', allOrders.length)

  

    res.json({
      success: true,
      monthlyData,
      topProducts,
      statusBreakdown,
      categoryData,
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