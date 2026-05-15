// routes/categoryRoute.js
import express from "express"
import upload from "../middleware/multer.js"
import adminauth from "../middleware/adminauth.js"
import { listCategories, addCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js"

const categoryRouter = express.Router()

categoryRouter.post("/list",   listCategories)                                   // public
categoryRouter.post("/add",    adminauth, upload.single("image"), addCategory)   // admin
categoryRouter.post("/update", adminauth, upload.single("image"), updateCategory) // admin
categoryRouter.post("/delete", adminauth, deleteCategory)                         // admin

export default categoryRouter