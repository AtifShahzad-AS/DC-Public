import React from 'react'
import { FaExchangeAlt } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";




import { assets } from '../assets/assets'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-2 mt-10 sm:mt-30 sm:mb-10'>
      <div >
        {/* <img src={assets.pintester_icon} alt=""  className='w-12 m-auto '/> */}
<FaExchangeAlt size={40} className="text-black m-auto" />

        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We Offer Hasel Free Exchange</p>
      </div>
       <div >
        {/* <img src={assets.pintester_icon} alt=""  className='w-12 m-auto '/> */}
<RiRefund2Line className="text-black m-auto" size={40} />


        <p className='font-semibold'>Days Return  Policy</p>
        <p className='text-gray-400'>We Offer 7 day free return policy</p>
      </div>
       <div >
        {/* <img src={assets.pintester_icon} alt=""  className='w-12 m-auto '/> */}
<MdSupportAgent className="text-black m-auto" size={40} />

        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We Offer 24/7 customer support</p>
      </div>
    </div>
  )
}

export default Ourpolicy
