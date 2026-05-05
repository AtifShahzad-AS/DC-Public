import mongoose from "mongoose"

const bannerSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  link:       { type: String, default: '/' },
  position:   { type: String, enum: ['Top', 'Middle', 'Bottom'], default: 'Top' },
  status:     { type: String, enum: ['Live', 'Draft'], default: 'Live' },
  colorIndex: { type: Number, default: 0 },
  order:      { type: Number, default: 0 },
}, { timestamps: true })

const bannermodel = mongoose.models.banner ||
  mongoose.model('banner', bannerSchema)
export default bannermodel