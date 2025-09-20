import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    // <div className='sticky mb-0 w-full text-white bg-black flex flex-col sm:grid grid-cols-[3fr-1fr-1fr] gap-14 my-10 mt-40 text-sm '>
        <div className=' mb-0 p-5 bg-amber-50 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'> 
        <div >
                 <img className='w-20 sm:w-25 md:32 lg:w-42' src={assets.diamond} alt="" />
        
          {/* <img src={assets.logo} className='mb-5 w-32' alt="" /> */}
          <p className='w-full md:w-2/3 text-gray-600'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, voluptatum?</p>
        </div>
        <div>
          <p className=' text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-1 text-gray-700'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Prosuct</li>
          </ul>
        </div>
        <div>
          <p className=' text-xl font-medium mb-5'>Get IN touch</p>
          <ul className='flex flex-col gap-1 text-gray-700'>
            <li>+9232-4387342</li>
            <li>Diamondcollection@gmail.com</li>
            <li>Contact</li>
            <li>Prosuct</li>
          </ul>
        </div>
      </div>
    // </div>
  )
}

export default Footer
