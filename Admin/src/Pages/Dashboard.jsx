// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { backendurl, currency } from '../App'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'

// const StatCard = ({ icon, iconBg, iconColor, value, label, change, changeType }) => (
//   <div className="bg-white rounded-xl p-4 border border-black/5">
//     <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: iconBg }}>
//       <svg className="w-4 h-4" fill="none" stroke={iconColor} strokeWidth={2} viewBox="0 0 24 24">{icon}</svg>
//     </div>
//     <div className="text-xl font-bold text-[#1a1a2e] leading-none">{value}</div>
//     <div className="text-xs text-gray-400 mt-1">{label}</div>
//     <div className={`text-[10px] mt-2 ${
//       changeType === 'up'   ? 'text-[#2e9e5b]' :
//       changeType === 'down' ? 'text-red-500'    :
//       changeType === 'warn' ? 'text-yellow-600' :
//       'text-purple-500'
//     }`}>
//       {change}
//     </div>
//   </div>
// )

// const Dashboard = ({ token }) => {
//   const navigate = useNavigate()

//   const [stats, setStats]               = useState({ revenue: 0, orders: 0, customers: 0 })
//   const [recentOrders, setRecentOrders] = useState([])
//   const [lowStockProducts, setLowStockProducts] = useState([])
//   const [inventoryStats, setInventoryStats]     = useState({ total: 0, lowStock: 0, outOfStock: 0, healthy: 0 })
//   const [loadingOrders, setLoadingOrders]       = useState(true)
//   const [loadingStock, setLoadingStock]         = useState(true)

//   const chartBars = [
//     { label: 'Jan', h: '55%', color: '#d4e4f7' },
//     { label: 'Feb', h: '70%', color: '#d4e4f7' },
//     { label: 'Mar', h: '60%', color: '#d4e4f7' },
//     { label: 'Apr', h: '90%', color: '#e8a87c' },
//     { label: 'May', h: '40%', color: '#f0f0f0' },
//     { label: 'Jun', h: '45%', color: '#f0f0f0' },
//   ]

//   // ── Fetch orders ──
//   const fetchOrders = async () => {
//     if (!token) return
//     try {
//       setLoadingOrders(true)
//       const { data } = await axios.post(
//         backendurl + '/api/order/list', {},
//         { headers: { token } }
//       )
//       if (data.success) {
//         setRecentOrders(data.orders.slice(0, 5))
//         const revenue = data.orders.reduce((sum, o) => sum + o.amount, 0)
//         setStats(prev => ({ ...prev, orders: data.orders.length, revenue }))
//       }
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoadingOrders(false)
//     }
//   }

//   // ── Fetch low stock ──
//   const fetchLowStock = async () => {
//     if (!token) return
//     try {
//       setLoadingStock(true)
//       const { data } = await axios.post(
//         backendurl + '/api/inventory/low-stock', {},
//         { headers: { token } }
//       )
//       if (data.success) {
//         setLowStockProducts(data.products)
//       }
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoadingStock(false)
//     }
//   }

//   // ── Fetch inventory stats ──
//   const fetchInventoryStats = async () => {
//     if (!token) return
//     try {
//       const { data } = await axios.post(
//         backendurl + '/api/inventory/list', {},
//         { headers: { token } }
//       )
//       if (data.success) {
//         setInventoryStats(data.stats)
//         setStats(prev => ({ ...prev, customers: data.stats.total }))
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     fetchOrders()
//     fetchLowStock()
//     fetchInventoryStats()
//   }, [token])

//   const statusBadge = (status) => ({
//     'Order Placed':      'bg-blue-50 text-blue-700',
//     'Packing':           'bg-yellow-50 text-yellow-700',
//     'Shiped':            'bg-purple-50 text-purple-700',
//     'Out for delievery': 'bg-orange-50 text-orange-700',
//     'delievered':        'bg-green-50 text-green-700',
//   }[status] || 'bg-gray-100 text-gray-600')

//   return (
//     <div className="space-y-5">

//       {/* ── Stat Cards ── */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//         <StatCard
//           iconBg="#fff4e5" iconColor="#e8a87c"
//           icon={<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></>}
//           value={`${currency}${stats.revenue.toLocaleString()}`}
//           label="Total Revenue"
//           change="Live from orders"
//           changeType="up"
//         />
//         <StatCard
//           iconBg="#e8f0fe" iconColor="#1a4fa8"
//           icon={<><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></>}
//           value={stats.orders.toLocaleString()}
//           label="Total Orders"
//           change="Live from orders"
//           changeType="up"
//         />
//         <StatCard
//           iconBg="#e6f7ee" iconColor="#1a7a45"
//           icon={<><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>}
//           value={inventoryStats.healthy}
//           label="Products In Stock"
//           change={`${inventoryStats.total} total products`}
//           changeType="up"
//         />
//         <StatCard
//           iconBg="#fce8e8" iconColor="#a82222"
//           icon={<><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>}
//           value={inventoryStats.outOfStock + inventoryStats.lowStock}
//           label="Stock Alerts"
//           change={inventoryStats.outOfStock > 0
//             ? `${inventoryStats.outOfStock} out of stock`
//             : `${inventoryStats.lowStock} running low`
//           }
//           changeType={inventoryStats.outOfStock > 0 ? 'down' : 'warn'}
//         />
//       </div>

//       {/* ── Inventory Alert Banner ── */}
//       {(inventoryStats.outOfStock > 0 || inventoryStats.lowStock > 0) && (
//         <div className={`rounded-xl p-4 border flex items-center justify-between gap-3
//           ${inventoryStats.outOfStock > 0
//             ? 'bg-red-50 border-red-200'
//             : 'bg-yellow-50 border-yellow-200'
//           }`}>
//           <div className="flex items-center gap-3">
//             <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
//               ${inventoryStats.outOfStock > 0 ? 'bg-red-100' : 'bg-yellow-100'}`}>
//               <svg className={`w-4 h-4 ${inventoryStats.outOfStock > 0 ? 'text-red-600' : 'text-yellow-600'}`}
//                 fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
//                 <line x1="12" y1="9" x2="12" y2="13"/>
//                 <line x1="12" y1="17" x2="12.01" y2="17"/>
//               </svg>
//             </div>
//             <div>
//               <p className={`text-sm font-semibold ${inventoryStats.outOfStock > 0 ? 'text-red-700' : 'text-yellow-700'}`}>
//                 {inventoryStats.outOfStock > 0
//                   ? `${inventoryStats.outOfStock} product${inventoryStats.outOfStock > 1 ? 's' : ''} out of stock — email alert sent to admin`
//                   : `${inventoryStats.lowStock} product${inventoryStats.lowStock > 1 ? 's' : ''} running low on stock`
//                 }
//               </p>
//               <p className={`text-xs mt-0.5 ${inventoryStats.outOfStock > 0 ? 'text-red-400' : 'text-yellow-500'}`}>
//                 Go to Inventory page to update stock levels
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate('/inventory')}
//             className={`text-xs font-semibold px-4 py-2 rounded-lg flex-shrink-0 transition-colors
//               ${inventoryStats.outOfStock > 0
//                 ? 'bg-red-600 text-white hover:bg-red-700'
//                 : 'bg-yellow-500 text-white hover:bg-yellow-600'
//               }`}
//           >
//             Manage Stock
//           </button>
//         </div>
//       )}

//       {/* ── Revenue Chart + Donut ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

//         <div className="bg-white rounded-xl p-5 border border-black/5">
//           <div className="flex items-start justify-between mb-4">
//             <div>
//               <h2 className="text-sm font-semibold text-[#1a1a2e]">Monthly Revenue</h2>
//               <p className="text-xs text-gray-400 mt-0.5">Jan – Jun 2026</p>
//             </div>
//             <span className="text-xs text-[#e8a87c] font-medium cursor-pointer">View report</span>
//           </div>
//           <div className="flex items-end gap-2 h-28">
//             {chartBars.map((bar, i) => (
//               <div key={i} className="flex-1 flex flex-col items-center gap-1">
//                 <div className="w-full rounded-t-md hover:opacity-75 transition-opacity"
//                   style={{ height: bar.h, background: bar.color }} />
//                 <span className="text-[10px] text-gray-400">{bar.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

        // <div className="bg-white rounded-xl p-5 border border-black/5">
        //   <div className="flex items-start justify-between mb-4">
        //     <h2 className="text-sm font-semibold text-[#1a1a2e]">Sales by Category</h2>
        //     <span className="text-xs text-[#e8a87c] font-medium cursor-pointer">Details</span>
        //   </div>
        //   <div className="flex flex-col items-center gap-3">
        //     <svg viewBox="0 0 120 120" className="w-24 h-24">
        //       <circle cx="60" cy="60" r="46" fill="none" stroke="#f0f0f0" strokeWidth="18"/>
        //       <circle cx="60" cy="60" r="46" fill="none" stroke="#e8a87c" strokeWidth="18" strokeDasharray="87 202" strokeDashoffset="0" transform="rotate(-90 60 60)"/>
        //       <circle cx="60" cy="60" r="46" fill="none" stroke="#1a4fa8" strokeWidth="18" strokeDasharray="57 232" strokeDashoffset="-87" transform="rotate(-90 60 60)"/>
        //       <circle cx="60" cy="60" r="46" fill="none" stroke="#2e9e5b" strokeWidth="18" strokeDasharray="40 249" strokeDashoffset="-144" transform="rotate(-90 60 60)"/>
        //       <circle cx="60" cy="60" r="46" fill="none" stroke="#9b59b6" strokeWidth="18" strokeDasharray="30 259" strokeDashoffset="-184" transform="rotate(-90 60 60)"/>
        //       <text x="60" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a1a2e">{stats.orders}</text>
        //       <text x="60" y="69" textAnchor="middle" fontSize="8" fill="#aaa">orders</text>
        //     </svg>
        //     <div className="w-full space-y-1.5">
        //       {[
        //         { label: 'Bedsheets', pct: '34%', color: '#e8a87c' },
        //         { label: 'Quilts',    pct: '22%', color: '#1a4fa8' },
        //         { label: 'Curtains', pct: '16%', color: '#2e9e5b' },
        //         { label: 'Cushions', pct: '12%', color: '#9b59b6' },
        //       ].map(cat => (
        //         <div key={cat.label} className="flex items-center justify-between text-xs border-b border-gray-50 pb-1.5">
        //           <div className="flex items-center gap-1.5">
        //             <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
        //             <span className="text-gray-500">{cat.label}</span>
        //           </div>
        //           <span className="font-semibold text-[#1a1a2e]">{cat.pct}</span>
        //         </div>
        //       ))}
        //      </div>
        //    </div>
        //  </div>
//       </div>

//       {/* ── Recent Orders ── */}
//       <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
//         <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
//           <h2 className="text-sm font-semibold text-[#1a1a2e]">Recent Orders</h2>
//           <button
//             onClick={() => navigate('/orders')}
//             className="text-xs text-[#e8a87c] font-medium hover:underline"
//           >
//             View all orders
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs">
//             <thead>
//               <tr className="border-b border-gray-50">
//                 {['Customer','Items','Amount','Date','Payment','Status'].map(h => (
//                   <th key={h} className="text-left px-5 py-3 text-[10px] text-gray-400 uppercase tracking-wide font-medium">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {loadingOrders ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-8">
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="w-4 h-4 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin" />
//                       <span className="text-xs text-gray-400">Loading orders...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : recentOrders.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-8 text-gray-400 text-xs">No orders yet</td>
//                 </tr>
//               ) : (
//                 recentOrders.map((order, i) => (
//                   <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
//                     <td className="px-5 py-3 font-medium text-[#1a1a2e]">
//                       {order.address?.firstname} {order.address?.lastname}
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">{order.items?.length} item(s)</td>
//                     <td className="px-5 py-3 font-semibold text-[#1a1a2e]">
//                       {currency}{order.amount?.toLocaleString()}
//                     </td>
//                     <td className="px-5 py-3 text-gray-400">
//                       {new Date(order.date).toLocaleDateString()}
//                     </td>
//                     <td className="px-5 py-3">
//                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium
//                         ${order.payment ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
//                         {order.payment ? 'Paid' : 'Pending'}
//                       </span>
//                     </td>
//                     <td className="px-5 py-3">
//                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge(order.status)}`}>
//                         {order.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ── Activity + Low Stock ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-2">

//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl p-5 border border-black/5">
//           <h2 className="text-sm font-semibold text-[#1a1a2e] mb-4">Recent Activity</h2>
//           {[
//             { dot: '#2e9e5b', text: 'New order placed — synced from orders API',     time: '2 mins ago'  },
//             { dot: '#e8a87c', text: 'Stock updated for Royal Cotton Bedsheet',        time: '15 mins ago' },
//             { dot: '#1a4fa8', text: 'New customer registered',                        time: '1 hr ago'    },
//             { dot: '#e85d5d', text: 'Out of stock alert email sent for Curtain Pair', time: '2 hrs ago'   },
//             { dot: '#9b59b6', text: 'Order status updated to Delivered',              time: '3 hrs ago'   },
//           ].map((a, i) => (
//             <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-gray-50 last:border-0">
//               <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.dot }} />
//               <div>
//                 <p className="text-xs text-gray-600 leading-relaxed">{a.text}</p>
//                 <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Low Stock — real data */}
//         <div className="bg-white rounded-xl p-5 border border-black/5">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-sm font-semibold text-[#1a1a2e]">Low Stock Alerts</h2>
//             <div className="flex items-center gap-2">
//               {lowStockProducts.length > 0 && (
//                 <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
//                   ${lowStockProducts.some(p => p.stock === 0)
//                     ? 'bg-red-50 text-red-600'
//                     : 'bg-yellow-50 text-yellow-700'
//                   }`}>
//                   {lowStockProducts.length} item{lowStockProducts.length > 1 ? 's' : ''}
//                 </span>
//               )}
//               <button
//                 onClick={() => navigate('/inventory')}
//                 className="text-[10px] text-[#e8a87c] font-medium hover:underline"
//               >
//                 Manage
//               </button>
//             </div>
//           </div>

//           {loadingStock ? (
//             <div className="flex items-center justify-center py-8 gap-2">
//               <div className="w-4 h-4 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin" />
//               <span className="text-xs text-gray-400">Loading...</span>
//             </div>
//           ) : lowStockProducts.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-8 text-center">
//               <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
//                 <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                   <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
//                   <polyline points="22 4 12 14.01 9 11.01"/>
//                 </svg>
//               </div>
//               <p className="text-xs font-medium text-green-600">All products well stocked</p>
//               <p className="text-[10px] text-gray-400 mt-0.5">No alerts at this time</p>
//             </div>
//           ) : (
//             <div>
//               {lowStockProducts.slice(0, 4).map((item, i) => (
//                 <div key={item._id || i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
//                   <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
//                     {item.image?.[0]
//                       ? <img src={item.image[0]} alt="" className="w-full h-full object-cover" />
//                       : <div className="w-full h-full bg-gray-200" />
//                     }
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs font-medium text-[#1a1a2e] truncate">{item.name}</p>
//                     <p className="text-[10px] text-gray-400">{item.category}</p>
//                     <div className="h-1 bg-gray-100 rounded-full mt-1.5">
//                       <div
//                         className={`h-1 rounded-full transition-all ${item.stock === 0 ? 'bg-red-500' : 'bg-yellow-400'}`}
//                         style={{ width: `${Math.min((item.stock / (item.lowStockAlert || 10)) * 100, 100)}%` }}
//                       />
//                     </div>
//                   </div>
//                   <span className={`text-xs font-semibold flex-shrink-0
//                     ${item.stock === 0 ? 'text-red-500' : 'text-yellow-600'}`}>
//                     {item.stock === 0 ? 'Out' : `${item.stock} left`}
//                   </span>
//                 </div>
//               ))}
//               {lowStockProducts.length > 4 && (
//                 <button
//                   onClick={() => navigate('/inventory')}
//                   className="w-full mt-3 text-[11px] text-[#e8a87c] font-medium hover:underline text-center"
//                 >
//                   +{lowStockProducts.length - 4} more — view all in Inventory
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Dashboard

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendurl, currency } from '../App'
import { useNavigate } from 'react-router-dom'

const StatCard = ({ icon, iconBg, iconColor, value, label, change, changeType }) => (
  <div className="bg-white rounded-xl p-4 border border-black/5">
    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
      style={{ background: iconBg }}>
      <svg className="w-4 h-4" fill="none" stroke={iconColor} strokeWidth={2}
        viewBox="0 0 24 24">{icon}</svg>
    </div>
    <div className="text-xl font-bold text-[#1a1a2e] leading-none">{value}</div>
    <div className="text-xs text-gray-400 mt-1">{label}</div>
    <div className={`text-[10px] mt-2 ${
      changeType === 'up'   ? 'text-[#2e9e5b]' :
      changeType === 'down' ? 'text-red-500'    :
      changeType === 'warn' ? 'text-yellow-600' :
      'text-purple-500'
    }`}>
      {change}
    </div>
  </div>
)

const Dashboard = ({ token }) => {
  const navigate = useNavigate()

  const [stats, setStats]             = useState({ revenue: 0, orders: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [lowStockProducts, setLowStockProducts] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [inventoryStats, setInventoryStats]     = useState({
    total: 0, lowStock: 0, outOfStock: 0, healthy: 0
  })
  const [loadingOrders, setLoadingOrders]   = useState(true)
  const [loadingStock, setLoadingStock]     = useState(true)

  // ── Analytics ──
  const [monthlyData, setMonthlyData]           = useState([])
  const [topProducts, setTopProducts]           = useState([])
  const [statusBreakdown, setStatusBreakdown]   = useState({})
  const [loadingAnalytics, setLoadingAnalytics] = useState(true)
  const [chartView, setChartView]               = useState('revenue')

  // ── Fetch orders ──
  const fetchOrders = async () => {
    if (!token) return
    try {
      setLoadingOrders(true)
      const { data } = await axios.post(
        backendurl + '/api/order/list', {},
        { headers: { token } }
      )
      if (data.success) {
        setRecentOrders(data.orders.slice(0, 5))
        const revenue = data.orders.reduce((sum, o) => sum + (o.amount || 0), 0)
        setStats(prev => ({ ...prev, orders: data.orders.length, revenue }))
      }
    } catch (err) { console.log(err) }
    finally { setLoadingOrders(false) }
  }

  // ── Fetch analytics ──
  const fetchAnalytics = async () => {
    if (!token) return
    try {
      setLoadingAnalytics(true)
      const { data } = await axios.post(
        backendurl + '/api/order/analytics', {},
        { headers: { token } }
      )
      if (data.success) {
        setMonthlyData(data.monthlyData || [])
        setTopProducts(data.topProducts || [])
        setStatusBreakdown(data.statusBreakdown || {})
        setCategoryData(data.categoryData || []) 
      }
    } catch (err) { console.log(err) }
    finally { setLoadingAnalytics(false) }
  }

  // ── Fetch low stock ──
  const fetchLowStock = async () => {
    if (!token) return
    try {
      setLoadingStock(true)
      const { data } = await axios.post(
        backendurl + '/api/inventory/low-stock', {},
        { headers: { token } }
      )
      if (data.success) setLowStockProducts(data.products || [])
    } catch (err) { console.log(err) }
    finally { setLoadingStock(false) }
  }

  // ── Fetch inventory stats ──
  const fetchInventoryStats = async () => {
    if (!token) return
    try {
      const { data } = await axios.post(
        backendurl + '/api/inventory/list', {},
        { headers: { token } }
      )
      if (data.success) setInventoryStats(data.stats || {})
    } catch (err) { console.log(err) }
  }

  useEffect(() => {
    fetchOrders()
    fetchAnalytics()
    fetchLowStock()
    fetchInventoryStats()
  }, [token])

  const statusBadge = (status) => ({
    'Order Placed':      'bg-blue-50 text-blue-700',
    'Packing':           'bg-yellow-50 text-yellow-700',
    'Shiped':            'bg-purple-50 text-purple-700',
    'Out for delievery': 'bg-orange-50 text-orange-700',
    'delievered':        'bg-green-50 text-green-700',
    'Cancelled':         'bg-red-50 text-red-600',
  }[status] || 'bg-gray-100 text-gray-600')

  return (
    <div className="space-y-5">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          iconBg="#fff4e5" iconColor="#e8a87c"
          icon={<><line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></>}
          value={`${currency}${stats.revenue.toLocaleString()}`}
          label="Total Revenue"
          change="Live from all orders"
          changeType="up"
        />
        <StatCard
          iconBg="#e8f0fe" iconColor="#1a4fa8"
          icon={<><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/></>}
          value={stats.orders.toLocaleString()}
          label="Total Orders"
          change="Live from all orders"
          changeType="up"
        />
        <StatCard
          iconBg="#e6f7ee" iconColor="#1a7a45"
          icon={<><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>}
          value={inventoryStats.healthy || 0}
          label="Products In Stock"
          change={`${inventoryStats.total || 0} total products`}
          changeType="up"
        />
        <StatCard
          iconBg="#fce8e8" iconColor="#a82222"
          icon={<><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/></>}
          value={(inventoryStats.outOfStock || 0) + (inventoryStats.lowStock || 0)}
          label="Stock Alerts"
          change={inventoryStats.outOfStock > 0
            ? `${inventoryStats.outOfStock} out of stock`
            : `${inventoryStats.lowStock || 0} running low`
          }
          changeType={inventoryStats.outOfStock > 0 ? 'down' : 'warn'}
        />
      </div>

      {/* ── Inventory Alert Banner ── */}
      {(inventoryStats.outOfStock > 0 || inventoryStats.lowStock > 0) && (
        <div className={`rounded-xl p-4 border flex items-center justify-between gap-3
          ${inventoryStats.outOfStock > 0
            ? 'bg-red-50 border-red-200'
            : 'bg-yellow-50 border-yellow-200'
          }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
              ${inventoryStats.outOfStock > 0 ? 'bg-red-100' : 'bg-yellow-100'}`}>
              <svg className={`w-4 h-4 ${inventoryStats.outOfStock > 0 ? 'text-red-600' : 'text-yellow-600'}`}
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <p className={`text-sm font-semibold
                ${inventoryStats.outOfStock > 0 ? 'text-red-700' : 'text-yellow-700'}`}>
                {inventoryStats.outOfStock > 0
                  ? `${inventoryStats.outOfStock} product${inventoryStats.outOfStock > 1 ? 's' : ''} out of stock`
                  : `${inventoryStats.lowStock} product${inventoryStats.lowStock > 1 ? 's' : ''} running low`
                }
              </p>
              <p className={`text-xs mt-0.5
                ${inventoryStats.outOfStock > 0 ? 'text-red-400' : 'text-yellow-500'}`}>
                Go to Inventory page to update stock levels
              </p>
            </div>
          </div>
          <button onClick={() => navigate('/inventory')}
            className={`text-xs font-semibold px-4 py-2 rounded-lg flex-shrink-0 transition-colors
              ${inventoryStats.outOfStock > 0
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
              }`}>
            Manage Stock
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════
          ANALYTICS — Chart + Top Products
      ══════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

        {/* ── Bar Chart ── */}
        <div className="bg-white rounded-xl p-5 border border-black/5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#1a1a2e]">
                {chartView === 'revenue' ? 'Monthly Revenue' : 'Monthly Orders'}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {monthlyData.length > 0
                  ? `${monthlyData[0]?.label} – ${monthlyData[monthlyData.length - 1]?.label}`
                  : 'Last 6 months'
                }
              </p>
            </div>
            {/* Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {[
                { key: 'revenue', label: 'Revenue' },
                { key: 'orders',  label: 'Orders'  },
              ].map(v => (
                <button key={v.key} onClick={() => setChartView(v.key)}
                  className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-colors
                    ${chartView === v.key
                      ? 'bg-white text-[#1a1a2e] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {loadingAnalytics ? (
            <div className="flex items-center justify-center h-48 gap-2">
              <div className="w-4 h-4 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Loading chart...</span>
            </div>
          ) : (() => {
            // ── All chart calculations inline ──
            const values    = monthlyData.map(m =>
              chartView === 'revenue' ? m.revenue : m.orders
            )
            const maxVal    = Math.max(...values, 1)
            const thisMonth = values[values.length - 1] || 0
            const lastMonth = values[values.length - 2] || 0
            const growth    = lastMonth > 0
              ? (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1)
              : thisMonth > 0 ? '100' : '0'
            const totalVal  = values.reduce((s, v) => s + v, 0)

            return (
              <>
                {/* Summary cards */}
                <div className="flex gap-3 mb-6 flex-wrap">
                  <div className="bg-[#fff4e5] rounded-xl px-4 py-2.5 flex-1 min-w-[90px]">
                    <p className="text-[10px] text-gray-500 mb-0.5">This Month</p>
                    <p className="text-sm font-bold text-[#1a1a2e]">
                      {chartView === 'revenue'
                        ? `${currency}${thisMonth.toLocaleString()}`
                        : `${thisMonth}`
                      }
                    </p>
                  </div>
                  <div className={`rounded-xl px-4 py-2.5 flex-1 min-w-[90px]
                    ${Number(growth) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-[10px] text-gray-500 mb-0.5">vs Last Month</p>
                    <p className={`text-sm font-bold
                      ${Number(growth) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {lastMonth === 0 && thisMonth === 0
                        ? '—'
                        : `${Number(growth) >= 0 ? '▲' : '▼'} ${Math.abs(growth)}%`
                      }
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex-1 min-w-[90px]">
                    <p className="text-[10px] text-gray-500 mb-0.5">6-Month Total</p>
                    <p className="text-sm font-bold text-[#1a1a2e]">
                      {chartView === 'revenue'
                        ? `${currency}${totalVal.toLocaleString()}`
                        : `${totalVal}`
                      }
                    </p>
                  </div>
                </div>

                {/* ── Bars ── */}
                <div className="flex items-end gap-2"
                  style={{ height: '140px' }}>
                  {monthlyData.map((bar, i) => {
                    const val    = chartView === 'revenue' ? bar.revenue : bar.orders
                    const isLast = i === monthlyData.length - 1

                    // Fixed pixel height — 120px max bar height
                    const BAR_MAX  = 120
                    const heightPx = val > 0
                      ? Math.max(Math.round((val / maxVal) * BAR_MAX), 8)
                      : 3

                    return (
                      <div key={i}
                        className="flex-1 flex flex-col items-center group relative"
                        style={{ height: '140px', justifyContent: 'flex-end' }}>

                        {/* Tooltip */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2
                          bg-[#1a1a2e] text-white text-[10px] px-2.5 py-1.5 rounded-lg
                          whitespace-nowrap opacity-0 group-hover:opacity-100
                          transition-all duration-150 pointer-events-none z-20 shadow-xl">
                          <p className="font-semibold">
                            {chartView === 'revenue'
                              ? `${currency}${val.toLocaleString()}`
                              : `${val} orders`
                            }
                          </p>
                          <p className="text-white/50 text-[9px] mt-0.5">{bar.label}</p>
                          {/* Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2
                            border-4 border-transparent border-t-[#1a1a2e]" />
                        </div>

                        {/* Bar itself */}
                        <div
                          className={`w-full rounded-t-lg cursor-pointer
                            transition-all duration-700 ease-out
                            ${isLast
                              ? 'bg-[#e8a87c] hover:bg-[#d4956a]'
                              : val > 0
                                ? 'bg-[#d4e4f7] hover:bg-[#a8c8f0]'
                                : 'bg-gray-100'
                            }`}
                          style={{ height: `${heightPx}px` }}
                        />

                        {/* Month label */}
                        <span className={`text-[10px] font-medium mt-1.5 whitespace-nowrap
                          ${isLast ? 'text-[#e8a87c]' : 'text-gray-400'}`}>
                          {bar.label}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {totalVal === 0 && (
                  <p className="text-center text-xs text-gray-400 mt-3">
                    No data yet — place orders to see analytics
                  </p>
                )}
              </>
            )
          })()}
        </div>

        {/* ── Top 5 Products ── */}
        <div className="bg-white rounded-xl p-5 border border-black/5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#1a1a2e]">Top Products</h2>
              <p className="text-xs text-gray-400 mt-0.5">By units sold</p>
            </div>
            <span className="text-[10px] bg-[#fff4e5] text-[#b36b00]
              font-semibold px-2 py-0.5 rounded-full">
              Top 5
            </span>
          </div>

          {loadingAnalytics ? (
            <div className="flex items-center justify-center py-10 gap-2">
              <div className="w-4 h-4 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Loading...</span>
            </div>
          ) : topProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <svg className="w-8 h-8 text-gray-200 mb-2" fill="none"
                stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
              </svg>
              <p className="text-xs text-gray-400">No sales data yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topProducts.map((product, i) => {
                const maxQty   = topProducts[0]?.quantity || 1
                const barPct   = Math.round((product.quantity / maxQty) * 100)
                const medals   = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣']
                const barColors = ['#e8a87c', '#1a4fa8', '#2e9e5b', '#9b59b6', '#e85d5d']

                return (
                  <div key={product.id || i}>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-sm w-5 text-center flex-shrink-0">
                        {medals[i]}
                      </span>
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {Array.isArray(product.image) && product.image[0]
                          ? <img src={product.image[0]} alt=""
                              className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-gray-200 flex items-center
                              justify-center text-gray-400 text-[10px]">?</div>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1a1a2e] truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-[10px] text-gray-400">
                            {product.quantity} sold
                          </span>
                          <span className="text-[10px] font-semibold text-[#1a1a2e]">
                            {currency}{product.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="ml-7 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all duration-700"
                        style={{
                          width:      `${barPct}%`,
                          background: barColors[i] || '#e8a87c'
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Order Status Breakdown ── */}
      {!loadingAnalytics && Object.keys(statusBreakdown).length > 0 && (
        <div className="bg-white rounded-xl p-5 border border-black/5">
          <h2 className="text-sm font-semibold text-[#1a1a2e] mb-4">
            Order Status Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { key: 'Order Placed',      color: '#1a4fa8', bg: '#e8f0fe', label: 'Placed'      },
              { key: 'Packing',           color: '#b36b00', bg: '#fff4e5', label: 'Packing'     },
              { key: 'Shiped',            color: '#7c3aed', bg: '#f0eafd', label: 'Shipped'     },
              { key: 'Out for delievery', color: '#c05621', bg: '#fff0e5', label: 'Out for Del' },
              { key: 'delievered',        color: '#1a7a45', bg: '#e6f7ee', label: 'Delivered'   },
              { key: 'Cancelled',         color: '#a82222', bg: '#fce8e8', label: 'Cancelled'   },
            ].map(s => (
              <div key={s.key}
                className="flex flex-col items-center p-3 rounded-xl border border-gray-50"
                style={{ background: s.bg }}>
                <span className="text-xl font-bold" style={{ color: s.color }}>
                  {statusBreakdown[s.key] || 0}
                </span>
                <span className="text-[10px] text-gray-500 mt-0.5 text-center">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Recent Orders ── */}
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#1a1a2e]">Recent Orders</h2>
          <button onClick={() => navigate('/orders')}
            className="text-xs text-[#e8a87c] font-medium hover:underline">
            View all orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-50">
                {['Customer', 'Items', 'Amount', 'Date', 'Payment', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] text-gray-400
                    uppercase tracking-wide font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loadingOrders ? (
                <tr>
                  <td colSpan={6} className="text-center py-10">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#e8a87c]
                        border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-gray-400">Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400 text-xs">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order, i) => (
                  <tr key={i}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-[#1a1a2e]">
                      {order.address?.firstname} {order.address?.lastname}
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {order.items?.length} item(s)
                    </td>
                    <td className="px-5 py-3 font-semibold text-[#1a1a2e]">
                      {currency}{order.amount?.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-gray-400">
                      {new Date(Number(order.date)).toLocaleDateString('en-PK', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium
                        ${order.payment
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                        }`}>
                        {order.payment ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium
                        ${statusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Activity + Low Stock ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-2">

        {/* Recent Activity */}
        {/* <div className="bg-white rounded-xl p-5 border border-black/5">
          <h2 className="text-sm font-semibold text-[#1a1a2e] mb-4">Recent Activity</h2>
          {[
            { dot: '#2e9e5b', text: 'New order placed — synced from orders API',      time: '2 mins ago'  },
            { dot: '#e8a87c', text: 'Stock updated for Royal Cotton Bedsheet',         time: '15 mins ago' },
            { dot: '#1a4fa8', text: 'New customer registered',                         time: '1 hr ago'    },
            { dot: '#e85d5d', text: 'Out of stock alert email sent for Curtain Pair',  time: '2 hrs ago'   },
            { dot: '#9b59b6', text: 'Order status updated to Delivered',               time: '3 hrs ago'   },
          ].map((a, i) => (
            <div key={i}
              className="flex items-start gap-2.5 py-2.5 border-b border-gray-50 last:border-0">
              <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: a.dot }} />
              <div>
                <p className="text-xs text-gray-600 leading-relaxed">{a.text}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div> */}
        {/* sale by category */}

{/* ── Sales by Category Donut ── */}
<div className="bg-white rounded-xl p-5 border border-black/5">
  <div className="flex items-start justify-between mb-4">
    <div>
      <h2 className="text-sm font-semibold text-[#1a1a2e]">Sales by Category</h2>
      <p className="text-xs text-gray-400 mt-0.5">By units sold</p>
    </div>
    <span className="text-[10px] bg-[#fff4e5] text-[#b36b00]
      font-semibold px-2 py-0.5 rounded-full">
      Live
    </span>
  </div>

  {loadingAnalytics ? (
    <div className="flex items-center justify-center py-10 gap-2">
      <div className="w-4 h-4 border-2 border-[#e8a87c]
        border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-gray-400">Loading...</span>
    </div>
  ) : categoryData.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <svg className="w-8 h-8 text-gray-200 mb-2" fill="none"
        stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a10 10 0 010 20"/>
        <path d="M2 12h20"/>
      </svg>
      <p className="text-xs text-gray-400">No category data yet</p>
    </div>
  ) : (() => {
    // ── Donut calculation ──
    const COLORS = [
      '#e8a87c', '#1a4fa8', '#2e9e5b',
      '#9b59b6', '#e85d5d', '#3498db'
    ]

    const CIRCUMFERENCE = 2 * Math.PI * 46  // ≈ 289
    const totalQty = categoryData.reduce((s, c) => s + c.quantity, 0)

    // Build stroke segments
    let offset = 0
    const segments = categoryData.map((cat, i) => {
      const pct   = totalQty > 0 ? cat.quantity / totalQty : 0
      const dash  = pct * CIRCUMFERENCE
      const gap   = CIRCUMFERENCE - dash
      const seg   = {
        color:  COLORS[i % COLORS.length],
        dash,
        gap,
        offset: -offset,   // negative because SVG offset goes clockwise
        pct:    Math.round(pct * 100),
        label:  cat.category,
        qty:    cat.quantity,
        rev:    cat.revenue,
      }
      offset += dash
      return seg
    })

    return (
      <div className="flex flex-col items-center gap-4">

        {/* Donut SVG */}
        <div className="relative">
          <svg viewBox="0 0 120 120" className="w-32 h-32 -rotate-90">
            {/* Background ring */}
            <circle
              cx="60" cy="60" r="46"
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="16"
            />
            {/* Segments */}
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx="60" cy="60" r="46"
                fill="none"
                stroke={seg.color}
                strokeWidth="16"
                strokeDasharray={`${seg.dash} ${seg.gap}`}
                strokeDashoffset={seg.offset}
                className="transition-all duration-700"
              />
            ))}
          </svg>

          {/* Center text — not rotated */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-[#1a1a2e]">
              {totalQty}
            </span>
            <span className="text-[10px] text-gray-400">units</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2">
          {segments.map((seg, i) => (
            <div key={i}
              className="flex items-center justify-between
                text-xs border-b border-gray-50 pb-2 last:border-0">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: seg.color }}
                />
                <span className="text-gray-600 truncate">{seg.label}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <span className="text-gray-400 text-[10px]">
                  {seg.qty} sold
                </span>
                <span
                  className="font-bold text-[11px] min-w-[32px] text-right"
                  style={{ color: seg.color }}>
                  {seg.pct}%
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    )
  })()}
</div>
        {/* Low Stock */}
        <div className="bg-white rounded-xl p-5 border border-black/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#1a1a2e]">Low Stock Alerts</h2>
            <div className="flex items-center gap-2">
              {lowStockProducts.length > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                  ${lowStockProducts.some(p => p.stock === 0)
                    ? 'bg-red-50 text-red-600'
                    : 'bg-yellow-50 text-yellow-700'
                  }`}>
                  {lowStockProducts.length} item{lowStockProducts.length > 1 ? 's' : ''}
                </span>
              )}
              <button onClick={() => navigate('/inventory')}
                className="text-[10px] text-[#e8a87c] font-medium hover:underline">
                Manage
              </button>
            </div>
          </div>

          {loadingStock ? (
            <div className="flex items-center justify-center py-8 gap-2">
              <div className="w-4 h-4 border-2 border-[#e8a87c]
                border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Loading...</span>
            </div>
          ) : lowStockProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-10 h-10 rounded-full bg-green-50
                flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-green-500" fill="none"
                  stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <p className="text-xs font-medium text-green-600">All products well stocked</p>
              <p className="text-[10px] text-gray-400 mt-0.5">No alerts at this time</p>
            </div>
          ) : (
            <div>
              {lowStockProducts.slice(0, 4).map((item, i) => (
                <div key={item._id || i}
                  className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    {item.image?.[0]
                      ? <img src={item.image[0]} alt=""
                          className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-gray-200" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#1a1a2e] truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{item.category}</p>
                    <div className="h-1 bg-gray-100 rounded-full mt-1.5">
                      <div
                        className={`h-1 rounded-full transition-all
                          ${item.stock === 0 ? 'bg-red-500' : 'bg-yellow-400'}`}
                        style={{
                          width: `${Math.min(
                            (item.stock / (item.lowStockAlert || 10)) * 100, 100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                  <span className={`text-xs font-semibold flex-shrink-0
                    ${item.stock === 0 ? 'text-red-500' : 'text-yellow-600'}`}>
                    {item.stock === 0 ? 'Out' : `${item.stock} left`}
                  </span>
                </div>
              ))}
              {lowStockProducts.length > 4 && (
                <button onClick={() => navigate('/inventory')}
                  className="w-full mt-3 text-[11px] text-[#e8a87c]
                    font-medium hover:underline text-center">
                  +{lowStockProducts.length - 4} more — view all in Inventory
                </button>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Dashboard

