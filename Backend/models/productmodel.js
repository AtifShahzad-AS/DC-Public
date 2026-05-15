// import mongoose from "mongoose"

// const productSchema = new mongoose.Schema({
//   name:          { type: String,  required: true },
//   description:   { type: String,  required: true },
//   price:         { type: Number,  required: true },
//   image:         { type: Array,   required: true },
//   category:      { type: String,  required: true },
// //   subcategory:   { type: String,  required: true },
//   sizes:         { type: Array,   required: true },
//   date:          {type:Date ,default:Date.now()},
//   bestseller:    { type: Boolean },
//   stock:         { type: Number,  default: 0 },
//   lowStockAlert: { type: Number,  default: 10 },
//   alertSent:     { type: Boolean, default: false },
//   isActive:      { type: Boolean, default: true },
//   rating:      { type: Number, default: 0 },
// reviewCount: { type: Number, default: 0 },
// }, { timestamps: true })

// const productmodel = mongoose.models.product || mongoose.model('product', productSchema)
// export default productmodel

// models/productmodel.js
import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name:          { type: String,  required: true },
  description:   { type: String,  required: true },
  price:         { type: Number,  required: true },
  image:         { type: Array,   required: true },
  category:      { type: String,  required: true },
  sizes:         { type: Array,   required: true },
  date:          { type: Date,    default: Date.now() },
  bestseller:    { type: Boolean, default: false },
  // ── Sale fields ──
  onSale:        { type: Boolean, default: false },
  salePrice:     { type: Number,  default: 0 },   // discounted price
  // ── Stock fields ──
  stock:         { type: Number,  default: 0 },
  lowStockAlert: { type: Number,  default: 10 },
  alertSent:     { type: Boolean, default: false },
  isActive:      { type: Boolean, default: true },
  rating:        { type: Number,  default: 0 },
  reviewCount:   { type: Number,  default: 0 },
}, { timestamps: true })

const productmodel = mongoose.models.product || mongoose.model('product', productSchema)
export default productmodel