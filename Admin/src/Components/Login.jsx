import React, { useState } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Login = ({ settoken }) => {
  const [email, setemail]       = useState('')
  const [password, setpassword] = useState('')
  const [loading, setloading]   = useState(false)
  const [showpass, setshowpass] = useState(false)

  const onsubmithandler = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
      const response = await axios.post(
        backendurl + '/api/admin/login',
        { email, password }
      )
      if (response.data.success) {
        settoken(response.data.token)
        toast.success('Welcome back, ' + response.data.admin.name)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="  rounded-2xl flex items-center justify-center mt-4 sm:mx-auto mb-4">
  <img 
    className=" h-14 w-14 sm:w-30 sm:h-30 object-contain" 
    src={assets.logo} 
    alt="logo"
  />
          </div>
          <h1 className="text-base sm:text-2xl font-bold text-[#1a1a2e]">Diamond Collection Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to your admin panel</p>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-8 shadow-sm mb-4">
          <form onSubmit={onsubmithandler} className="space-y-5 ">

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setemail(e.target.value)}
                  placeholder="admin@diamondcollection.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#e8a87c] focus:ring-2 focus:ring-[#e8a87c]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </div>
                <input
                  type={showpass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#e8a87c] focus:ring-2 focus:ring-[#e8a87c]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setshowpass(!showpass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    {showpass
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Signing in...</>
                : 'Sign In'
              }
            </button>

          </form>
        </div>

      

      </div>
    </div>
  )
}

export default Login