// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'
// import { backendurl, currency } from '../App';
// import axios from 'axios'
// import {toast}  from 'react-toastify'
// const List = ({token}) => {
//   const [list,setlist]=useState([]);
//   const fetchlist= async ()=>{
//     try{
//     const response= await axios.get(backendurl +'/api/product/list');
//     if(response.data.success){
//       setlist(response.data.products)
    
//     }
//     else{
//       toast.error(response.data.message)
//     }
//     console.log(response.data)
//     }
//     catch(error){
//    toast.error(error.message)
//     }
//   }
//   useEffect(()=>{
//    fetchlist();
//   },[])

//   const removeproduct= async (id)=>{
// try{
//   const response= await axios.post(backendurl +"/api/product/remove" ,{id},{headers:{token}})
//  if(response.data.success){
//   toast.success(response.data.message);
//   await fetchlist();
//  }else{
//   toast.error(response.data.message)
//  }
// }
// catch(error){
//   console.log(error)
//   toast.error(response.error)
// }
//   }
//   return (
//     <>
//       <p className='mb-2'>All Products List</p>
//       <div className='flex flex-col gap-2'>
//         {/* list table title */}
//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Catogery</b>
//           <b>Price</b>
//           <b className='text-center'>Action</b>
//           </div>
//           {/* product list */}
          
//             {
//             list.map((item,index)=>(
//             <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 item-center px-2 py-1 border text-sm' key={index}>  
//             <img className='w-12' src={item.image[0]} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{currency}{item.price}</p>
//               <p onClick={()=>removeproduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
//               </div>
//             )
//             )
//             }
//           </div>
     
//     </>
//   )
// }

// export default List
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { backendurl, currency } from '../App';
import axios from 'axios'
import {toast} from 'react-toastify'

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
    const response= await axios.post(backendurl +"/api/product/remove",{id},{headers:{token}})
    if(response.data.success){
      toast.success(response.data.message);
      await fetchlist();
    }else{
      toast.error(response.data.message)
    }
  }
  catch(error){
    console.log(error)
    toast.error(error.message)
  }
}

  return (
    <div className='w-full px-3 sm:px-6 lg:px-8 py-5 max-w-5xl mx-auto'>

      {/* ── Header ── */}
      <div className='flex items-center justify-between mb-5'>
        <div>
          <h3 className='text-xl sm:text-2xl font-bold text-gray-900 tracking-tight'>Products</h3>
          <p className='text-xs sm:text-sm text-gray-400 mt-0.5'>{list.length} product{list.length !== 1 ? 's' : ''} listed</p>
        </div>
        <button
          onClick={fetchlist}
          className='flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 border border-gray-200 rounded-lg px-2.5 sm:px-3 py-2 hover:bg-gray-50 transition'
        >
          <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='23 4 23 10 17 10'/><path d='M20.49 15a9 9 0 1 1-2.12-9.36L23 10'/>
          </svg>
          <span className='hidden sm:inline'>Refresh</span>
        </button>
      </div>

      {/* ── Empty State ── */}
      {list.length === 0 && (
        <div className='text-center py-16 sm:py-20'>
          <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-4'>
            <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='#9CA3AF' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round'>
              <rect x='2' y='3' width='20' height='14' rx='2'/><line x1='8' y1='21' x2='16' y2='21'/><line x1='12' y1='17' x2='12' y2='21'/>
            </svg>
          </div>
          <p className='text-gray-700 font-semibold text-sm sm:text-base'>No products yet</p>
          <p className='text-gray-400 text-xs sm:text-sm mt-1'>Add products and they will appear here.</p>
        </div>
      )}

      {/* ── DESKTOP TABLE (md and above) ── */}
      {list.length > 0 && (
      <div className='hidden md:block bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>

        {/* Table Header */}
        <div className='grid grid-cols-[72px_1fr_150px_110px_64px] items-center px-5 py-3 bg-gray-50 border-b border-gray-100'>
          <span className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Image</span>
          <span className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Name</span>
          <span className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Category</span>
          <span className='text-xs font-semibold text-gray-400 uppercase tracking-wide'>Price</span>
          <span className='text-xs font-semibold text-gray-400 uppercase tracking-wide text-center'>Del</span>
        </div>

        {/* Rows */}
        <div className='flex flex-col divide-y divide-gray-50'>
          {list.map((item,index)=>(
          <div
            key={index}
            className='grid grid-cols-[72px_1fr_150px_110px_64px] items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors duration-100 group'
          >
            <div className='w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shrink-0'>
              <img className='w-full h-full object-cover' src={item.image[0]} alt={item.name}/>
            </div>
            <p className='text-sm font-semibold text-gray-900 truncate pr-2'>{item.name}</p>
            <span className='inline-block text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-0.5 w-fit'>
              {item.category}
            </span>
            <p className='text-sm font-semibold text-gray-800'>{currency}{item.price}</p>
            <div className='flex justify-center'>
              <button
                onClick={()=>removeproduct(item._id)}
                className='w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-150'
                title='Remove product'
              >
                <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <polyline points='3 6 5 6 21 6'/><path d='M19 6l-1 14H6L5 6'/><path d='M10 11v6'/><path d='M14 11v6'/><path d='M9 6V4h6v2'/>
                </svg>
              </button>
            </div>
          </div>
          ))}
        </div>

      </div>
      )}

      {/* ── MOBILE CARDS (below md) ── */}
      {list.length > 0 && (
      <div className='flex flex-col gap-3 md:hidden'>
        {list.map((item,index)=>(
        <div
          key={index}
          className='flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-3 py-3 shadow-sm'
        >

          {/* Image */}
          <div className='w-14 h-14 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shrink-0'>
            <img className='w-full h-full object-cover' src={item.image[0]} alt={item.name}/>
          </div>

          {/* Info */}
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-semibold text-gray-900 truncate'>{item.name}</p>
            <span className='inline-block text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5 mt-1'>
              {item.category}
            </span>
            <p className='text-sm font-bold text-gray-800 mt-1'>{currency}{item.price}</p>
          </div>

          {/* Delete */}
          <button
            onClick={()=>removeproduct(item._id)}
            className='w-9 h-9 flex items-center justify-center rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 active:scale-95 transition-all duration-150 shrink-0'
            title='Remove product'
          >
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <polyline points='3 6 5 6 21 6'/><path d='M19 6l-1 14H6L5 6'/><path d='M10 11v6'/><path d='M14 11v6'/><path d='M9 6V4h6v2'/>
            </svg>
          </button>

        </div>
        ))}
      </div>
      )}

    </div>
  )
}

export default List