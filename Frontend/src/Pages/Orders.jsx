import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title'
import products from '../assets/products'
import { assets } from '../assets/assets'
import { ShopContext } from '../../Context/Shopcontext'
import axios from 'axios'

const Orders = () => {
  const {backendurl,token,currency}=useContext(ShopContext);
  const [orderdata,setorderdata]=useState([])
  const loadorder= async ()=>{
try {
  if(!token){
    return null
  }
  const response =await axios.post(backendurl + '/api/order/userorders',{},{headers:{token}})
 if(response.data.success){
  let allorders=[]
  response.data.orders.map((order)=>{
    order.items.map((item)=>{
      item['status']=order.status
      item['payment']=order.payment
      item['paymentmethod']=order.paymentmethod
      item['date']=order.date
      allorders.push(item)
    })
  })
  setorderdata(allorders.reverse())
 }
  
} catch (error) {
  
}
  }
  useEffect(()=>{
    loadorder()
  },[token])

  return (
    <div className='px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={"My"} text2={"Orders"}/>
      </div>
     <div>
      {
        orderdata.map((item,index)=>
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4' >
         <div className='flex items-start gap-6 text-sm'>
          <img className='w-16 sm:w-20' src={item.image} alt="img" />
          <div>
            <p className='sm:text-base font-medium'>{item.name}</p>
            <div className='flex items-center gap-3 mt-1 text-base text-gray-500'>
              <p >{currency}{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Size: {item.size}</p>
            </div>
            
            <p className='mt-1'>Date <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
            <p className='mt-1'>Payment : <span className=' text-gray-400'>{item.paymentmethod}</span></p>
         
          </div>

         </div>
         <div className='md:w-1/2 flex justify-between'>
         <div className='flex items-center gap-2'>
          <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
          <p className='text-sm md:text-base'>{item.status}</p>
         </div>
         <button onClick={loadorder} className=' border px-5 py-2 text-white text-sm font-medium bg-blue-600'> Track Order</button>
         </div>
          </div>
        )
      }
     </div>
      
    </div>
    </div>
  )
}

export default Orders
