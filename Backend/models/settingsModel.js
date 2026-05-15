// import mongoose from "mongoose"

// const settingsSchema = new mongoose.Schema({
//   storeName:    { type: String,  default: "LuxeHome" },
//   tagline:      { type: String,  default: "Premium Home Textiles" },
//   logo:         { type: String,  default: "" },
//   // Payment gateways — enabled/disabled
//   payments: {
//     cod:    { type: Boolean, default: true  },
//     stripe: { type: Boolean, default: true  },
//   },
// }, { timestamps: true })

// const settingsmodel = mongoose.models.settings ||
//   mongoose.model('settings', settingsSchema)
// export default settingsmodel
// models/settingsModel.js
import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema({
  storeName: { type: String,  default: "Diamond Collection" },
  tagline:   { type: String,  default: "Premium Home Textiles" },
  logo:      { type: String,  default: "" },
  payments: {
    cod:    { type: Boolean, default: true },
    stripe: { type: Boolean, default: true },
  },
  // ── Delivery ──
  deliveryFee:        { type: Number, default: 200  },  // Rs 200 flat fee
  freeDeliveryAbove:  { type: Number, default: 3000 },  // free above Rs 3000
}, { timestamps: true })

const settingsmodel = mongoose.models.settings ||
  mongoose.model('settings', settingsSchema)
export default settingsmodel