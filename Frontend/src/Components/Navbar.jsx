
import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUser, FaHeart, FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"
import { ShopContext } from '../../Context/Shopcontext'
import {toast} from "react-toastify"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {getcartcount,setshowsearch,navigate}=useContext(ShopContext);
  return (
    <>
      {/* Top Navbar */}
      <div className='fixed top-0 w-full  flex items-center justify-between px-5 py-2 sm:h-20 font-medium  z-50'>
        
        {/* Logo */}
        {/* <h2 className='font-bold text-medium sm:text-2xl md:text-3xl lg:text-4xl'>Logo</h2> */}
         <img className='w-20 sm:w-25 md:32 lg:w-42' src={assets.diamond} alt="" />
          {/* <img src={assets.logo} className='mb-5 w-32' alt="" /> */}

        {/* Nav Links (Desktop only) */}
        <ul className='hidden sm:flex sm:gap-5  gap-10 text-black border-gray-400 px-3 py-4 text-2xl font-medium '>
          <NavLink to='/home' className="hover:text-blue-600">Home</NavLink>
          <NavLink to='/collection' className="hover:text-blue-600">Collection</NavLink>
          <NavLink to='/contact' className="hover:text-blue-600">Contact</NavLink>
          <NavLink to='/product' className="hover:text-blue-600">Product</NavLink>
        </ul>

        {/* Icons  */}
        <ul className='flex gap-3 sm:gap-3 md:gap-5 text-sm text-white'>
          <NavLink to="/cart" className="relative inline-block">
            <FaShoppingCart className=" text-2xl sm:text-3xl md:text-4xl  text-black" />
            <p className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium sm:font-bold px-1 py-0.5 rounded-full">
             { getcartcount()}
            </p>
          </NavLink>
           
          <FaSearch onClick={()=>setshowsearch(true)} className=" cursor-pointer text-2xl sm:text-3xl md:text-4xl   text-black " />
         
           {/* <NavLink to={"/a"} >
          <FaHeart className=" text-2xl sm:text-3xl md:text-4xl text-black " />
          </NavLink> */}
          
          <FaUser onClick={()=>navigate('/login')} className="cursor-pointer text-2xl sm:text-3xl md:text-4xl text-black" />
         

        </ul>

        {/* Menu Icon (Mobile only) */}
        {!isOpen &&(
        <button 
          onClick={() => setIsOpen(true)} 
          className="sm:hidden "
        >
          <FaBars className=" text-2xl  text-black"  />
        </button>)}
      </div>

      {/* Sidebar (Mobile) */}
     {/* Sidebar (Mobile) */}
<div
  className={`fixed top-0 right-0 h-full bg-white overflow-hidden z-51 transition-all duration-300 ease-in-out ${
    isOpen ? "w-2/4" : "w-0"
  }`}
>
  {/* Close Button */}
  {isOpen && (
    <button
      onClick={() => setIsOpen(false)}
      className="absolute sm:hidden top-4 right-0 text-black font-bold text-2xl"
    >
               <FaTimes className=" text-2xl    text-black"  />
    </button>
  )}

  {/* Sidebar Links */}
  <ul className={`flex flex-col gap-6 p-5 text-lg font-bold transition-opacity duration-200`}>
    <NavLink to="/home" onClick={() => setIsOpen(false)} >Home</NavLink>
    <NavLink to="/Collection" onClick={() => setIsOpen(false)} >Collection</NavLink>
    <NavLink to="/cart" onClick={() => setIsOpen(false)} >Cart</NavLink>
    <NavLink to="/product" onClick={() => setIsOpen(false)} >Product</NavLink>
  </ul>
</div>

      
    </>
  )
}

export default Navbar
