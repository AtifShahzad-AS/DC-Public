import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name:         { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, select: false },
  googleImage:  { type: String, default: null },
  googleId:     { type: String, default: null },
  cartdata:     { type: Object, default: {} },
  wishlist:     [{ type: String }],
  profileImage: { type: String, default: "" },
  phone:        { type: String, default: "" },
  isBlocked:    { type: Boolean, default: false },   // ← new
  shippingAddress: {
    fullName:   { type: String, default: "" },
    phone:      { type: String, default: "" },
    address:    { type: String, default: "" },
    city:       { type: String, default: "" },
    state:      { type: String, default: "" },
    postalCode: { type: String, default: "" },
    country:    { type: String, default: "" },
  },
}, { minimize: false, timestamps: true })   // ← timestamps gives createdAt

const usermodel = mongoose.models.user || mongoose.model('user', userschema);
export default usermodel;