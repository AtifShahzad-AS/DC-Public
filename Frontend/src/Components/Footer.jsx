import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    // <div className='sticky mb-0 w-full text-white bg-black flex flex-col sm:grid grid-cols-[3fr-1fr-1fr] gap-14 my-10 mt-40 text-sm '>
        <div className=' mb-0 p-5    bg-black flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-0 text-sm'> 
        <div >
                 <img className='w-12 sm:w-15 md:w-18 lg:w-20' src={assets.log} alt="" />
          {/* <h2 className=' text-xl font-bold mb-5 mt-2 text-white'>Diamond <br /> Collection</h2> */}
        
          {/* <img src={assets.logo} className='mb-5 w-32' alt="" /> */}
          <p className='w-full md:w-2/3 text-white mt-4'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, voluptatum?</p>
        </div>
        <div>
          <h4 className=' text-xl font-bold mb-5 mt-2 text-white'>Company</h4>
          <ul className='flex flex-col gap-1 text-white'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Prosuct</li>
          </ul>
        </div>
        <div>
          <h4 className=' text-xl font-bold mb-5 mt-2 text-white'>Get IN touch</h4>
          <ul className='flex flex-col gap-1 text-white'>
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
