// import React, { useContext } from 'react'
// import { ShopContext } from '../../Context/Shopcontext'
// import Title from './Title';

// const Carttotal = () => {
//     const {currency,delievery_fee, getcartamount}=useContext(ShopContext);
//   return (
//     <div className='w-full'>
//         <div className='text-2xl'>
//             <Title text1={"CART"} text2={"TOTAL"}/>
//         </div>
//         <div className="flex flex-col gap-2 mt-2 text-sm">
//             <div className="flex justify-between" >
//                 <p>Subtotal</p>
//                 <p>{currency}{getcartamount()}.00</p>
//                  </div>
//                 <hr />
//                 <div className='flex justify-between'>
//                     <p>Shipping fee</p>
//                     <p>{currency}{delievery_fee}</p>
//                 </div>
//                 <hr />
//                 <div className="flex justify-between">
//                     <b>Total</b>
//                     <b>{currency}{getcartamount() === 0 ? 0 : getcartamount() + delievery_fee}.00</b>
//                 </div>
           
//         </div>
       
//     </div>
//   )
// }

// export default Carttotal
import React, { useContext } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import Title from './Title'

const Carttotal = () => {
  const {
    currency,
    getcartamount,
    deliveryFee,
    freeDeliveryAbove,
    getDeliveryFee        // ← all from context now, no separate fetch
  } = useContext(ShopContext)

  const subtotal       = getcartamount()
  const appliedFee     = getDeliveryFee(subtotal)
  const isFreeDelivery = subtotal > 0 && appliedFee === 0
  const total          = subtotal + appliedFee
  const amountToFree   = freeDeliveryAbove - subtotal

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">

        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{subtotal}</p>
        </div>
        <hr />

        {/* Shipping fee */}
        <div className='flex justify-between items-center'>
          <p>Shipping fee</p>
          {subtotal === 0 ? (
            <p>{currency}{deliveryFee}</p>
          ) : isFreeDelivery ? (
            <div className="flex items-center gap-2">
              <p className="line-through text-slate-400">{currency}{deliveryFee}</p>
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                FREE
              </span>
            </div>
          ) : (
            <p>{currency}{deliveryFee}</p>
          )}
        </div>

        {/* Progress bar — add more for free delivery */}
        {subtotal > 0 && !isFreeDelivery && (
          <div className="bg-blue-50 rounded-lg px-3 py-2.5">
            <p className="text-xs text-slate-500 mb-1.5">
              Add{' '}
              <span className="font-semibold text-blue-600">
                {currency}{amountToFree}
              </span>{' '}
              more for free delivery
            </p>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-1.5 bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((subtotal / freeDeliveryAbove) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Free delivery unlocked */}
        {isFreeDelivery && (
          <p className="text-xs text-green-600 font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
              strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            You've unlocked free delivery!
          </p>
        )}

        <hr />

        {/* Total */}
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{total}</b>
        </div>

      </div>
    </div>
  )
}

export default Carttotal