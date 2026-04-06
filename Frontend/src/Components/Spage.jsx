import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'motion/react'
const spage = () => {
  return (
    <div className='flex flex-col sm:flex-row    mt-0 bg-[linear-gradient(102deg,#dad4ec_0%,#f3e7e9_80.43%)] rounded-2xl'>
        {/* //left */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className=' text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>Discover Luxury Essentials</p>
            </div>
            <h1 className=' text-3xl sm:py-3 lg:text-5xl leading-relaxed text-blue-500'>Latest Arrivals</h1>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>Upgrade Your Everyday Living</p>
                {/* <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
        DEVELOPER
      </h1> */}

                <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
            </div>
        </div>

        </div>
      {/* right side */}
      <motion.img   className='w-full sm:w-1/2' src={assets.h1bed} alt="img b" />
    </div>
  )
}

export default spage
