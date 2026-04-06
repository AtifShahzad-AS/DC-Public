import adminmodel from "../models/adminModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"

export const seedSuperAdmin = async () => {
  try {
    const exists = await adminmodel.findOne({ email: process.env.ADMIN_EMAIL })
    if (!exists) {
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt)
      await adminmodel.create({
        name:     "Super Admin",
        email:    process.env.ADMIN_EMAIL,
        password: hashed,
        role:     "superadmin",
      })
      console.log("✅ Super admin seeded")
    }
  } catch (err) {
    console.log("Seed error:", err.message)
  }
}

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" })
    }

    const admin = await adminmodel.findOne({ email }).select("+password")

    if (!admin) {
      return res.json({ success: false, message: "Invalid credentials" })
    }

    if (!admin.isActive) {
      return res.json({ success: false, message: "Account deactivated. Contact super admin." })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    )

    res.json({
      success: true,
      token,
      admin: {
        id:    admin._id,
        name:  admin.name,
        email: admin.email,
        role:  admin.role,
      }
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" })
    }

    if (password.length < 6) {
      return res.json({ success: false, message: "Password must be at least 6 characters" })
    }

    const exists = await adminmodel.findOne({ email })
    if (exists) {
      return res.json({ success: false, message: "Admin with this email already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const newAdmin = await adminmodel.create({
      name,
      email,
      password: hashed,
      role: "manager",
    })

    res.json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id:    newAdmin._id,
        name:  newAdmin.name,
        email: newAdmin.email,
        role:  newAdmin.role,
      }
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminmodel
      .find({})
      .select("-password")
      .sort({ _id: -1 })

    res.json({ success: true, admins })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export const toggleAdminStatus = async (req, res) => {
  try {
    const { adminId } = req.body

    if (!adminId) {
      return res.json({ success: false, message: "adminId is required" })
    }

    const admin = await adminmodel.findById(adminId)
    if (!admin) {
      return res.json({ success: false, message: "Admin not found" })
    }

    if (admin.role === "superadmin") {
      return res.json({ success: false, message: "Cannot deactivate super admin" })
    }

    admin.isActive = !admin.isActive
    await admin.save()

    res.json({
      success: true,
      message: admin.isActive ? "Admin activated" : "Admin deactivated",
      isActive: admin.isActive,
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}