// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { backendurl, currency } from '../App'
// import {toast} from "react-toastify"
// import { assets } from '../assets/assets'
// const Orders = ({token}) => {
// const [orders,setorders]=useState([])
// const fetchorder= async ()=>{
//  if(!token){
//   return null
//  }
//  try {
//    const response= await axios.post(backendurl +"/api/order/list",{},{headers:{token}})
//    if(response.data.success){
//     setorders(response.data.orders)
//    }
//    else{
//   toast.error(response.data.message)
//    }
//  } catch (error) {
//   console.log(error)
//   toast.error(error.message)
//  }
// }
// const statushandler= async (event,orderId)=>{
//   try {
//     const response= await axios.post(backendurl +"/api/order/status",{orderId,status:event.target.value},{headers:{token}})
//     if(response.data.success){
//   //  toast.success("Status Updated")
//   await fetchorder()
//     }
//   } catch (error) {
//   console.log(error)
//   toast.error(error.message)
//  }
// }
// useEffect(()=>{
// fetchorder()
// },[token])
//   return (
//     <div>
//       <h3>Orders Page</h3>
//       <div>
//         {
//         orders.map((order,index)=>(
//    <div className='grid  grid-cols-1 sm:grid-cold-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'   key={index}>
//    <img  src={assets.pack}  alt="parcel"/>
//    <div>
//    <div>
//     {order.items.map((item,index)=>{
// if(index === order.items.length - 1){
//   return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size}</span> </p>
// }
// else{
//   return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size}</span>, </p>

// }
//     })}
//    </div>
//    <p className='mt-3 mb-2 font-medium'>{order.address.firstname +" "+ order.address.lastname}</p>
//    <div>
//     <p className='text-sm sm:text-[15px]'>{order.address.street +","}</p>
//     <p >{order.address.city +","+order.address.state +","+order.address.country +"," +order.address.zipcode}</p>
//    </div>
//    <p>{order.address.phone}</p>
//    </div>
//    <div>
//     <p>Items: {order.items.length}</p>
//     <p className='mt-3'>Payment Method: {order.paymentmethod}</p>
//     <p>Payment:{order.payment ? "done" : "Pending" }</p>
//     <p>Date: {new Date(order.date).toLocaleDateString()}</p>
//    </div>
//    <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
//    <select onChange={(event)=>statushandler(event,order._id)} className='p-3 font-semibold' value={order.status} >
//     <option value="Order Placed">Order Placed</option>
//    <option value="Packing">Packing</option>
//    <option value="Shiped">Shiped</option>
//    <option value="Out for delievery">Out for delievery</option>
//    <option value="delievered">Delievered</option>
//    <option value="Cancelled">Cancelled</option>
//    </select>
// </div>
//         ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Orders
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendurl, currency } from '../App'
import {toast} from "react-toastify"
import { assets } from '../assets/assets'

const statusConfig = {
  'Order Placed':       { bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6' },
  'Packing':            { bg: '#FFFBEB', color: '#92400E', dot: '#F59E0B' },
  'Shiped':             { bg: '#F0FDF4', color: '#166534', dot: '#22C55E' },
  'Out for delievery':  { bg: '#F5F3FF', color: '#5B21B6', dot: '#8B5CF6' },
  'delievered':         { bg: '#F0FDF4', color: '#166534', dot: '#16A34A' },
  'Cancelled':          { bg: '#FEF2F2', color: '#991B1B', dot: '#EF4444' },
}

const Orders = ({token}) => {
const [orders,setorders]=useState([])

const fetchorder= async ()=>{
 if(!token){ return null }
 try {
   const response= await axios.post(backendurl +"/api/order/list",{},{headers:{token}})
   if(response.data.success){
    setorders(response.data.orders)
   } else {
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
    <div className='w-full px-3 sm:px-6 lg:px-8 py-5 max-w-5xl mx-auto'>

      {/* ── Header ── */}
      <div className='flex items-center justify-between mb-5'>
        <div>
          <h3 className='text-xl sm:text-2xl font-bold text-gray-900 tracking-tight'>Orders</h3>
          <p className='text-xs sm:text-sm text-gray-400 mt-0.5'>
            {orders.length} order{orders.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={fetchorder}
          className='flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 border border-gray-200 rounded-lg px-2.5 sm:px-3 py-2 hover:bg-gray-50 transition'
        >
          <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='23 4 23 10 17 10'/><path d='M20.49 15a9 9 0 1 1-2.12-9.36L23 10'/>
          </svg>
          <span className='hidden sm:inline'>Refresh</span>
        </button>
      </div>

      {/* ── Empty State ── */}
      {orders.length === 0 && (
        <div className='text-center py-16'>
          <div className='w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-4'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='#9CA3AF' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M21 8l-9-5-9 5v8l9 5 9-5V8z'/><polyline points='3.27 6.96 12 12.01 20.73 6.96'/><line x1='12' y1='22.08' x2='12' y2='12'/>
            </svg>
          </div>
          <p className='text-gray-700 font-semibold text-sm'>No orders yet</p>
          <p className='text-gray-400 text-xs mt-1'>Orders will appear here once customers place them.</p>
        </div>
      )}

      {/* ── Orders List ── */}
      <div className='flex flex-col gap-3'>
        {orders.map((order,index)=>{
          const cfg = statusConfig[order.status] || { bg:'#F3F4F6', color:'#374151', dot:'#6B7280' }
          return (
          <div
            key={index}
            className='bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-150'
          >

            {/* ══ MOBILE (< sm) ══ */}
            <div className='sm:hidden p-3 flex flex-col gap-2'>

              {/* Row 1: icon + order# | amount + pay badge */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0'>
                    <img src={assets.pack} alt='parcel' className='w-4 h-4 object-contain'/>
                  </div>
                  <span className='text-[10px] font-semibold text-gray-300 tracking-wide'>#{String(index+1).padStart(3,'0')}</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <p className='text-sm font-bold text-gray-900'>{currency}{order.amount}</p>
                  <span className='text-[10px] font-semibold rounded-full px-2 py-0.5'
                    style={{ background: order.payment ? '#DCFCE7' : '#FEF9C3', color: order.payment ? '#15803D' : '#A16207' }}>
                    {order.payment ? '✓ Paid' : '⏳ Pending'}
                  </span>
                </div>
              </div>

              {/* Row 2: item pills */}
              <div className='flex flex-wrap gap-1'>
                {order.items.map((item,i)=>(
                  <span key={i} className='inline-flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5'>
                    {item.name} x {item.quantity}
                    <span className='text-[10px] text-gray-400 bg-white border border-gray-200 rounded-full px-1'>{item.size}</span>
                  </span>
                ))}
              </div>

              {/* Row 3: customer name */}
              <p className='text-xs font-semibold text-gray-900'>{order.address.firstname} {order.address.lastname}</p>

              {/* Row 4: address */}
              <p className='text-[11px] text-gray-400 leading-snug'>
                {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} {order.address.zipcode}
              </p>
              <p className='text-[11px] text-gray-400'>{order.address.phone}</p>

              {/* Row 5: divider + meta */}
              <div className='flex flex-wrap gap-x-2 gap-y-0.5 pt-2 border-t border-gray-100'>
                <span className='text-[11px] text-gray-400'>Items: <b className='text-gray-600 font-semibold'>{order.items.length}</b></span>
                <span className='text-[11px] text-gray-400'>{order.paymentmethod}</span>
                <span className='text-[11px] text-gray-400'>{new Date(order.date).toLocaleDateString()}</span>
              </div>

              {/* Row 6: status select — full width */}
              <div className='relative w-full'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full pointer-events-none z-10' style={{ background: cfg.dot }}/>
                <select
                  onChange={(event)=>statushandler(event,order._id)}
                  value={order.status}
                  className='w-full text-xs font-semibold pl-7 pr-3 py-2.5 rounded-xl border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200'
                  style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.dot+'66' }}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shiped">Shiped</option>
                  <option value="Out for delievery">Out for delievery</option>
                  <option value="delievered">Delievered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

            </div>

            {/* ══ TABLET (sm → lg) ══ */}
            <div className='hidden sm:flex lg:hidden items-start gap-3 p-4'>

              <div className='flex flex-col items-center gap-1 shrink-0'>
                <div className='w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center'>
                  <img src={assets.pack} alt='parcel' className='w-4 h-4 object-contain'/>
                </div>
                <span className='text-[10px] font-semibold text-gray-300'>#{String(index+1).padStart(3,'0')}</span>
              </div>

              <div className='flex-1 min-w-0'>
                <div className='flex flex-wrap gap-1 mb-2'>
                  {order.items.map((item,i)=>(
                    <span key={i} className='inline-flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5'>
                      {item.name} x {item.quantity}
                      <span className='text-[10px] text-gray-400 bg-white border border-gray-200 rounded-full px-1'>{item.size}</span>
                    </span>
                  ))}
                </div>
                <p className='text-xs font-semibold text-gray-900 mb-0.5'>{order.address.firstname} {order.address.lastname}</p>
                <p className='text-[11px] text-gray-400 leading-snug'>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} {order.address.zipcode}</p>
                <p className='text-[11px] text-gray-400'>{order.address.phone}</p>
                <div className='flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-100'>
                  <span className='text-[11px] text-gray-400'>Items: <b className='text-gray-600 font-semibold'>{order.items.length}</b></span>
                  <span className='text-gray-200'>|</span>
                  <span className='text-[11px] text-gray-400'>{order.paymentmethod}</span>
                  <span className='text-gray-200'>|</span>
                  <span className='text-[11px] text-gray-400'>{new Date(order.date).toLocaleDateString()}</span>
                  <span className='text-gray-200'>|</span>
                  <span className='text-[11px] font-semibold rounded-full px-2 py-0.5'
                    style={{ background: order.payment ? '#DCFCE7' : '#FEF9C3', color: order.payment ? '#15803D' : '#A16207' }}>
                    {order.payment ? '✓ Paid' : '⏳ Pending'}
                  </span>
                </div>
              </div>

              <div className='flex flex-col items-end gap-2 shrink-0'>
                <p className='text-sm font-bold text-gray-900'>{currency}{order.amount}</p>
                <div className='relative'>
                  <span className='absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none z-10' style={{ background: cfg.dot }}/>
                  <select
                    onChange={(event)=>statushandler(event,order._id)}
                    value={order.status}
                    className='text-xs font-semibold pl-6 pr-2 py-2 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200 min-w-[130px]'
                    style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.dot+'66' }}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shiped">Shiped</option>
                    <option value="Out for delievery">Out for delievery</option>
                    <option value="delievered">Delievered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

            </div>

            {/* ══ DESKTOP (lg+) ══ */}
            <div className='hidden lg:flex items-start gap-4 p-5'>

              <div className='flex flex-col items-center gap-1.5 shrink-0'>
                <div className='w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center'>
                  <img src={assets.pack} alt='parcel' className='w-5 h-5 object-contain'/>
                </div>
                <span className='text-[11px] font-semibold text-gray-300 tracking-wide'>#{String(index+1).padStart(3,'0')}</span>
              </div>

              <div className='flex-1 min-w-0'>
                <div className='flex flex-wrap gap-1.5 mb-3'>
                  {order.items.map((item,i)=>(
                    <span key={i} className='inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-3 py-1'>
                      {item.name} x {item.quantity}
                      <span className='text-[10px] text-gray-400 bg-white border border-gray-200 rounded-full px-1.5'>{item.size}</span>
                    </span>
                  ))}
                </div>
                <p className='text-sm font-semibold text-gray-900 mb-1'>{order.address.firstname} {order.address.lastname}</p>
                <p className='text-xs text-gray-500'>{order.address.street},</p>
                <p className='text-xs text-gray-500'>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                <p className='text-xs text-gray-500 mt-0.5'>{order.address.phone}</p>
                <div className='flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100'>
                  <span className='text-xs text-gray-500'>Items: <span className='font-semibold text-gray-700'>{order.items.length}</span></span>
                  <span className='text-gray-300'>|</span>
                  <span className='text-xs text-gray-500'>Method: <span className='font-semibold text-gray-700'>{order.paymentmethod}</span></span>
                  <span className='text-gray-300'>|</span>
                  <span className='text-xs text-gray-500'>Date: <span className='font-semibold text-gray-700'>{new Date(order.date).toLocaleDateString()}</span></span>
                  <span className='text-gray-300'>|</span>
                  <span className='text-[11px] font-semibold rounded-full px-2.5 py-0.5'
                    style={{ background: order.payment ? '#DCFCE7' : '#FEF9C3', color: order.payment ? '#15803D' : '#A16207' }}>
                    {order.payment ? '✓ Done' : '⏳ Pending'}
                  </span>
                </div>
              </div>

              <div className='flex flex-col items-end gap-2.5 shrink-0'>
                <p className='text-base font-bold text-gray-900'>{currency}{order.amount}</p>
                <div className='relative'>
                  <span className='absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full pointer-events-none z-10' style={{ background: cfg.dot }}/>
                  <select
                    onChange={(event)=>statushandler(event,order._id)}
                    value={order.status}
                    className='p-3 pl-7 font-semibold text-xs rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200 min-w-[148px]'
                    style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.dot+'66' }}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shiped">Shiped</option>
                    <option value="Out for delievery">Out for delievery</option>
                    <option value="delievered">Delievered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

            </div>

          </div>
          )
        })}
      </div>

    </div>
  )
}

export default Orders