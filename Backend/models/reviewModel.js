import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  productId:  { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'user',    required: true },
  userName:   { type: String, required: true },
  rating:     { type: Number, required: true, min: 1, max: 5 },
  comment:    { type: String, required: true },
  status:     { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  isVisible:  { type: Boolean, default: false },
}, { timestamps: true })

// One review per user per product
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true })

const reviewmodel = mongoose.models.review || mongoose.model('review', reviewSchema)
export default reviewmodel