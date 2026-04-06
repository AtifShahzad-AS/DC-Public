import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const AdminManagement = ({ token }) => {
  const [admins, setAdmins]             = useState([])
  const [loading, setLoading]           = useState(true)
  const [showForm, setShowForm]         = useState(false)
  const [name, setName]                 = useState('')
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [creating, setCreating]         = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        backendurl + '/api/admin/list',
        {},
        { headers: { token } }
      )
      if (data.success) {
        setAdmins(data.admins)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to load admins')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAdmins() }, [token])

  const handleCreate = async (e) => {
    e.preventDefault()
    setCreating(true)
    try {
      const { data } = await axios.post(
        backendurl + '/api/admin/create',
        { name, email, password },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Admin created successfully')
        setName(''); setEmail(''); setPassword('')
        setShowForm(false)
        fetchAdmins()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to create admin')
      console.log(err)
    } finally {
      setCreating(false)
    }
  }

  const handleToggle = async (adminId) => {
    try {
      const { data } = await axios.post(
        backendurl + '/api/admin/toggle',
        { adminId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        fetchAdmins()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to update admin')
    }
  }

  const roleBadge = (role) => ({
    superadmin: 'bg-purple-50 text-purple-700',
    manager:    'bg-blue-50 text-blue-700',
  }[role] || 'bg-gray-100 text-gray-600')

  const avatarColors = [
    { bg: '#f0eafd', text: '#7c3aed' },
    { bg: '#e8f0fe', text: '#1a4fa8' },
    { bg: '#e6f7ee', text: '#1a7a45' },
    { bg: '#fff4e5', text: '#b36b00' },
  ]

  const initials = (name) =>
    name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?'

  return (
    <div className="space-y-5">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { label: 'Total Admins',  value: admins.length },
          { label: 'Active',        value: admins.filter(a => a.isActive).length },
          { label: 'Inactive',      value: admins.filter(a => !a.isActive).length },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-black/5">
            <div className="text-xl font-bold text-[#1a1a2e]">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Main Card ── */}
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#1a1a2e]">Admin Accounts</h2>
            <p className="text-xs text-gray-400 mt-0.5">Only super admin can create or deactivate admins</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 bg-[#1a1a2e] text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-[#2a2a3e] transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Admin
          </button>
        </div>

        {/* ── Create Form ── */}
        {showForm && (
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-[#1a1a2e] mb-4">New Manager Details</p>
            <form onSubmit={handleCreate} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>
                  <label className="text-[11px] text-gray-500 font-medium mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Sara Ahmed"
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-[#1a1a2e] outline-none focus:border-[#e8a87c] bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 font-medium mb-1 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="sara@luxehome.com"
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-[#1a1a2e] outline-none focus:border-[#e8a87c] bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] text-gray-500 font-medium mb-1 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-9 text-xs text-[#1a1a2e] outline-none focus:border-[#e8a87c] bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        {showPassword
                          ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                          : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                        }
                      </svg>
                    </button>
                  </div>
                </div>

              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex items-center gap-1.5 bg-[#e8a87c] hover:bg-[#d4956a] text-white text-xs font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-60"
                >
                  {creating
                    ? <><div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>Creating...</>
                    : 'Create Admin'
                  }
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setName(''); setEmail(''); setPassword('') }}
                  className="bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Admins List ── */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-xs text-gray-400">Loading admins...</span>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {admins.map((admin, i) => {
              const av = avatarColors[i % avatarColors.length]
              return (
                <div
                  key={admin._id}
                  className="px-5 py-4 flex items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                      style={{ background: av.bg, color: av.text }}
                    >
                      {initials(admin.name)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-semibold text-[#1a1a2e]">{admin.name}</p>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${roleBadge(admin.role)}`}>
                          {admin.role}
                        </span>
                        {!admin.isActive && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-500">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{admin.email}</p>
                      <p className="text-[10px] text-gray-300 mt-0.5">
                        Created {admin.createdAt
                          ? new Date(admin.createdAt).toLocaleDateString('en-PK', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })
                          : '—'
                        }
                      </p>
                    </div>
                  </div>

                  {admin.role !== 'superadmin' ? (
                    <button
                      onClick={() => handleToggle(admin._id)}
                      className={`text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap
                        ${admin.isActive
                          ? 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                          : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                        }`}
                    >
                      {admin.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  ) : (
                    <span className="text-[10px] text-gray-300 italic">Protected</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}

export default AdminManagement