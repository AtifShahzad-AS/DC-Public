// import React from 'react'
// import { assets } from '../assets/assets'

// const Navbar = ({settoken}) => {
//   return (
//     <div className='flex justify-between items-center px-[4%] py-2 '>
//       <img className='w-[max(5%,80px)]' src={assets.logo} alt="" />
//       <button onClick={()=>settoken('')} className='border-none text-2xl px-5 py-2 rounded-full text-white bg-gray-400 '>Logout</button>
//     </div>
//   )
// }

// export default Navbar

import React from 'react'
import { FiBell } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import {backendurl} from '../App'
const pageTitles = {
  '/dashboard': 'Dashboard',
  '/categories': 'Categories',
  '/list': 'Products',
  '/orders': 'Orders',
  '/customers': 'Customers',
  '/slides': 'Home Slides',
  '/reviews': 'Reviews',
  '/banners': 'Banners',
  '/settings':'Settings',
  '/inventory':'Inventory Management'
}

const Navbar = ({ settoken }) => {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Admin Panel'



  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-base sm:text-lg font-semibold text-[#1a1a2e]">{title}</h1>
        <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
    </header>
  )
}

export default Navbar