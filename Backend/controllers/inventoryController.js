import productmodel from "../models/productmodel.js"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

// ── Send out of stock email only ──
const sendOutOfStockEmail = async (product) => {
  try {
    await transporter.sendMail({
      from:    process.env.ADMIN_EMAIL,
      to:      process.env.ADMIN_EMAIL,
      subject: `🚨 Out of Stock — ${product.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
          <div style="background:#dc2626;color:#fff;padding:16px 20px;border-radius:8px;margin-bottom:20px">
            <h2 style="margin:0;font-size:18px">🚨 Out of Stock Alert</h2>
          </div>
          <p style="color:#374151;font-size:14px">The following product is now <strong>completely out of stock</strong>:</p>
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:16px 0">
            <p style="margin:0 0 6px;font-size:14px"><strong>Product:</strong> ${product.name}</p>
            <p style="margin:0 0 6px;font-size:14px"><strong>Category:</strong> ${product.category}</p>
            <p style="margin:0;font-size:14px"><strong>Stock:</strong> <span style="color:#dc2626;font-weight:bold">0 units</span></p>
          </div>
          <p style="color:#6b7280;font-size:13px">Please restock this item immediately to avoid losing sales.</p>
          <p style="color:#9ca3af;font-size:11px;margin-top:24px">LuxeHome Admin System · Automated Alert</p>
        </div>
      `,
    })
    console.log(`📧 Out of stock email sent for: ${product.name}`)
  } catch (err) {
    console.log("Email error:", err.message)
  }
}

// ── Get full inventory ──
export const getInventory = async (req, res) => {
  try {
    const products = await productmodel
      .find({})
      .select("name category stock lowStockAlert price image isActive alertSent")
      .sort({ stock: 1 })

    const lowStock   = products.filter(p => p.stock > 0 && p.stock <= p.lowStockAlert)
    const outOfStock = products.filter(p => p.stock === 0)
    const healthy    = products.filter(p => p.stock > p.lowStockAlert)

    res.json({
      success: true,
      products,
      stats: {
        total:      products.length,
        lowStock:   lowStock.length,
        outOfStock: outOfStock.length,
        healthy:    healthy.length,
      }
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Update stock ──
export const updateStock = async (req, res) => {
  try {
    const { productId, stock, lowStockAlert } = req.body

    if (!productId) return res.json({ success: false, message: "productId required" })

    const current = await productmodel.findById(productId)
    if (!current) return res.json({ success: false, message: "Product not found" })

    const newStock = parseInt(stock)
    const updateData = { stock: newStock }

    if (lowStockAlert !== undefined) {
      updateData.lowStockAlert = parseInt(lowStockAlert)
    }

    // If restocking above threshold — reset alertSent flag
    const threshold = lowStockAlert !== undefined
      ? parseInt(lowStockAlert)
      : current.lowStockAlert

    if (newStock > threshold) {
      updateData.alertSent = false
    }

    const product = await productmodel.findByIdAndUpdate(
      productId, updateData, { new: true }
    )

    // Out of stock — send email once
    if (product.stock === 0 && !current.alertSent) {
      await sendOutOfStockEmail(product)
      await productmodel.findByIdAndUpdate(productId, { alertSent: true })
    }

    res.json({ success: true, message: "Stock updated", product })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Auto deduct stock on order — called from order controller ──
export const deductStockOnOrder = async (items) => {
  try {
    for (const item of items) {
      const id = item.productId || item._id

      const product = await productmodel.findByIdAndUpdate(
        id,
        { $inc: { stock: -(item.quantity || 1) } },
        { new: true }
      )

      if (!product) continue

      // Out of stock — send email once per cycle
      if (product.stock <= 0 && !product.alertSent) {
        await productmodel.findByIdAndUpdate(id, {
          stock:     0,
          alertSent: true,
        })
        await sendOutOfStockEmail(product)
      }
    }
  } catch (err) {
    console.log("Stock deduction error:", err.message)
  }
}

// ── Get low stock alerts for dashboard ──
export const getLowStockAlerts = async (req, res) => {
  try {
    const products = await productmodel
      .find({ $expr: { $lte: ["$stock", "$lowStockAlert"] } })
      .select("name category stock lowStockAlert image")
      .sort({ stock: 1 })

    res.json({ success: true, products, count: products.length })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// ── Add this to inventoryController.js ──

// ── Restore stock when order cancelled or payment failed ──
export const restoreStockOnCancellation = async (items) => {
  try {
    for (const item of items) {
      const id = item.productId || item._id

      const product = await productmodel.findByIdAndUpdate(
        id,
        { $inc: { stock: item.quantity || 1 } },
        { new: true }
      )

      if (!product) continue

      // If restocked above threshold — reset alertSent so future alerts work
      if (product.stock > product.lowStockAlert) {
        await productmodel.findByIdAndUpdate(id, { alertSent: false })
      }

      console.log(`♻️ Stock restored for: ${product.name} (+${item.quantity || 1})`)
    }
  } catch (err) {
    console.log("Stock restore error:", err.message)
  }
}