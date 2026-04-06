import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const Customers = ({ token }) => {
  const [customers, setCustomers]     = useState([])
  const [loading, setLoading]         = useState(true)
  const [search, setSearch]           = useState('')
  const [filter, setFilter]           = useState('all')
  const [selected, setSelected]       = useState(null)
  const [showDetail, setShowDetail]   = useState(false)
  const [stats, setStats]             = useState({ total: 0, newThisMonth: 0 })

  // ── Fetch all customers ──
  const fetchCustomers = async () => {
    try {
      setLoading(true)
     const { data } = await axios.post(
  backendurl + '/api/customer/list',
  {},
  { headers: { token } }
)
      if (data.success) {
        setCustomers(data.customers)
        setStats({
          total: data.customers.length,
          newThisMonth: data.customers.filter(c => {
            const created = new Date(c.createdAt)
            const now = new Date()
            return created.getMonth() === now.getMonth() &&
                   created.getFullYear() === now.getFullYear()
          }).length
        })
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to load customers')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCustomers() }, [token])

  // ── Delete ──
  const handleDelete = async (customerId) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return
    try {
      const { data } = await axios.post(
  backendurl + '/api/customer/delete',
  { customerId },
  { headers: { token } }
)
      if (data.success) {
        toast.success(data.message)
        setShowDetail(false)
        fetchCustomers()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to delete customer')
    }
  }

  // ── Block/Unblock ──
  const handleToggleBlock = async (customerId) => {
    try {
      const { data } = await axios.post(
  backendurl + '/api/customer/block',
  { customerId },
  { headers: { token } }
)
      if (data.success) {
        toast.success(data.message)
        fetchCustomers()
        if (selected?._id === customerId) {
          setSelected(prev => ({ ...prev, isBlocked: data.isBlocked }))
        }
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to update customer status')
    }
  }

  // ── Filtered list ──
  const filtered = customers.filter(c => {
    const matchSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search)

    const matchFilter =
      filter === 'all'      ? true :
      filter === 'blocked'  ? c.isBlocked :
      filter === 'active'   ? !c.isBlocked :
      filter === 'google'   ? !!c.googleId :
      true

    return matchSearch && matchFilter
  })

  // ── Avatar initials ──
  const initials = (name) =>
    name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?'

  // ── Avatar color by index ──
  const avatarColors = [
    { bg: '#e8f0fe', text: '#1a4fa8' },
    { bg: '#e6f7ee', text: '#1a7a45' },
    { bg: '#fff4e5', text: '#b36b00' },
    { bg: '#fce8e8', text: '#a82222' },
    { bg: '#f0eafd', text: '#7c3aed' },
    { bg: '#e1f5ee', text: '#0f6e56' },
  ]

  return (
    <div className="space-y-5">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Customers', value: stats.total,        bg: '#e8f0fe', color: '#1a4fa8', icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></> },
          { label: 'New This Month',  value: stats.newThisMonth, bg: '#e6f7ee', color: '#1a7a45', icon: <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></> },
          { label: 'Active',          value: customers.filter(c => !c.isBlocked).length, bg: '#fff4e5', color: '#b36b00', icon: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></> },
          { label: 'Blocked',         value: customers.filter(c => c.isBlocked).length,  bg: '#fce8e8', color: '#a82222', icon: <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></> },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-black/5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <svg className="w-4 h-4" fill="none" stroke={s.color} strokeWidth={2} viewBox="0 0 24 24">{s.icon}</svg>
            </div>
            <div className="text-xl font-bold text-[#1a1a2e]">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <h2 className="text-sm font-semibold text-[#1a1a2e]">All Customers</h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 flex-1 sm:w-56">
              <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search name, email, phone..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-xs text-gray-600 outline-none w-full placeholder-gray-400"
              />
            </div>
            {/* Filter tabs */}
            <div className="flex gap-1">
              {['all','active','blocked','google'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`text-[11px] px-3 py-1.5 rounded-lg font-medium capitalize transition-colors
                    ${filter === f ? 'bg-[#1a1a2e] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-xs text-gray-400">Loading customers...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
            <p className="text-sm text-gray-400">No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-50">
                  {['Customer','Email','Phone','Joined','Type','Status','Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] text-gray-400 uppercase tracking-wide font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer, i) => {
                  const av = avatarColors[i % avatarColors.length]
                  return (
                    <tr key={customer._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      {/* Customer */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                            style={{ background: av.bg, color: av.text }}>
                            {customer.profileImage || customer.googleImage
                              ? <img src={customer.profileImage || customer.googleImage} alt="" className="w-8 h-8 rounded-full object-cover"/>
                              : initials(customer.name)
                            }
                          </div>
                          <div>
                            <p className="font-medium text-[#1a1a2e]">{customer.name}</p>
                            <p className="text-[10px] text-gray-400">{customer._id.slice(-8)}</p>
                          </div>
                        </div>
                      </td>
                      {/* Email */}
                      <td className="px-5 py-3 text-gray-500 max-w-[180px] truncate">{customer.email}</td>
                      {/* Phone */}
                      <td className="px-5 py-3 text-gray-500">{customer.phone || '—'}</td>
                      {/* Joined */}
                      <td className="px-5 py-3 text-gray-400 whitespace-nowrap">
                        {customer.createdAt
                          ? new Date(customer.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'
                        }
                      </td>
                      {/* Type */}
                      <td className="px-5 py-3">
                        {customer.googleId
                          ? <span className="bg-blue-50 text-blue-600 text-[10px] font-medium px-2 py-0.5 rounded-full">Google</span>
                          : <span className="bg-gray-100 text-gray-500 text-[10px] font-medium px-2 py-0.5 rounded-full">Email</span>
                        }
                      </td>
                      {/* Status */}
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1 w-fit text-[10px] font-medium px-2 py-0.5 rounded-full
                          ${customer.isBlocked ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${customer.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}></span>
                          {customer.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          {/* View detail */}
                          <button
                            onClick={() => { setSelected(customer); setShowDetail(true) }}
                            className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-colors"
                            title="View details"
                          >
                            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                          </button>
                          {/* Block/Unblock */}
                          <button
                            onClick={() => handleToggleBlock(customer._id)}
                            className={`w-7 h-7 border rounded-lg flex items-center justify-center transition-colors
                              ${customer.isBlocked
                                ? 'bg-green-50 border-green-200 hover:bg-green-100'
                                : 'bg-gray-50 border-gray-200 hover:bg-orange-50 hover:border-orange-300'
                              }`}
                            title={customer.isBlocked ? 'Unblock' : 'Block'}
                          >
                            <svg className={`w-3.5 h-3.5 ${customer.isBlocked ? 'text-green-600' : 'text-orange-500'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              {customer.isBlocked
                                ? <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>
                                : <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>
                              }
                            </svg>
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(customer._id)}
                            className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer count */}
        {!loading && (
          <div className="px-5 py-3 border-t border-gray-50 text-[10px] text-gray-400">
            Showing {filtered.length} of {customers.length} customers
          </div>
        )}
      </div>

      {/* ══════════════════════════════════
          CUSTOMER DETAIL DRAWER
      ══════════════════════════════════ */}
      {showDetail && selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowDetail(false)}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
          <div
            className="relative bg-white w-full max-w-sm h-full shadow-xl overflow-y-auto flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-sm font-semibold text-[#1a1a2e]">Customer Details</h2>
              <button onClick={() => setShowDetail(false)}
                className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Profile */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold flex-shrink-0"
                  style={{ background: '#e8f0fe', color: '#1a4fa8' }}>
                  {selected.profileImage || selected.googleImage
                    ? <img src={selected.profileImage || selected.googleImage} alt="" className="w-14 h-14 rounded-full object-cover"/>
                    : initials(selected.name)
                  }
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{selected.name}</p>
                  <p className="text-xs text-gray-400">{selected.email}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full
                      ${selected.isBlocked ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${selected.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}></span>
                      {selected.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                    {selected.googleId && (
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-medium px-2 py-0.5 rounded-full">Google</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Info rows */}
              {[
                { label: 'Phone',   value: selected.phone || '—' },
                { label: 'Joined',  value: selected.createdAt ? new Date(selected.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
                { label: 'User ID', value: selected._id },
                { label: 'Wishlist items', value: selected.wishlist?.length || 0 },
              ].map((row, i) => (
                <div key={i} className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-400">{row.label}</span>
                  <span className="text-xs font-medium text-[#1a1a2e] text-right max-w-[180px] break-all">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            {selected.shippingAddress?.address && (
              <div className="p-5 border-b border-gray-100">
                <p className="text-xs font-semibold text-[#1a1a2e] mb-3">Shipping Address</p>
                {[
                  { label: 'Full Name',  value: selected.shippingAddress.fullName },
                  { label: 'Phone',      value: selected.shippingAddress.phone },
                  { label: 'Address',    value: selected.shippingAddress.address },
                  { label: 'City',       value: selected.shippingAddress.city },
                  { label: 'State',      value: selected.shippingAddress.state },
                  { label: 'Postal',     value: selected.shippingAddress.postalCode },
                  { label: 'Country',    value: selected.shippingAddress.country },
                ].filter(r => r.value).map((row, i) => (
                  <div key={i} className="flex items-start justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-[11px] text-gray-400">{row.label}</span>
                    <span className="text-[11px] font-medium text-[#1a1a2e] text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="p-5 mt-auto space-y-2">
              <button
                onClick={() => handleToggleBlock(selected._id)}
                className={`w-full py-2.5 rounded-xl text-xs font-medium transition-colors
                  ${selected.isBlocked
                    ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                    : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100'
                  }`}
              >
                {selected.isBlocked ? 'Unblock Customer' : 'Block Customer'}
              </button>
              <button
                onClick={() => handleDelete(selected._id)}
                className="w-full py-2.5 rounded-xl text-xs font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
              >
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Customers