import express from "express"
import {
  getInventory,
  updateStock,
  getLowStockAlerts,
} from "../controllers/inventoryController.js"
import adminauth from "../middleware/adminauth.js"

const inventoryrouter = express.Router()

inventoryrouter.post("/list",      adminauth, getInventory)
inventoryrouter.post("/update",    adminauth, updateStock)
inventoryrouter.post("/low-stock", adminauth, getLowStockAlerts)

export default inventoryrouter