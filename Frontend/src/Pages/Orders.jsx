// import React, { useContext, useEffect, useState } from 'react'
// import Title from '../Components/Title'
// import products from '../assets/products'
// import { assets } from '../assets/assets'
// import { ShopContext } from '../../Context/Shopcontext'
// import axios from 'axios'

// const Orders = () => {
//   const {backendurl,token,currency}=useContext(ShopContext);
//   const [orderdata,setorderdata]=useState([])
//   const loadorder= async ()=>{
// try {
//   if(!token){
//     return null
//   }
//   const response =await axios.post(backendurl + '/api/order/userorders',{},{
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// })
//  if(response.data.success){
//   let allorders=[]
//   response.data.orders.map((order)=>{
//     order.items.map((item)=>{
//       item['status']=order.status
//       item['payment']=order.payment
//       item['paymentmethod']=order.paymentmethod
//       item['date']=order.date
//       allorders.push(item)
//     })
//   })
//   setorderdata(allorders.reverse())
//  }
  
// } catch (error) {
  
// }
//   }
//   useEffect(()=>{
//     loadorder()
//   },[token])

//   return (
//     <div className='px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
//     <div className='border-t pt-16'>
//       <div className='text-2xl'>
//         <Title text1={"My"} text2={"Orders"}/>
//       </div>
//      <div>
      
//       {
//         orderdata.map((item,index)=>
          
//           <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4' >
//          <div className='flex items-start gap-6 text-sm'>
//           <img className='w-16 sm:w-20' src={item.image[0]} alt="img" />

//           <div>
//             <p className='sm:text-base font-medium'>{item.name}</p>
//             <div className='flex items-center gap-3 mt-1 text-base text-gray-500'>
//               <p>Quantity: {item.quantity}</p>
//               <p >{currency}{item.price * item.quantity}</p>
//               <p>Size: {item.size}</p>
//             </div>
//             <p className='mt-1'>Date <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
//             <p className='mt-1'>Payment : <span className=' text-gray-400'>{item.paymentmethod}</span></p>
         
//           </div>

//          </div>
//          <div className='md:w-1/2 flex justify-between'>
//          <div className='flex items-center gap-2'>
//           <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
//           <p className='text-sm md:text-base'>{item.status}</p>
//          </div>
//          <button onClick={loadorder} className=' border px-5 py-2 text-white text-sm font-medium bg-blue-600'> Track Order</button>
//          </div>
//           </div>
//         )
//       }
//      </div>
      
//     </div>
//     </div>
//   )
// }

// export default Orders
import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title'
import { ShopContext } from '../../Context/Shopcontext'
import axios from 'axios'

const statusConfig = {
  'Order Placed':      { bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6' },
  'Packing':           { bg: '#FFFBEB', color: '#92400E', dot: '#F59E0B' },
  'Shiped':            { bg: '#F0FDF4', color: '#166534', dot: '#22C55E' },
  'Out for delievery': { bg: '#F5F3FF', color: '#5B21B6', dot: '#8B5CF6' },
  'delievered':        { bg: '#F0FDF4', color: '#166534', dot: '#16A34A' },
  'Cancelled':         { bg: '#FEF2F2', color: '#991B1B', dot: '#EF4444' },
}

const Orders = () => {
  const { backendurl, token, currency, getDeliveryFee } = useContext(ShopContext)
  const [orders, setOrders]     = useState([])
  const [loading, setLoading]   = useState(true)

  const loadOrders = async () => {
    try {
      if (!token) return
      setLoading(true)
      const response = await axios.post(
        backendurl + '/api/order/userorders', {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) {
        // Keep full orders (not flattened) for proper amount display
        setOrders(response.data.orders.reverse())
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadOrders() }, [token])

  // ── Calculate subtotal from items ──
  const getSubtotal = (items) =>
    items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (loading) return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
      <div className='border-t pt-16 flex items-center justify-center py-20'>
        <div className='w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin' />
      </div>
    </div>
  )

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
      <div className='border-t pt-16'>
        <div className='text-2xl mb-6'>
          <Title text1={"My"} text2={"Orders"} />
        </div>

        {orders.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <svg className='w-16 h-16 text-slate-200 mb-4' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
              <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z'/>
              <line x1='3' y1='6' x2='21' y2='6'/>
              <path d='M16 10a4 4 0 01-8 0'/>
            </svg>
            <p className='text-slate-500 font-medium mb-1'>No orders yet</p>
            <p className='text-slate-400 text-sm'>Your orders will appear here</p>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            {orders.map((order, orderIndex) => {
              const cfg      = statusConfig[order.status] || { bg: '#F3F4F6', color: '#374151', dot: '#6B7280' }
              const subtotal = getSubtotal(order.items)
              const fee      = order.amount - subtotal  // actual fee charged
              const isFree   = fee === 0

              return (
                <div key={orderIndex}
                  className='bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all'>

                  {/* Order header */}
                  <div className='flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100'>
                    <div className='flex items-center gap-3'>
                      <span className='text-xs font-semibold text-slate-400'>
                        #{String(orderIndex + 1).padStart(3, '0')}
                      </span>
                      <span className='text-xs text-slate-400'>
                        {new Date(order.date).toLocaleDateString('en-PK', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      {/* Payment badge */}
                      <span className='text-[11px] font-semibold rounded-full px-2.5 py-0.5'
                        style={{
                          background: order.payment ? '#DCFCE7' : '#FEF9C3',
                          color:      order.payment ? '#15803D' : '#A16207'
                        }}>
                        {order.payment ? '✓ Paid' : '⏳ Pending'}
                      </span>
                      {/* Status badge */}
                      <span className='text-[11px] font-semibold rounded-full px-2.5 py-0.5 flex items-center gap-1'
                        style={{ background: cfg.bg, color: cfg.color }}>
                        <span className='w-1.5 h-1.5 rounded-full inline-block' style={{ background: cfg.dot }} />
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className='divide-y divide-slate-50'>
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex}
                        className='flex items-start gap-4 px-5 py-4'>
                        <img
                          className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl flex-shrink-0 bg-slate-100'
                          src={item.image?.[0]} alt={item.name}
                        />
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-semibold text-slate-800 mb-1'>{item.name}</p>
                          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500'>
                            {/* Use sale price if available */}
                            <span className='font-medium text-slate-700'>
                              {currency}{item.price} × {item.quantity}
                              {' = '}
                              <span className='text-blue-600 font-bold'>
                                {currency}{item.price * item.quantity}
                              </span>
                            </span>
                            {item.size && item.size !== 'default' && (
                              <span className='bg-slate-100 px-2 py-0.5 rounded-full'>
                                Size: {item.size}
                              </span>
                            )}
                            <span className='bg-slate-100 px-2 py-0.5 rounded-full capitalize'>
                              {item.paymentmethod || order.paymentmethod}
                            </span>
                          </div>
                          {item.category && (
                            <span className='inline-block mt-1 text-[11px] text-slate-400'>
                              {item.category}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order footer — total + delivery */}
                  <div className='flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-100'>
                    <div className='text-xs text-slate-500 space-y-0.5'>
                      <p>
                        Subtotal:{' '}
                        <span className='font-semibold text-slate-700'>{currency}{subtotal}</span>
                      </p>
                      <p>
                        Delivery:{' '}
                        {isFree ? (
                          <span className='font-semibold text-green-600'>Free</span>
                        ) : (
                          <span className='font-semibold text-slate-700'>{currency}{fee}</span>
                        )}
                      </p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='text-right'>
                        <p className='text-xs text-slate-400'>Total</p>
                        <p className='text-base font-bold text-slate-900'>{currency}{order.amount}</p>
                      </div>
                      <button
                        onClick={loadOrders}
                        className='border border-blue-200 bg-blue-50 hover:bg-blue-600 hover:text-white
                          text-blue-600 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200'
                      >
                        Track Order
                      </button>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
