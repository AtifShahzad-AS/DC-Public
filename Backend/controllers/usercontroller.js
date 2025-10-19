import express from "express"
import usermodel from "../models/usermodel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createtoken= (id)=>{
    return jwt.sign({id},process.env.JWT_KEY)
}
// route for user login
const loginuser= async (req,res)=>{
    try
    {
        const {email,password}=req.body;
     const user= await usermodel.findOne({email})
    if(!user){
        return res.json({success:false,message:"user doesnot exist"})
    }
    const ismatch= await bcrypt.compare(password,user.password);
    if(ismatch){
        const token = createtoken(user._id);
         res.json({success:true,token})
    }
    else{
        res.json({success:false,message:"Password is Incorrect"})
    }
}catch(error){
    console.log(error);
        res.json({success:false,message:error.message})

}

}
// route for user registration
const registeruser= async (req,res)=>{
   try{
    const {name,email,password}=req.body;
    // checkin user exist or not
    const exist= await usermodel.findOne({email});
    if(exist){
    return    res.json({success:false,message:"user already exist"})
    }
    // validation
    if(!validator.isEmail(email)){
           return    res.json({success:false,message:"Enter valid emsil"})

    }
    if(password.length < 4){
           return    res.json({success:false,message:"Please enter strong password "})

    }
    const salt=await bcrypt.genSalt(10)
    const hashedpassword= await bcrypt.hash(password,salt)

    const newuser= new usermodel({
        name,
        email,
        password:hashedpassword
    })
    const user= await newuser.save();

    const token = createtoken(user._id);
    res.json({success:true,token})
}

   catch(error){
    console.log(error)
    res.json({success:false,message:error.message})

   }
}

// route for admin login
const loginadmin= async (req,res)=>{
    try{
        const {email,password}=req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           const token= jwt.sign(email+password,process.env.JWT_KEY);
           res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid creditionals"})
        }
    }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})

   }

}
export {loginuser,registeruser,loginadmin}