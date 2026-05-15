

import React, { useState,useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FiMail } from 'react-icons/fi'
import {MdDashboard,
  MdShoppingCart, MdPeople,MdInventory,MdCategory,MdStorefront,MdSlideshow,MdViewCarousel,MdReviews,
  MdAdminPanelSettings,
  MdList} from 'react-icons/md'
import { FiSettings,FiBox, } from 'react-icons/fi'

import { backendurl } from '../App'

const Icon = ({ d, d2 }) => (
  <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d={d} />{d2 && <path d={d2} />}
  </svg>
)

const Sidebar = ({ settoken }) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [siteName, setSiteName] = useState('Diamond Collection')
const [siteLogo, setSiteLogo] = useState('')

useEffect(() => {
  const fetchSettings = async () => {
    try {
      const { data } = await axios.post(backendurl + '/api/settings/get')
      if (data.success) {
        setSiteName(data.settings.storeName || 'Diamond Collection')
        setSiteLogo(data.settings.logo || '')
      }
    } catch (err) { console.log(err) }
  }
  fetchSettings()
}, [])


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
          to: '/dashboard', label: 'Dashboard', icon:<MdDashboard/>
        },
        {
          to: '/orders', label: 'Orders',icon:<MdShoppingCart/>
        },
        {
          to: '/customers', label: 'Customers',icon:<MdPeople/>
        },
        {
  to: '/inventory', label: 'Inventory',icon:<MdInventory/>
 
},
      ]
    },
    {
      section: 'Catalog',
      items: [
        {
          to: '/categories', label: 'Categories',icon:<MdCategory/>
        },
        {
          to: '/list', label: 'All Products',icon:<MdStorefront/>
        },
      ]
    },
    {
      section: 'Storefront',
      items: [
        {
          to: '/slides', label: 'Home Slides', icon:<MdSlideshow/>
        },
        {
          to: '/banners', label: 'Banners',icon:<MdViewCarousel/>
        },
        {
          to: '/reviews', label: 'Reviews',icon:<MdReviews/>
        },
      ]
    },
     {
      section: 'Admins Hub',
      items: [
       {
  to: '/admins', label: 'Admin Accounts',icon:<MdAdminPanelSettings/>
  
},
{ label: "Messages", to: "/contacts", icon: <FiMail /> },
{
      
  to: '/settings', label: 'Settings', icon: <FiSettings/>
  }
       
      ]
    },
  ]

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-[230px]'} bg-[#1a1a2e] flex flex-col flex-shrink-0 transition-all duration-300 overflow-hidden`}>
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/8 flex items-center justify-between">
        {!collapsed && (
          // <div>
          //   <div className="text-white text-sm font-semibold">Diamond Collection</div>
          //   <div className="text-white/35 text-[10px] mt-0.5">Home textiles</div>
          // </div>
            <div className="flex items-center gap-2">
    {siteLogo
      ? <img src={siteLogo.logo} className="h-7 object-contain" alt={siteName.storeName} />
      : null
    }
    <div>
      <div className="text-white text-sm font-semibold">{siteName} Admin</div>
      <div className="text-white/35 text-[10px] mt-0.5">Home textiles</div>
    </div>
  </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white/40 hover:text-white/80 transition-colors ml-auto">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {collapsed ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto scrollbar-hide">
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
                {/* <div className="text-white/35 text-[10px]">Super Admin</div> */}
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