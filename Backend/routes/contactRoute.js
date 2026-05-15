// routes/contactRoute.js
import express from "express"
import adminauth from "../middleware/adminauth.js"
import { submitContact, getContacts, markAsRead, deleteContact } from "../controllers/contactController.js"

const contactRouter = express.Router()

// Customer — submit contact form (no auth needed)
contactRouter.post("/submit", submitContact)

// Admin — manage messages
contactRouter.post("/list",   adminauth, getContacts)
contactRouter.post("/read",   adminauth, markAsRead)
contactRouter.post("/delete", adminauth, deleteContact)

export default contactRouter