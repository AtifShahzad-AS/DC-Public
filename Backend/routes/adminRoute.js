import express from "express"
import {
  adminLogin,
  createAdmin,
  getAllAdmins,
  toggleAdminStatus,
} from "../controllers/adminController.js"
import adminauth, { superadminonly } from "../middleware/adminauth.js"

const adminrouter = express.Router()

adminrouter.post("/login",  adminLogin)
adminrouter.post("/create", adminauth, superadminonly, createAdmin)
adminrouter.post("/list",   adminauth, superadminonly, getAllAdmins)
adminrouter.post("/toggle", adminauth, superadminonly, toggleAdminStatus)

export default adminrouter