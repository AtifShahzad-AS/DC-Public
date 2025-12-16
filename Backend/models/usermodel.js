import mongoose, { Mongoose } from "mongoose";
const userschema= new mongoose.Schema({
    name:{type:String ,required:true},
    email:{type:String ,required:true,unique:true},
    password:{type:String ,required:false},
    image:{type:Array ,required:true},
    googleImage: { type: String, default: null },
    googleId: { type: String, default: null }, 
    cartdata:{type:Object ,default:{}},
    
        
    },{minimize:false})
    

const usermodel= mongoose.models.user || mongoose.model('user',userschema);
export default usermodel