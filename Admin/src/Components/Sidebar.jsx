// import React from 'react'
// import { assets } from '../assets/assets'
// import {NavLink} from "react-router-dom"
// const Sidebar = () => {
//   return (
//     <div className='w-[18%] min-h-screen border-r-2'>
//       <div className='flex flex-col gap-4 pt-6 pl-[20%] text-2xl'>
//         <NavLink className="flex items-center border border-gray-400 border-r-0 px-3 py-2 rounded-l" to="/add">
//           <img className='w-5 h-5' src={assets.add} alt="" />
//           <p className='hidden md:block'>Add Items</p>
//         </NavLink>
//          <NavLink className="flex items-center border border-gray-400 border-r-0 px-3 py-2 rounded-l" to="/list">
//           <img className='w-5 h-5' src={assets.list} alt="" />
//           <p className='hidden md:block'>Item list</p>
//         </NavLink>
//          <NavLink className="flex items-center border border-gray-400 border-r-0 px-3 py-2 rounded-l" to="/orders">
//           <img className='w-5 h-5' src={assets.orders} alt="" />
//           <p className='hidden md:block'>Orders</p>
//         </NavLink>
//       </div>
//     </div>
//   )
// }

// export default Sidebar

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Icon = ({ d, d2 }) => (
  <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d={d} />{d2 && <path d={d2} />}
  </svg>
)

const Sidebar = ({ settoken }) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    settoken('')
    toast.success('Logged out')
    navigate('/')
  }

  const groups = [
    {
      section: 'Main',
      items: [
        {
          to: '/dashboard', label: 'Dashboard',
          icon: <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        },
        {
          to: '/orders', label: 'Orders',
          icon: <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
        },
        {
          to: '/customers', label: 'Customers',
          icon: <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
        },
        {
  to: '/inventory', label: 'Inventory',
  icon: (
    <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </svg>
  )
},
      ]
    },
    {
      section: 'Catalog',
      items: [
        {
          to: '/categories', label: 'Categories',
          icon: <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="3" width="6" height="6" rx="1"/><rect x="9" y="3" width="6" height="6" rx="1"/><rect x="16" y="3" width="6" height="6" rx="1"/><rect x="2" y="12" width="6" height="6" rx="1"/><rect x="9" y="12" width="6" height="6" rx="1"/><rect x="16" y="12" width="6" height="6" rx="1"/></svg>
        },
        {
          to: '/list', label: 'All Products',
          icon: <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        },
      ]
    },
    {
      section: 'Storefront',
      items: [
        {
          to: '/slides', label: 'Home Slides', 
          icon: <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
        },
        {
          to: '/banners', label: 'Banners',
          icon: <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
        },
        {
          to: '/reviews', label: 'Reviews',
          icon: <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        },
      ]
    },
     {
      section: 'Admins Hub',
      items: [
       {
  to: '/admins', label: 'Admin Accounts',
  icon: (
    <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
},
       
      ]
    },
  ]

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-[230px]'} bg-[#1a1a2e] flex flex-col flex-shrink-0 transition-all duration-300 overflow-hidden`}>
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/8 flex items-center justify-between">
        {!collapsed && (
          <div>
            <div className="text-white text-sm font-semibold">Diamond Collection</div>
            <div className="text-white/35 text-[10px] mt-0.5">Home textiles</div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white/40 hover:text-white/80 transition-colors ml-auto">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {collapsed ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.section}>
            {!collapsed && (
              <div className="px-4 pt-3 pb-1 text-[9px] text-white/28 uppercase tracking-widest">
                {group.section}
              </div>
            )}
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 mx-2 my-0.5 px-3 py-2.5 rounded-lg transition-all duration-150 group
                  ${isActive ? 'bg-[#e8a87c]' : item.isNew ? 'bg-[rgba(232,168,124,0.15)] hover:bg-white/6' : 'hover:bg-white/6'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`${isActive ? 'text-white' : item.isNew ? 'text-[#e8a87c]' : 'text-white/50 group-hover:text-white/80'}`}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span className={`text-[12.5px] flex-1 ${isActive ? 'text-white font-medium' : item.isNew ? 'text-[#e8a87c] font-medium' : 'text-white/60 group-hover:text-white/85'}`}>
                          {item.label}
                        </span>
                        {item.isNew && (
                          <span className="bg-[#2e9e5b] text-white text-[9px] px-1.5 py-0.5 rounded-full font-semibold">New</span>
                        )}
                      </>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/8 p-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#e8a87c] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">A</span>
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium">Admin</div>
                <div className="text-white/35 text-[10px]">Super Admin</div>
              </div>
              <button onClick={logout} className="text-white/40 hover:text-red-400 transition-colors" title="Logout">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar