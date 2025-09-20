import mongoose, { Mongoose } from "mongoose";
const productschema= new mongoose.Schema({
    name:{type:string ,required:true},
    description:{type:string ,required:true},
    price:{type:number ,required:true},
    image:{type:Array ,required:true},
    category:{type:string ,required:true},
    subcategory:{type:string ,required:true},
    // sizes:{type:Array ,required:true},
    bestseller:{type:Boolean },
    date:{type:number ,required:true},

})
const productmodel= mongoose.models.product || mongoose.model('product',productschema);
export default productmodel