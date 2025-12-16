import mongoose, { Mongoose } from "mongoose";
const productschema= new mongoose.Schema({
    name:{type:String ,required:true},
    description:{type:String ,required:true},
    price:{type:Number ,required:true},
    image:{type:Array ,required:true},
    category:{type:String ,required:true},
    subcategory:{type:String ,required:true},
    sizes:{type:[String] ,required:true},
    bestseller:{type:Boolean },
    date:{type:Date ,default:Date.now()},

})
const productmodel= mongoose.models.product || mongoose.model('product',productschema);
export default productmodel