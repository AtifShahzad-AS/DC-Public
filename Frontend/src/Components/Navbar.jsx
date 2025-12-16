
import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, } from 'react-router-dom'
import { FaUser, FaHeart, FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"
import { ShopContext } from '../../Context/Shopcontext'
import {toast} from "react-toastify"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [drop, setdrop] = useState(false)

  const {token,settoken,getcartcount,setshowsearch,navigate,setcartitems}=useContext(ShopContext);
  // const logout=()=>{
  //   localStorage.removeItem('token')
  //   settoken('')

  //    setcartitems({}) // clear cart 
  // navigate('/'); 

  // toast.success("Logged out successfully");
  // }
  const logout = () => {
  console.log("logout() called");
  localStorage.removeItem("token");
  console.log("removed token from localStorage");
  settoken("");
  console.log("settoken('') called");
  setcartitems({});
  console.log("setcartitems({}) called");
  toast.success("Logged out");
  console.log("toast shown");
  navigate("/", { replace: true });
  console.log("navigate called");
};

  return (
    <>
      {/* Top Navbar */}
      <div className='fixed top-0 w-full  flex items-center justify-between px-5 py-2   font-medium  z-50'>
        
        {/* Logo */}
        {/* <h4  className='font-bold text-medium sm:text-2xl md:text-3xl lg:text-4xl'>Diamond Collection</h4> */}
         <img className='w-12 sm:w-15 md:17 lg:w-20 ' src={assets.glogo} alt="" />
          {/* <img src={assets.logo} className='mb-5 w-32' alt="" /> */}

        {/* Nav Links (Desktop only) */}
        <ul className='hidden  sm:flex sm:gap-7 md:gap-10   text-black border-gray-400  px-7 py-4 text-lg font-medium xl:text-xl xl:gap-20  backdrop-blur-lg rounded-full '>
           <NavLink to="/" className={({ isActive }) =>  isActive
      ? "text-blue-600 border-b-2 border-b-blue-600  "
      : "hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600"
  }
>
  Home
</NavLink>
  <NavLink to="/collection" className={({ isActive }) =>  isActive
      ? "text-blue-600 border-b-2 border-b-blue-600  "
      : "hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600"
  }
>
  Collection
</NavLink>
  <NavLink to="/contact" className={({ isActive }) =>  isActive
      ? "text-blue-600 border-b-2 border-b-blue-600  "
      : "hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600"
  }
>
  Contact
</NavLink>
  <NavLink to="/about" className={({ isActive }) =>  isActive
      ? "text-blue-600 border-b-2 border-b-blue-600  "
      : "hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600"
  }
>
  About
</NavLink>

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
         <div
        className="relative"
        onMouseEnter={() => setdrop(true)}
        onMouseLeave={() => setdrop(false)}
      >
        <FaUser onMouseEnter={()=>{token ? setdrop(true) : setdrop(false)}} onClick={()=>token ? null : navigate('/login')}  className="cursor-pointer text-2xl sm:text-3xl md:text-4xl text-black" />
       {/* if(token){}else {} */}
        {drop &&  (
          <div className="absolute right-0 pt-2 w-40 bg-white border rounded-md shadow-lg">
            <ul className="py-2 text-sm text-gray-700">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/orders")}
              >
                Orders
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

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
    <NavLink to="/" onClick={() => setIsOpen(false)} >Home</NavLink>
    <NavLink to="/Collection" onClick={() => setIsOpen(false)} >Collection</NavLink>
    <NavLink to="/cart" onClick={() => setIsOpen(false)} >Cart</NavLink>
    <NavLink to="/product" onClick={() => setIsOpen(false)} >Product</NavLink>
  </ul>
</div>

      
    </>
  )
}

export default Navbar
