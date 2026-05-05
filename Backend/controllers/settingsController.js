import settingsmodel from "../models/settingsModel.js"
import adminmodel    from "../models/adminModel.js"
import cloudinary    from "cloudinary"
import bcrypt        from "bcrypt"
import fs            from "fs"

// ── Get settings (used by frontend too for logo/name) ──
export const getSettings = async (req, res) => {
  try {
    let settings = await settingsmodel.findOne({})

    // Create default if none exists
    if (!settings) {
      settings = await settingsmodel.create({})
    }

    res.json({ success: true, settings })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Update branding (logo + store name) ──
export const updateBranding = async (req, res) => {
  try {
    const { storeName, tagline } = req.body

    const updateData = {}
    if (storeName) updateData.storeName = storeName
    if (tagline)   updateData.tagline   = tagline

    // Upload new logo if provided
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "branding"
      })
      updateData.logo = result.secure_url
      fs.unlinkSync(req.file.path)
    }

    const settings = await settingsmodel.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    )

    res.json({ success: true, message: "Branding updated", settings })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Toggle payment method ──
export const togglePayment = async (req, res) => {
  try {
    const { method } = req.body
    // method = 'cod' or 'stripe'

    if (!['cod', 'stripe'].includes(method)) {
      return res.json({ success: false, message: "Invalid payment method" })
    }

    const settings = await settingsmodel.findOne({})
    if (!settings) {
      return res.json({ success: false, message: "Settings not found" })
    }

    // Cannot disable both at once
    const otherMethod = method === 'cod' ? 'stripe' : 'cod'
    if (settings.payments[method] && !settings.payments[otherMethod]) {
      return res.json({
        success: false,
        message: "At least one payment method must remain enabled"
      })
    }

    settings.payments[method] = !settings.payments[method]
    await settings.save()

    res.json({
      success: true,
      message: `${method.toUpperCase()} ${settings.payments[method] ? 'enabled' : 'disabled'}`,
      payments: settings.payments
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin change own password ──
export const changeOwnPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const adminId = req.admin._id

    if (!currentPassword || !newPassword) {
      return res.json({ success: false, message: "All fields required" })
    }

    if (newPassword.length < 6) {
      return res.json({ success: false, message: "Password must be at least 6 characters" })
    }

    const admin = await adminmodel.findById(adminId).select("+password")
    if (!admin) return res.json({ success: false, message: "Admin not found" })

    const isMatch = await bcrypt.compare(currentPassword, admin.password)
    if (!isMatch) {
      return res.json({ success: false, message: "Current password is incorrect" })
    }

    const isSame = await bcrypt.compare(newPassword, admin.password)
    if (isSame) {
      return res.json({ success: false, message: "New password must be different" })
    }

    const salt     = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(newPassword, salt)
    await admin.save()

    res.json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Super admin reset another admin's password ──
export const resetAdminPassword = async (req, res) => {
  try {
    // Only superadmin can call this (enforced by superadminonly middleware)
    const { adminId, newPassword } = req.body

    if (!adminId || !newPassword) {
      return res.json({ success: false, message: "adminId and newPassword are required" })
    }

    if (newPassword.length < 6) {
      return res.json({ success: false, message: "Password must be at least 6 characters" })
    }

    const admin = await adminmodel.findById(adminId)
    if (!admin) return res.json({ success: false, message: "Admin not found" })

    // Superadmin cannot reset their own password from this route
    if (admin._id.toString() === req.admin._id.toString()) {
      return res.json({ success: false, message: "Use Change Password to update your own password" })
    }

    const salt     = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(newPassword, salt)
    await admin.save()

    res.json({ success: true, message: `Password reset for ${admin.name}` })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Get all admins for super admin password management ──
export const getAdminsForReset = async (req, res) => {
  try {
    const admins = await adminmodel
      .find({ role: 'manager' })
      .select("name email role isActive createdAt")
      .sort({ createdAt: -1 })

    res.json({ success: true, admins })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}