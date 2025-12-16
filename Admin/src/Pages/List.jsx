import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { backendurl, currency } from '../App';
import axios from 'axios'
import {toast}  from 'react-toastify'
const List = ({token}) => {
  const [list,setlist]=useState([]);
  const fetchlist= async ()=>{
    try{
    const response= await axios.get(backendurl +'/api/product/list');
    if(response.data.success){
      setlist(response.data.products)
    
    }
    else{
      toast.error(response.data.message)
    }
    console.log(response.data)
    }
    catch(error){
   toast.error(error.message)
    }
  }
  useEffect(()=>{
   fetchlist();
  },[])

  const removeproduct= async (id)=>{
try{
  const response= await axios.post(backendurl +"/api/product/remove" ,{id},{headers:{token}})
 if(response.data.success){
  toast.success(response.data.message);
  await fetchlist();
 }else{
  toast.error(response.data.message)
 }
}
catch(error){
  console.log(error)
  toast.error(response.error)
}
  }
  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* list table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Catogery</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
          </div>
          {/* product list */}
          
            {
            list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 item-center px-2 py-1 border text-sm' key={index}>  
            <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeproduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
              </div>
            )
            )
            }
          </div>
     
    </>
  )
}

export default List
