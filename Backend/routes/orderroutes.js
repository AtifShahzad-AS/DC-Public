import express, { Router } from 'express'
import adminauth from '../middleware/adminauth.js'
import authuser from '../middleware/auth.js'
import { placeorder,placeorderstripe,allorders,userorders,updatestatus,verifystripe,getAnalytics } from '../controllers/ordercontroller.js'

const orderrouter=express.Router()
//admin features
orderrouter.post('/list',adminauth,allorders)
orderrouter.post('/status',adminauth,updatestatus)
//payment features
orderrouter.post('/place',authuser,placeorder)
orderrouter.post('/stripe',authuser,placeorderstripe)
//userfeatures
orderrouter.post('/userorders',authuser,userorders)
//verify payment
orderrouter.post('/verifys',authuser,verifystripe)
//analytic
orderrouter.post("/analytics", adminauth, getAnalytics)
export default orderrouter