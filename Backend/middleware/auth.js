import { json } from 'express';
import jwt from 'jsonwebtoken'

const authuser= async(req,res,next)=>{
const {token}= req.headers;
if(!token){
   return res.json({success:false,message:"User not authorized login first"})
}
    try{
        const decode_token= jwt.verify(token,process.env.JWT_KEY);
        req.body.userId= decode_token.id;
        next();
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export default authuser