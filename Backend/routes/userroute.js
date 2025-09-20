import express from "express";
import { loginadmin,loginuser,registeruser } from "../controllers/usercontroller.js";

const userrouter= express.Router();

userrouter.post('/register',registeruser)
userrouter.post('/admin',loginadmin)
userrouter.post('/login',loginuser)

 export default userrouter;