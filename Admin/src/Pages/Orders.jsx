import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendurl, currency } from '../App'
import {toast} from "react-toastify"
import { assets } from '../assets/assets'
const Orders = ({token}) => {
const [orders,setorders]=useState([])
const fetchorder= async ()=>{
 if(!token){
  return null
 }
 try {
   const response= await axios.post(backendurl +"/api/order/list",{},{headers:{token}})
   if(response.data.success){
    setorders(response.data.orders)
   }
   else{
  toast.error(response.data.message)
   }
 } catch (error) {
  console.log(error)
  toast.error(error.message)
 }
}
const statushandler= async (event,orderId)=>{
  try {
    const response= await axios.post(backendurl +"/api/order/status",{orderId,status:event.target.value},{headers:{token}})
    if(response.data.success){
  //  toast.success("Status Updated")
  await fetchorder()
    }
  } catch (error) {
  console.log(error)
  toast.error(error.message)
 }
}
useEffect(()=>{
fetchorder()
},[token])
  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {
        orders.map((order,index)=>(
   <div className='grid  grid-cols-1 sm:grid-cold-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'   key={index}>
   <img  src={assets.pack}  alt="parcel"/>
   <div>
   <div>
    {order.items.map((item,index)=>{
if(index === order.items.length - 1){
  return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size}</span> </p>
}
else{
  return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size}</span>, </p>

}
    })}
   </div>
   <p className='mt-3 mb-2 font-medium'>{order.address.firstname +" "+ order.address.lastname}</p>
   <div>
    <p className='text-sm sm:text-[15px]'>{order.address.street +","}</p>
    <p >{order.address.city +","+order.address.state +","+order.address.country +"," +order.address.zipcode}</p>
   </div>
   <p>{order.address.phone}</p>
   </div>
   <div>
    <p>Items: {order.items.length}</p>
    <p className='mt-3'>Payment Method: {order.paymentmethod}</p>
    <p>Payment:{order.payment ? "done" : "Pending" }</p>
    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
   </div>
   <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
   <select onChange={(event)=>statushandler(event,order._id)} className='p-3 font-semibold' value={order.status} >
    <option value="Order Placed">Order Placed</option>
   <option value="Packing">Packing</option>
   <option value="Shiped">Shiped</option>
   <option value="Out for delievery">Out for delievery</option>
   <option value="delievered">Delievered</option>
   </select>
</div>
        ))
        }
      </div>
    </div>
  )
}

export default Orders
