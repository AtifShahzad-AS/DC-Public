
import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import Title from '../Components/Title'
import { FaTrash } from 'react-icons/fa'
import Carttotal from '../Components/Carttotal'
import axios from 'axios'

const Cart = () => {
  const { products, currency, cartitems, updatequantity, navigate, backendurl } = useContext(ShopContext)
  const [cartdata, setcartdata]           = useState([])
  const [outOfStockIds, setOutOfStockIds] = useState([]) // _ids that are out of stock
  const [checking, setChecking]           = useState(false)

  // ── Build cart data from context ──
  useEffect(() => {
    if (products.length > 0) {
      const tempdata = []
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          // if (item === "__image") continue 
          if (cartitems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cartitems[items][item]
            })
          }
        }
      }
      setcartdata(tempdata)
    }
  }, [cartitems, products])

  // ── Check stock for all cart items whenever cartdata changes ──
  useEffect(() => {
    const checkCartStock = async () => {
      if (cartdata.length === 0) return
      setChecking(true)
      try {
        const staleIds = []
        for (const item of cartdata) {
          const product = products.find(p => p._id === item._id)
          // Check from local products list first (fast)
          if (product && product.stock === 0) {
            staleIds.push(item._id)
          }
        }
        setOutOfStockIds(staleIds)
      } finally {
        setChecking(false)
      }
    }
    checkCartStock()
  }, [cartdata, products])

  const isCartEmpty    = cartdata.length === 0
  const hasOutOfStock  = outOfStockIds.length > 0

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
      <div className='border-t pt-14'>
        <div className= '  text-2xl mb-3'>
          <Title text1={'Your'} text2={'Cart'} />
        </div>

        {/* ── Out of stock warning banner ── */}
        {hasOutOfStock && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-700">Some items in your cart are out of stock</p>
              <p className="text-xs text-red-500 mt-0.5">Please remove them to proceed to checkout</p>
            </div>
          </div>
        )}

        {/* ── Empty cart ── */}
        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg className="w-16 h-16 text-slate-200 mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <p className="text-slate-500 font-medium mb-1">Your cart is empty</p>
            <p className="text-slate-400 text-sm mb-6">Add some products to continue shopping</p>
            <button
              onClick={() => navigate('/collection')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <>
            <div>
              {cartdata.map((item, index) => {
                const productdata  = products.find(p => p._id === item._id)
                if (!productdata) return null

                const isOutOfStock = outOfStockIds.includes(item._id)

                return (
                  <div
                    key={index}
                    className={`py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4
                      ${isOutOfStock ? 'opacity-60 bg-red-50/50' : ''}`}
                  >
                    <div className='flex items-start gap-6'>
                      <div className="relative">
                        <img className='w-16 sm:w-20' src={productdata.image[0]} alt="" />
         
                        {/* Out of stock overlay on image */}
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded">
                            <span className="text-[10px] font-bold text-red-500 bg-white border border-red-200 px-1.5 py-0.5 rounded">
                              OUT OF STOCK
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <p className='text-xs sm:text-lg font-medium'>{productdata.name}</p>
                        <div className='flex items-center gap-5 mt-2'>
                          <p>{currency}{productdata.price}</p>
                          {item.size !== 'default' && (
                            <p className='px-2 sm:px-3 sm:py-1 bg-slate-100'>{item.size}</p>
                          )}
                        </div>

                        {/* Out of stock label + remove button */}
                        {isOutOfStock && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs text-red-500 font-medium">⚠ Out of stock</span>
                            <button
                              onClick={() => updatequantity(item._id, item.size, 0)}
                              className="text-xs text-red-400 underline hover:text-red-600 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity input — disabled if out of stock */}
                    <input
                      onChange={(e) =>
                        e.target.value === '' || e.target.value === '0'
                          ? null
                          : updatequantity(item._id, item.size, Number(e.target.value))
                      }
                      className={`border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1
                        ${isOutOfStock ? 'opacity-40 cursor-not-allowed bg-gray-100' : ''}`}
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      disabled={isOutOfStock}
                    />

                    <FaTrash
                      onClick={() => updatequantity(item._id, item.size, 0)}
                      className='w-4 sm:w-5 mr-4 cursor-pointer text-red-400 hover:text-red-600 transition-colors'
                    />
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end my-20">
              <div className='w-full sm:w-[450px]'>
                <Carttotal />
                <div className='w-full text-end'>

                  {/* Show why checkout is disabled */}
                  {hasOutOfStock && (
                    <p className="text-xs text-red-500 mb-2 text-right">
                      Remove out of stock items to continue
                    </p>
                  )}

                  <button
                    onClick={() => !isCartEmpty && !hasOutOfStock && navigate('/placeorder')}
                    disabled={isCartEmpty || hasOutOfStock}
                    className={`text-sm text-white my-8 px-8 py-3 rounded-xl font-medium transition-colors
                      ${isCartEmpty || hasOutOfStock
                        ? 'bg-slate-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                      }`}
                  >
                    {hasOutOfStock ? 'Remove Out of Stock Items First' : 'Proceed to Checkout'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
// components/Carttotal.jsx

// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../../Context/Shopcontext'
// import Title from '../Components/Title'
// import axios from 'axios'

// const Cart = () => {
//   const { currency, cartitems, products, backendurl } = useContext(ShopContext)

//   const [deliveryFee, setDeliveryFee]               = useState(200)
//   const [freeDeliveryAbove, setFreeDeliveryAbove]   = useState(3000)
//   const [loadingFee, setLoadingFee]                 = useState(true)

//   // ── Fetch delivery settings from backend ──
//   useEffect(() => {
//     const fetchDeliverySettings = async () => {
//       try {
//         const { data } = await axios.post(backendurl + '/api/settings/get')
//         if (data.success) {
//           setDeliveryFee(data.settings.deliveryFee ?? 200)
//           setFreeDeliveryAbove(data.settings.freeDeliveryAbove ?? 3000)
//         }
//       } catch (err) {
//         console.log('Failed to fetch delivery settings:', err)
//       } finally {
//         setLoadingFee(false)
//       }
//     }
//     fetchDeliverySettings()
//   }, [backendurl])

//   // ── Calculate subtotal ──
//   const subtotal = (() => {
//     let total = 0
//     for (const itemId in cartitems) {
//       for (const size in cartitems[itemId]) {
//         if (cartitems[itemId][size] > 0) {
//           const product = products.find(p => p._id === itemId)
//           if (product) {
//             // Use sale price if on sale
//             const price = product.onSale && product.salePrice > 0
//               ? product.salePrice
//               : product.price
//             total += price * cartitems[itemId][size]
//           }
//         }
//       }
//     }
//     return total
//   })()

//   // ── Delivery fee logic ──
//   const isFreeDelivery = subtotal >= freeDeliveryAbove
//   const appliedFee     = isFreeDelivery ? 0 : deliveryFee
//   const total          = subtotal + appliedFee
//   const amountToFree   = freeDeliveryAbove - subtotal

//   return (
//     <div className="w-full">
//       <div className="text-2xl mb-4">
//         <Title text1="Cart" text2="Total" />
//       </div>

//       <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

//         {/* Subtotal */}
//         <div className="flex justify-between items-center px-5 py-3 border-b border-slate-100">
//           <span className="text-sm text-slate-500">Subtotal</span>
//           <span className="text-sm font-semibold text-slate-800">
//             {currency}{subtotal.toLocaleString()}
//           </span>
//         </div>

//         {/* Delivery fee */}
//         <div className="flex justify-between items-center px-5 py-3 border-b border-slate-100">
//           <div>
//             <span className="text-sm text-slate-500">Delivery fee</span>
//             {isFreeDelivery && (
//               <span className="ml-2 text-[10px] bg-green-100 text-green-700
//                 font-semibold px-2 py-0.5 rounded-full">
//                 FREE
//               </span>
//             )}
//           </div>
//           <span className={`text-sm font-semibold
//             ${isFreeDelivery ? 'text-green-600 line-through decoration-1' : 'text-slate-800'}`}>
//             {currency}{deliveryFee.toLocaleString()}
//           </span>
//         </div>

//         {/* Free delivery progress */}
//         {!isFreeDelivery && !loadingFee && (
//           <div className="px-5 py-3 border-b border-slate-100 bg-blue-50/50">
//             <div className="flex items-center justify-between mb-1.5">
//               <span className="text-[11px] text-slate-500">
//                 Add{' '}
//                 <span className="font-semibold text-blue-600">
//                   {currency}{amountToFree.toLocaleString()}
//                 </span>{' '}
//                 more for free delivery
//               </span>
//               <span className="text-[10px] text-slate-400">
//                 {Math.round((subtotal / freeDeliveryAbove) * 100)}%
//               </span>
//             </div>
//             <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
//               <div
//                 className="h-1.5 bg-blue-600 rounded-full transition-all duration-500"
//                 style={{ width: `${Math.min((subtotal / freeDeliveryAbove) * 100, 100)}%` }}
//               />
//             </div>
//           </div>
//         )}

//         {/* Free delivery achieved */}
//         {isFreeDelivery && (
//           <div className="px-5 py-2.5 bg-green-50 border-b border-slate-100">
//             <p className="text-xs text-green-700 font-medium flex items-center gap-1.5">
//               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
//                 strokeWidth={2.5} viewBox="0 0 24 24">
//                 <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               You've unlocked free delivery!
//             </p>
//           </div>
//         )}

//         {/* Total */}
//         <div className="flex justify-between items-center px-5 py-4 bg-slate-50">
//           <span className="text-sm font-bold text-slate-800">Total</span>
//           <span className="text-base font-bold text-slate-900">
//             {currency}{total.toLocaleString()}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cart