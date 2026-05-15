// models/categoryModel.js
import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, unique: true, trim: true },
    emoji:       { type: String, default: "📦" },
    description: { type: String, default: "" },
    image:       { type: String, default: "" }, // Cloudinary URL
    sizes:       { type: Array,  default: [] },  // default sizes for this category
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
)

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema)
export default categoryModel