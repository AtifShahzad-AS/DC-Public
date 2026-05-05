import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema({
  storeName:    { type: String,  default: "LuxeHome" },
  tagline:      { type: String,  default: "Premium Home Textiles" },
  logo:         { type: String,  default: "" },
  // Payment gateways — enabled/disabled
  payments: {
    cod:    { type: Boolean, default: true  },
    stripe: { type: Boolean, default: true  },
  },
}, { timestamps: true })

const settingsmodel = mongoose.models.settings ||
  mongoose.model('settings', settingsSchema)
export default settingsmodel