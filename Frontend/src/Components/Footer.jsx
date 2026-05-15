// import React from 'react'
// import { assets } from '../assets/assets'
// import { NavLink } from 'react-router-dom'
// import { useContext } from 'react'
// import { ShopContext } from '../../Context/Shopcontext'
// const Footer = () => {
//   const {siteSettings}= useContext(ShopContext)
//   return (
//     // <div className='sticky mb-0 w-full text-white bg-black flex flex-col sm:grid grid-cols-[3fr-1fr-1fr] gap-14 my-10 mt-40 text-sm '>
//         <div className=' mb-0  p-5    bg-gray-900 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] sm:gap-14 my-10 mt-10 text-sm'> 
//         <div >
//                  {/* <img className='w-12 sm:w-15 md:w-18 lg:w-20' src={assets.glogo} alt="" /> */}
//          <NavLink to="/">
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
// </NavLink>
//           {/* <img src={assets.logo} className='mb-5 w-32' alt="" /> */}
//           <p className='w-full md:w-2/3 text-white mt-4'>
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, voluptatum?</p>
//         </div>
//         <div>
//           <h4 className=' text-lg font-bold mb-5 mt-2 text-white'>Company</h4>
//           <ul className='flex flex-col gap-1 text-white'>
//             <li>Home</li>
//             <li>About</li>
//             <li>Contact</li>
//             <li>Prosuct</li>
//           </ul>
//         </div>
//         <div>
//           <h4 className=' text-lg font-bold mb-5 mt-2 text-white'>Get IN touch</h4>
//           <ul className='flex flex-col gap-1 text-white'>
//             <li>+92 324-9590***</li>
//             <li>Diamondcollection@gmail.com</li>
//             <li>Contact</li>
//             <li>Product</li>
//           </ul>
//         </div>
//       </div>
//     // </div>
//   )
// }

// export default Footer
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../../Context/Shopcontext'
import WhatsApp from "./Whatsapp"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const { siteSettings } = useContext(ShopContext)

  const year = new Date().getFullYear()

  return (
    <footer className='bg-gray-900 text-gray-300 mt-5  sm:mt-20'>

      {/* ── Main Footer ── */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-6 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-10 '>

        {/* Brand */}
        <div className='lg:col-span-1'>
          <NavLink to="/">
            {siteSettings?.logo ? (
              <img className='w-12 sm:w-16 lg:w-20 mb-4' src={siteSettings.logo} alt={siteSettings.storeName} />
            ) : (
              <img className=' w-12 sm:w-16 lg:w-20 mb-4' src={assets.glogo} alt="Diamond Collection" />
            )}
          </NavLink>
          <p className='text-sm leading-relaxed text-gray-400 mb-5'>
            Premium home textiles from Jhelum, Pakistan. Bringing comfort and elegance to every home.
          </p>
          {/* Social links */}
          <div className='flex gap-3'>
            {[
              {
    label: "Facebook",
    href: "https://www.facebook.com/share/18mreNmttq/",
    icon: <FaFacebookF className='text-2xl' />
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=8inglq1", 
    icon: <FaInstagram className='text-2xl' />
  },
  { 
    label: "WhatsApp",
    href: "https://wa.me/923249590143", // replace with your number
    icon: <FaWhatsapp className='text-2xl' />
  }            ].map(s => (
              <a key={s.label} href={s.href}
                className='w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200'>
                <svg className='w-4 h-4 text-gray-300' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className='text-white font-semibold text-sm uppercase tracking-widest sm:mb-5'>Quick Links</h4>
          <ul className='space-y-0.5 sm:space-y-2.5'>
            {[
              { label: 'Home',       to: '/'          },
              { label: 'Collection', to: '/collection' },
              { label: 'About Us',   to: '/about'     },
              { label: 'Contact Us', to: '/contact'   },
            ].map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className='text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200'
                >
                  <span className='w-1 h-1 rounded-full bg-blue-500 flex-shrink-0' />
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className='text-white font-semibold text-sm uppercase tracking-widest sm:mb-5'>Categories</h4>
          <ul className='space-y-0.5 sm:space-y-2.5'>
            {['Bedsheets', 'Quilts', 'Curtains', 'Cushions', 'Pillow Covers', 'Blankets'].map(cat => (
              <li key={cat}>
                <NavLink
                  to={`/collection?category=${cat}`}
                  className='text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200'
                >
                  <span className='w-1 h-1 rounded-full bg-blue-500 flex-shrink-0' />
                  {cat}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className='text-white font-semibold text-sm uppercase tracking-widest sm:mb-5'>Get In Touch</h4>
          <ul className='space-y-0.5 sm:space-y-2.5'>
            <li className='flex items-start gap-3'>
              <svg className='w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                <path d="M12 21s-6-5.686-6-10A6 6 0 0118 11c0 4.314-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>
              </svg>
              <span className='text-sm text-gray-400'>Jhelum, Punjab, Pakistan</span>
            </li>
            <li className='flex items-start gap-3'>
              <svg className='w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                <path d="M6.6 10.8a15.05 15.05 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.2 11.5 11.5 0 003.6 1.1 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.5 11.5 0 001.1 3.6 1 1 0 01-.2 1.1L6.6 10.8z"/>
              </svg>
              <span className='text-sm text-gray-400'>+92 300 1234567</span>
            </li>
            <li className='flex items-start gap-3'>
              <svg className='w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                <path d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
              </svg>
              <span className='text-sm text-gray-400'>support@diamondcollection.pk</span>
            </li>
            <li className='flex items-start gap-3'>
              <svg className='w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <div className='text-sm text-gray-400'>
                <p>Mon – Fri: 9AM – 6PM</p>
                <p>Sat: 10AM – 4PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className='border-t border-gray-800 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-5'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-gray-500'>
            © {year} <span className='text-gray-400 font-medium'>Diamond Collection</span>. All rights reserved.
          </p>
          <div className='flex items-center gap-4 text-xs text-gray-500'>
            <span>Privacy Policy</span>
            <span className='text-gray-700'>|</span>
            <span>Terms of Service</span>
            <span className='text-gray-700'>|</span>
            <span>Returns Policy</span>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
