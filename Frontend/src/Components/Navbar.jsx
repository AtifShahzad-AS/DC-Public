

import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, } from 'react-router-dom'
import { FaUser, FaHeart, FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"
import { ShopContext } from '../../Context/Shopcontext'
import {toast} from "react-toastify"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [drop, setdrop] = useState(false)
const {
  token,
  logoutUser,
  getcartcount,
  setshowsearch,
  navigate,
  wishlist,
  userProfile,
   siteSettings,
} = useContext(ShopContext);
  // const {token,settoken,getcartcount,setshowsearch,navigate,setcartitems,wishlist,setWishlist,userProfile}=useContext(ShopContext);

//   const logout = () => {
//   console.log("logout() called");
//   localStorage.removeItem("token");
//   settoken("");
//   setcartitems({});
//   setWishlist([]);
//   toast.success("Logged out");
//   navigate("/", { replace: true });
// };
const logout = () => {
  logoutUser();
  toast.success("Logged out");
  navigate("/", { replace: true });
};
  return (
    <>
      {/* Top Navbar */}
      <div className='fixed   top-0 w-full  flex items-center justify-between px-5 py-2   font-medium  z-50'>
        
        {/* Logo */}
         <img className='w-12 sm:w-15 md:17 lg:w-20 ' src={assets.glogo} alt="" />
          
{/* <NavLink to="/">
  {siteSettings.logo ? (
    <img
      className='w-12 sm:w-15 lg:w-20 object-contain'
      src={siteSettings.logo}
      alt={siteSettings.storeName}
    />
  ) : (
    // Fallback to your default logo asset
    <img
      className='w-12 sm:w-15 lg:w-20'
      src={assets.glogo}
      alt={siteSettings.storeName}
    />
  )}
</NavLink> */}


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

          {/* Wishlist */}
          <NavLink to="/wishlist" className="relative">
            <FaHeart className="text-2xl sm:text-3xl text-black"/>
            {wishlist?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {wishlist.length}
              </span>
            )}
          </NavLink>
           
          <FaSearch onClick={()=>setshowsearch(true)} className=" cursor-pointer text-2xl sm:text-3xl md:text-4xl   text-black " />
         
          {/* User Profile Icon / Image */}
          <div
            className="relative"
            onMouseEnter={() => setdrop(true)}
            onMouseLeave={() => setdrop(false)}
          >
            <div
              onMouseEnter={() => { token ? setdrop(true) : setdrop(false) }}
              onClick={() => token ? null : navigate('/login')}
              className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100"
            >
              {token && userProfile?.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-xl sm:text-2xl md:text-3xl text-black" />
              )}
            </div>

            {drop && (
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