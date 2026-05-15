

// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate, } from 'react-router-dom'
// import { FaUser, FaHeart, FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"
// import { ShopContext } from '../../Context/Shopcontext'
// import {toast} from "react-toastify"


// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [drop, setdrop] = useState(false)
// const {
//   token,
//   logoutUser,
//   getcartcount,
//   setshowsearch,
//   navigate,
//   wishlist,
//   userProfile,
//    siteSettings,
// } = useContext(ShopContext);
//   // const {token,settoken,getcartcount,setshowsearch,navigate,setcartitems,wishlist,setWishlist,userProfile}=useContext(ShopContext);

// //   const logout = () => {
// //   console.log("logout() called");
// //   localStorage.removeItem("token");
// //   settoken("");
// //   setcartitems({});
// //   setWishlist([]);
// //   toast.success("Logged out");
// //   navigate("/", { replace: true });
// // };
// const logout = () => {
//   logoutUser();
//   toast.success("Logged out");
//   navigate("/", { replace: true });
// };
//   return (
//     <>
//       {/* Top Navbar */}
//       <div className='fixed   top-0 w-full  flex items-center justify-between px-5 py-2   font-medium  z-50'>
        
//         {/* Logo */}
//          <img className='w-12 sm:w-15 md:17 lg:w-20 ' src={assets.glogo} alt="" />
          
// {/* <NavLink to="/">
//   {siteSettings.logo ? (
//     <img
//       className='w-12 sm:w-15 lg:w-20 object-contain'
//       src={siteSettings.logo}
//       alt={siteSettings.storeName}
//     />
//   ) : (
//     // Fallback to your default logo asset
//     <img
//       className='w-12 sm:w-15 lg:w-20'
//       src={assets.glogo}
//       alt={siteSettings.storeName}
//     />
//   )}
// </NavLink> */}


//         {/* Nav Links (Desktop only) */}
//         <ul className='hidden  sm:flex sm:gap-7 md:gap-10   text-black border-gray-400  px-7 py-4 text-lg font-medium xl:text-xl xl:gap-20  backdrop-blur-lg rounded-full '>
//            <NavLink to="/" className={({ isActive }) =>  isActive
//       ? "text-blue-600 border-b-2 border-b-blue-600  "
//       : "hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600"
//   }
// >
//   Home
// </NavLink>
//   <NavLink to="/collection" className={({ isActive }) =>  isActive
//       ? "text-blue-600 border-b-2 border-b-blue-600  "
//       : "hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600"
//   }
// >
//   Collection
// </NavLink>
//   <NavLink to="/contact" className={({ isActive }) =>  isActive
//       ? "text-blue-600 border-b-2 border-b-blue-600  "
//       : "hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600"
//   }
// >
//   Contact
// </NavLink>
//   <NavLink to="/about" className={({ isActive }) =>  isActive
//       ? "text-blue-600 border-b-2 border-b-blue-600  "
//       : "hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600"
//   }
// >
//   About
// </NavLink>

//         </ul>

//         {/* Icons  */}
//         <ul className='flex gap-3 sm:gap-3 md:gap-5 text-sm text-white'>
//           <NavLink to="/cart" className="relative inline-block">
//             <FaShoppingCart className=" text-2xl sm:text-3xl md:text-4xl  text-black" />
//             <p className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium sm:font-bold px-1 py-0.5 rounded-full">
//              { getcartcount()}
//             </p>
//           </NavLink>

//           {/* Wishlist */}
//           <NavLink to="/wishlist" className="relative">
//             <FaHeart className="text-2xl sm:text-3xl text-black"/>
//             {wishlist?.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
//                 {wishlist.length}
//               </span>
//             )}
//           </NavLink>
           
//           <FaSearch onClick={()=>setshowsearch(true)} className=" cursor-pointer text-2xl sm:text-3xl md:text-4xl   text-black " />
         
//           {/* User Profile Icon / Image */}
//           <div
//             className="relative"
//             onMouseEnter={() => setdrop(true)}
//             onMouseLeave={() => setdrop(false)}
//           >
//             <div
//               onMouseEnter={() => { token ? setdrop(true) : setdrop(false) }}
//               onClick={() => token ? null : navigate('/login')}
//               className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100"
//             >
//               {token && userProfile?.profileImage ? (
//                 <img
//                   src={userProfile.profileImage}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <FaUser className="text-xl sm:text-2xl md:text-3xl text-black" />
//               )}
//             </div>

//             {drop && (
//               <div className="absolute right-0 pt-2 w-40 bg-white border rounded-md shadow-lg">
//                 <ul className="py-2 text-sm text-gray-700">
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => navigate("/profile")}
//                   >
//                     Profile
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => navigate("/orders")}
//                   >
//                     Orders
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={logout}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>

//         </ul>

//         {/* Menu Icon (Mobile only) */}
//         {!isOpen &&(
//         <button 
//           onClick={() => setIsOpen(true)} 
//           className="sm:hidden "
//         >
//           <FaBars className=" text-2xl  text-black"  />
//         </button>)}
//       </div>

//       {/* Sidebar (Mobile) */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-white overflow-hidden z-51 transition-all duration-300 ease-in-out ${
//           isOpen ? "w-2/4" : "w-0"
//         }`}
//       >
//         {/* Close Button */}
//         {isOpen && (
//           <button
//             onClick={() => setIsOpen(false)}
//             className="absolute sm:hidden top-4 right-0 text-black font-bold text-2xl"
//           >
//             <FaTimes className=" text-2xl    text-black"  />
//           </button>
//         )}

//         {/* Sidebar Links */}
//         <ul className={`flex flex-col gap-6 p-5 text-lg font-bold transition-opacity duration-200`}>
//           <NavLink to="/" onClick={() => setIsOpen(false)} >Home</NavLink>
//           <NavLink to="/Collection" onClick={() => setIsOpen(false)} >Collection</NavLink>
//           <NavLink to="/cart" onClick={() => setIsOpen(false)} >Cart</NavLink>
//           <NavLink to="/product" onClick={() => setIsOpen(false)} >Product</NavLink>
//         </ul>
//       </div>
//     </>
//   )
// }

// export default Navbar

import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { FaUser, FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa"
import { ShopContext } from '../../Context/Shopcontext'
import { toast } from "react-toastify"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [drop, setdrop]     = useState(false)

  const {
    token, logoutUser, getcartcount,
    setshowsearch, navigate,
    wishlist, userProfile, siteSettings,
  } = useContext(ShopContext)

  const logout = () => {
    logoutUser()
    toast.success("Logged out")
    navigate("/", { replace: true })
    setIsOpen(false)
  }

  const navLinks = [
    { to: "/",           label: "Home"       },
    { to: "/collection", label: "Collection" },
    { to: "/contact",    label: "Contact"    },
    { to: "/about",      label: "About Us"      },
  ]

  const activeCls   = "text-blue-600 border-b-2 border-blue-600"
  const inactiveCls = "hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors"

  return (
    <>
      {/* ── Top Navbar ── */}
      <div className='fixed top-0 w-full flex items-center justify-between px-5 py-2 font-medium z-50 bg-white/80 backdrop-blur-md shadow-sm'>

        {/* Logo */}
        <NavLink to="/">
          {siteSettings?.logo ? (
            <img className='w-12 sm:w-16 lg:w-20 object-contain' src={siteSettings.logo} alt={siteSettings.storeName} />
          ) : (
            <img className='w-12 sm:w-16 lg:w-20' src={assets.glogo} alt="Logo" />
          )}
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className='hidden sm:flex sm:gap-7 md:gap-10 xl:gap-16 text-black px-7 py-4 text-base font-medium xl:text-lg   rounded-3xl'>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => isActive ? activeCls : inactiveCls}
            >
              {link.label}
            </NavLink>
          ))}
        </ul>

        {/* Desktop Icons */}
        <ul className='hidden sm:flex gap-3 md:gap-5 items-center'>
          <NavLink to="/cart" className="relative">
            <FaShoppingCart className="text-2xl md:text-3xl text-black  hover:text-blue-600" />
            {getcartcount() > 0 && (
              <p className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                {getcartcount()}
              </p>
            )}
          </NavLink>

          <NavLink to="/wishlist" className="relative">
            <FaHeart className="text-2xl md:text-3xl text-black  hover:text-blue-600" />
            {wishlist?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full leading-none">
                {wishlist.length}
              </span>
            )}
          </NavLink>

          <FaSearch
            onClick={() => setshowsearch(true)}
            className="cursor-pointer text-2xl md:text-3xl text-black hover:text-blue-600"
          />

          {/* Profile dropdown */}
          <div
            className="relative"
            onMouseEnter={() => token && setdrop(true)}
            onMouseLeave={() => setdrop(false)}
          >
            <div
              onClick={() => !token && navigate('/login')}
              className="cursor-pointer w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-100"
            >
              {token && userProfile?.profileImage ? (
                <img src={userProfile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FaUser className="text-xl text-black" />
              )}
            </div>

            {drop && token && (
              <div className="absolute right-0 pt-2 w-44 z-50">
                <div className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                  <ul className="py-1 text-sm text-gray-700">
                    <li onClick={() => { navigate("/profile"); setdrop(false) }}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
                      <FaUser className="text-xs" /> Profile
                    </li>
                    <li onClick={() => { navigate("/orders"); setdrop(false) }}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                        <rect x="9" y="3" width="6" height="4" rx="1"/>
                      </svg>
                      Orders
                    </li>
                    <li onClick={() => { navigate("/wishlist"); setdrop(false) }}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
                      <FaHeart className="text-xs" /> Wishlist
                    </li>
                    <div className="border-t border-gray-100 mx-3 my-1" />
                    <li onClick={logout}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors text-red-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                      </svg>
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </ul>

        {/* Mobile right icons + hamburger */}
        <div className='flex sm:hidden items-center gap-3'>
          <NavLink to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-black" />
            {getcartcount() > 0 && (
              <p className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {getcartcount()}
              </p>
            )}
          </NavLink>

          <FaSearch onClick={() => setshowsearch(true)} className="cursor-pointer text-2xl text-black" />

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          >
            <span className={`block h-0.5 w-6 bg-black rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-black rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-black rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── Mobile Sidebar ── */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 sm:hidden shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Sidebar header */}
        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
          <img className='w-12 object-contain' src={siteSettings?.logo || assets.glogo} alt="Logo" />
          <button onClick={() => setIsOpen(false)} className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul className='flex flex-col px-4 py-4 gap-1'>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </ul>

        <div className='border-t border-gray-100 mx-4' />

        {/* User section */}
        <div className='px-4 py-4 space-y-1'>
          {token ? (
            <>
              {/* Profile info */}
              <div className='flex items-center gap-3 px-4 py-3 mb-2'>
                <div className='w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0'>
                  {userProfile?.profileImage ? (
                    <img src={userProfile.profileImage} className='w-full h-full object-cover' alt="" />
                  ) : (
                    <FaUser className='text-gray-500' />
                  )}
                </div>
                <div className='min-w-0'>
                  <p className='text-sm font-semibold text-gray-800 truncate'>
                    {userProfile?.name || 'My Account'}
                  </p>
                  <p className='text-xs text-gray-400 truncate'>{userProfile?.email}</p>
                </div>
              </div>

              {[
                { label: 'Profile',  to: '/profile'  },
                { label: 'Orders',   to: '/orders'   },
                { label: 'Wishlist', to: '/wishlist' },
              ].map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors'
                >
                  {item.label}
                </NavLink>
              ))}

              <div className='border-t border-gray-100 my-2' />

              <button
                onClick={logout}
                className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors'
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { navigate('/login'); setIsOpen(false) }}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors'
            >
              Login / Register
            </button>
          )}
        </div>

        {/* Wishlist count in sidebar */}
        {token && wishlist?.length > 0 && (
          <div className='absolute bottom-6 left-0 right-0 px-4'>
            <NavLink to="/wishlist" onClick={() => setIsOpen(false)}
              className='flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-4 py-3'>
              <div className='flex items-center gap-2 text-sm text-red-600 font-medium'>
                <FaHeart className='text-red-500' />
                Wishlist
              </div>
              <span className='bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full'>
                {wishlist.length}
              </span>
            </NavLink>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar