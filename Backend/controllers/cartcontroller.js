import usermodel from "../models/usermodel.js";


// //add products to cart
// const addtocart = async (req,res)=>{
//     try{
//  const {userId,itemid,size}= req.body;

//  const userdata= await usermodel.findById(userId);
//  let cartdata= await userdata.cartdata;
//  if(cartdata[itemid]){
//     if(cartdata[itemid][size]){
//         cartdata[itemid][size] += 1;
//     }
//  }else{
    
//     cartdata[itemid]={}
//     cartdata[itemid][size] =1;
//  }
//  await usermodel.findByIdAndUpdate(userId,{cartdata})
//  res.json({success:true,message:"Added to cart"})
// }catch(error){
//     console.log(error)
//     res.json({success:false,message:error.message})
// }
// }
//update cart
const updatecart = async (req,res)=>{
    try{
 const {userId,itemid,size,quantity}= req.body;

 const userdata= await usermodel.findById(userId);
 let cartdata= await userdata.cartdata;
 cartdata[itemid][size]= quantity
    
 await usermodel.findByIdAndUpdate(userId,{cartdata})
 
 res.json({success:true,message:"Cart Updated"})
}catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
}
}
//get cart data
const getcart = async (req,res)=>{
     try {
        const {userId}=req.body;
        const userdata=  await usermodel.findById(userId)
        let cartdata= await userdata.cartdata;
        res.json({success:true,cartdata})
     } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
     }
}
const addtocart = async (req,res)=>{
    try{
        const {userId,itemid,size}= req.body;

        const userdata = await usermodel.findById(userId);
        let cartdata = userdata.cartdata;

        if(!cartdata[itemid]) {
            // First time product added
            cartdata[itemid] = {};
        }

        if(cartdata[itemid][size]) {
            // Size exists → increase quantity
            cartdata[itemid][size] += 1;
        } else {
            // Size does NOT exist → create entry
            cartdata[itemid][size] = 1;
        }

        await usermodel.findByIdAndUpdate(userId, { cartdata });

        res.json({success:true, message:"Added to cart"});
    } catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export {addtocart,updatecart,getcart}
