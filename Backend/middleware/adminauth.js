import jwt from "jsonwebtoken"
import adminmodel from "../models/adminModel.js"

const adminauth = async (req, res, next) => {
  try {
    const { token } = req.headers

    if (!token) {
      return res.json({ success: false, message: "Not authorized, login again" })
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY)

    const admin = await adminmodel.findById(decoded.id)

    if (!admin || !admin.isActive) {
      return res.json({ success: false, message: "Not authorized, login again" })
    }

    req.admin = admin
    next()

  } catch (err) {
    return res.json({ success: false, message: "Not authorized, login again" })
  }
}

export const superadminonly = (req, res, next) => {
  if (req.admin?.role !== "superadmin") {
    return res.json({ success: false, message: "Super admin access only" })
  }
  next()
}

export default adminauth