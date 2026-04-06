import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Orders from './Pages/Orders'
import Dashboard from './Pages/Dashboard'
import HomeSlides from './Pages/Homeslides'
import Customers from './Pages/Customers'
import Categories from './Pages/Categories'
import Reviews from './Pages/Reviews'
import Banners from './Pages/Banners'
import Inventory from './Pages/Inventory'

import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import AdminManagement from './Pages/AdminManagement'

export const backendurl = import.meta.env.VITE_BACKEND_URL
export const currency = "Rs "

const App = () => {
  const [token, settoken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  )
  useEffect(() => { localStorage.setItem('token', token) }, [token])

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      <ToastContainer />
      {token === '' ? (
        <Login settoken={settoken} />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar settoken={settoken} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar settoken={settoken} />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard token={token} />} />
                <Route path="/categories" element={<Categories token={token} />} />
                <Route path="/categories/:categoryId/products/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/customers" element={<Customers token={token} />} />
                <Route path="/slides" element={<HomeSlides token={token} />} />
                <Route path="/reviews" element={<Reviews token={token} />} />
                <Route path="/banners" element={<Banners token={token} />} />
                <Route path='/admins' element={<AdminManagement token={token} />} />
                 <Route path='/inventory' element={<Inventory token={token} />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  )
}

export default App