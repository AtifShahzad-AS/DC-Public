import mongoose from "mongoose"

const slideSchema = new mongoose.Schema({
  title:      { type: String, default: "" },
  link:       { type: String, default: "/" },
  image:      { type: String, required: true },
  order:      { type: Number, default: 0 },
  status:     { type: String, enum: ["Live", "Draft"], default: "Live" },
}, { timestamps: true })

const slidemodel = mongoose.models.slide || mongoose.model("slide", slideSchema)
export default slidemodel