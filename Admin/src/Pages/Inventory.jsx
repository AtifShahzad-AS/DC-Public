import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const Inventory = ({ token }) => {
  const [products, setProducts]     = useState([])
  const [stats, setStats]           = useState({ total: 0, lowStock: 0, outOfStock: 0, healthy: 0 })
  const [loading, setLoading]       = useState(true)
  const [filter, setFilter]         = useState('all')
  const [search, setSearch]         = useState('')
  const [editId, setEditId]         = useState(null)
  const [editStock, setEditStock]   = useState('')
  const [editThreshold, setEditThreshold] = useState('')
  const [saving, setSaving]         = useState(false)

  const fetchInventory = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        backendurl + '/api/inventory/list',
        {},
        { headers: { token } }
      )
      if (data.success) {
        setProducts(data.products)
        setStats(data.stats)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to load inventory')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchInventory() }, [token])

  const handleUpdateStock = async (productId) => {
    if (editStock === '') { toast.error('Enter a stock value'); return }
    setSaving(true)
    try {
      const { data } = await axios.post(
        backendurl + '/api/inventory/update',
        {
          productId,
          stock:         parseInt(editStock),
          lowStockAlert: editThreshold !== '' ? parseInt(editThreshold) : undefined,
        },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Stock updated')
        setEditId(null)
        setEditStock('')
        setEditThreshold('')
        fetchInventory()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to update stock')
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (product) => {
    setEditId(product._id)
    setEditStock(String(product.stock))
    setEditThreshold(String(product.lowStockAlert))
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditStock('')
    setEditThreshold('')
  }

  const getStockStatus = (product) => {
    if (product.stock === 0)                         return { label: 'Out of Stock', color: 'bg-red-50 text-red-600',    dot: 'bg-red-500' }
    if (product.stock <= product.lowStockAlert)      return { label: 'Low Stock',    color: 'bg-yellow-50 text-yellow-700', dot: 'bg-yellow-500' }
    return                                                  { label: 'In Stock',     color: 'bg-green-50 text-green-700',  dot: 'bg-green-500' }
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ||
                        p.category?.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'all'        ? true :
      filter === 'out'        ? p.stock === 0 :
      filter === 'low'        ? p.stock > 0 && p.stock <= p.lowStockAlert :
      filter === 'healthy'    ? p.stock > p.lowStockAlert :
      true
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-5">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Products', value: stats.total,      bg: '#e8f0fe', color: '#1a4fa8' },
          { label: 'Healthy Stock',  value: stats.healthy,    bg: '#e6f7ee', color: '#1a7a45' },
          { label: 'Low Stock',      value: stats.lowStock,   bg: '#fff4e5', color: '#b36b00' },
          { label: 'Out of Stock',   value: stats.outOfStock, bg: '#fce8e8', color: '#a82222' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-black/5">
            <div className="w-9 h-9 rounded-lg mb-3 flex items-center justify-center"
              style={{ background: s.bg }}>
              <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
            </div>
            <div className="text-xl font-bold text-[#1a1a2e]">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Alert Banner ── */}
      {(stats.outOfStock > 0 || stats.lowStock > 0) && (
        <div className={`rounded-xl p-4 border flex items-start gap-3
          ${stats.outOfStock > 0
            ? 'bg-red-50 border-red-200'
            : 'bg-yellow-50 border-yellow-200'
          }`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
            ${stats.outOfStock > 0 ? 'bg-red-100' : 'bg-yellow-100'}`}>
            <svg className={`w-4 h-4 ${stats.outOfStock > 0 ? 'text-red-600' : 'text-yellow-600'}`}
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <p className={`text-sm font-semibold ${stats.outOfStock > 0 ? 'text-red-700' : 'text-yellow-700'}`}>
              {stats.outOfStock > 0
                ? `${stats.outOfStock} product${stats.outOfStock > 1 ? 's' : ''} out of stock — email alert sent`
                : `${stats.lowStock} product${stats.lowStock > 1 ? 's' : ''} running low on stock`
              }
            </p>
            <p className={`text-xs mt-0.5 ${stats.outOfStock > 0 ? 'text-red-500' : 'text-yellow-600'}`}>
              Update stock levels below to resolve these alerts
            </p>
          </div>
        </div>
      )}

      {/* ── Main Table ── */}
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#1a1a2e]">Inventory Management</h2>
            <p className="text-xs text-gray-400 mt-0.5">Update stock · Set thresholds · Track alerts</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 flex-1 sm:w-52">
              <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-xs text-gray-600 outline-none w-full placeholder-gray-400"
              />
            </div>
            {/* Filter */}
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="border border-gray-100 bg-gray-50 text-xs text-gray-600 rounded-lg px-2 py-2 outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="healthy">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
            {/* Refresh */}
            <button
              onClick={fetchInventory}
              className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              title="Refresh"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin" />
            <span className="ml-2 text-xs text-gray-400">Loading inventory...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-xs">No products found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-50">
                  {['Product', 'Category', 'Current Stock', 'Threshold', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] text-gray-400 uppercase tracking-wide font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => {
                  const status   = getStockStatus(product)
                  const isEditing = editId === product._id
                  return (
                    <tr key={product._id} className={`border-b border-gray-50 transition-colors ${isEditing ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}>

                      {/* Product */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            {product.image?.[0]
                              ? <img src={product.image[0]} alt="" className="w-full h-full object-cover" />
                              : <div className="w-full h-full bg-gray-200" />
                            }
                          </div>
                          <p className="font-medium text-[#1a1a2e] max-w-[140px] truncate">{product.name}</p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-3 text-gray-500">{product.category}</td>

                      {/* Stock */}
                      <td className="px-5 py-3">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editStock}
                            onChange={e => setEditStock(e.target.value)}
                            min={0}
                            className="w-20 border border-blue-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500 bg-white text-center font-semibold"
                          />
                        ) : (
                          <span className={`font-bold text-sm ${product.stock === 0 ? 'text-red-600' : product.stock <= product.lowStockAlert ? 'text-yellow-600' : 'text-[#1a1a2e]'}`}>
                            {product.stock}
                          </span>
                        )}
                      </td>

                      {/* Threshold */}
                      <td className="px-5 py-3">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editThreshold}
                            onChange={e => setEditThreshold(e.target.value)}
                            min={1}
                            className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-300 bg-white text-center"
                          />
                        ) : (
                          <span className="text-gray-500">{product.lowStockAlert} units</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1 w-fit text-[10px] font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3">
                        {isEditing ? (
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleUpdateStock(product._id)}
                              disabled={saving}
                              className="flex items-center gap-1 bg-[#1a1a2e] text-white text-[10px] font-medium px-3 py-1.5 rounded-lg hover:bg-[#2a2a3e] transition-colors disabled:opacity-60"
                            >
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-[10px] font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEdit(product)}
                            className="flex items-center gap-1 text-[10px] font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors bg-gray-50"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-50 text-[10px] text-gray-400">
            Showing {filtered.length} of {products.length} products ·
            Out of stock emails are sent automatically when stock hits 0
          </div>
        )}
      </div>
    </div>
  )
}

export default Inventory