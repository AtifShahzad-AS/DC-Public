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

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/categories': 'Categories',
  '/list': 'Products',
  '/orders': 'Orders',
  '/customers': 'Customers',
  '/slides': 'Home Slides',
  '/reviews': 'Reviews',
  '/banners': 'Banners',
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
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Search anything...
        </div>
        <button className="relative w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
          <FiBell className="w-4 h-4 text-gray-500" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="w-8 h-8 rounded-lg bg-[#e8a87c] flex items-center justify-center">
          <span className="text-white text-xs font-semibold">A</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar