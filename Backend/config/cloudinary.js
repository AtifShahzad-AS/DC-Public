import {v2 as cloudinary } from "cloudinary"

const connectcloud= async ()=>{
cloudinary.config ({
    cloudname: process.env.CLOUDINARY_NAME,
    apikey:process.env.CLOUDINARY_API_KEY,
    apisecret:process.env.CLOUDINARY_SECRET_KEY
})
}
export default connectcloud