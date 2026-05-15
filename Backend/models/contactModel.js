// models/contactModel.js
import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, trim: true },
    phone:     { type: String, default: "" },
    subject:   { type: String, required: true },
    message:   { type: String, required: true },
    isRead:    { type: Boolean, default: false },
  },
  { timestamps: true }
)

const contactModel = mongoose.model("Contact", contactSchema)
export default contactModel