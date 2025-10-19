import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({settoken}) => {
  return (
    <div className='flex justify-between items-center px-[4%] py-2 '>
      <img className='w-[max(10%,80px)]' src={assets.diamond} alt="" />
      <button onClick={()=>settoken('')} className='border-none text-2xl px-5 py-2 rounded-full text-white bg-gray-400 '>Logout</button>
    </div>
  )
}

export default Navbar
