import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext, } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import { useSearchParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

const Verify = () => {
      const {navigate,token,setcartitems,backendurl}=useContext(ShopContext)
    const [searchparms,setsearchparms]= useSearchParams()
    const success=searchparms.get("success")
    const orderId=searchparms.get("orderId")


    const verifypayment= async ()=>{
try {
    if (!token) {
        return null;  
    }
    const responce=await axios.post(backendurl +"/api/order/verifys",{success,orderId},{headers: {
    Authorization: `Bearer ${token}`
  }})
    if(responce.data.success){
        setcartitems({})
        navigate('/orders')
    }
    else{
        navigate('/cart')
    }
} catch (error) {
    console.log(error)
    toast.error("Payment Failed"+ error.message)
}
}
useEffect(()=>{
    verifypayment()
},[token])
  return (

    <div>
    </div>
  )
}

export default Verify
