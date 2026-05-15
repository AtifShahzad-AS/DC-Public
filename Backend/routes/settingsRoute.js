import express        from "express"
import multer         from "multer"
import adminauth, { superadminonly } from "../middleware/adminauth.js"
import { updateDelivery } from '../controllers/settingsController.js'

import {
  getSettings,
  updateBranding,
  togglePayment,
  changeOwnPassword,
  resetAdminPassword,
  getAdminsForReset,
} from "../controllers/settingsController.js"

const settingsrouter = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
})
const upload = multer({ storage })

// settingsRoute.js

// Add this line with your other routes
settingsrouter.post('/delivery', adminauth, updateDelivery)
// Public — frontend needs logo/name
settingsrouter.post("/get",              getSettings)

// Admin protected
settingsrouter.post("/branding",         adminauth, upload.single("logo"), updateBranding)
settingsrouter.post("/toggle-payment",   adminauth, togglePayment)
settingsrouter.post("/change-password",  adminauth, changeOwnPassword)

// Super admin only
settingsrouter.post("/reset-password",   adminauth, superadminonly, resetAdminPassword)
settingsrouter.post("/admins-list",      adminauth, superadminonly, getAdminsForReset)

export default settingsrouter