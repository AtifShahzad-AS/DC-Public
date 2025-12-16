import express from 'express'
import { addtocart,getcart,updatecart } from '../controllers/cartcontroller.js'
import authuser from '../middleware/auth.js';
const cartrouter= express.Router();

cartrouter.post('/get',authuser,getcart)
cartrouter.post('/add',authuser,addtocart)
cartrouter.post('/update',authuser,updatecart)

export default cartrouter
