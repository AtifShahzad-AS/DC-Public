import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-2'>
      <div className='mt-10'>
        <img src={assets.pintester_icon} alt=""  className='w-12 m-auto '/>
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We Offer Hasel Free Exchange</p>
      </div>
       <div className=' mt-10'>
        <img src={assets.pintester_icon} alt=""  className='w-12 m-auto '/>
        <p className='font-semibold'>Days Return  Policy</p>
        <p className='text-gray-400'>We Offer 7 day free return policy</p>
      </div>
       <div className='mt-10'>
        <img src={assets.pintester_icon} alt=""  className='w-12 m-auto '/>
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We Offer 24/7 customer support</p>
      </div>
    </div>
  )
}

export default Ourpolicy
