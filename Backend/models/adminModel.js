import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
  name:     { type: String,  required: true },
  email:    { type: String,  required: true, unique: true },
  password: { type: String,  required: true, select: false },
  role:     {
    type:    String,
    enum:    ['superadmin', 'manager'],
    default: 'manager'
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const adminmodel = mongoose.models.admin || mongoose.model('admin', adminSchema)
export default adminmodel