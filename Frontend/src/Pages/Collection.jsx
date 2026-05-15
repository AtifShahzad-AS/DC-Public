// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../../Context/Shopcontext'
// import { useLocation, useSearchParams } from 'react-router-dom'
// import Productitems from '../Components/Productitems'

// const PRODUCTS_PER_PAGE = 9

// const Collection = () => {
//   const { products, search, showsearch } = useContext(ShopContext)
//   const location                         = useLocation()
//   const [searchParams]                   = useSearchParams()

//   const [showfilter, setshowfilter]         = useState(false)
//   const [filterproducts, setfilterproducts] = useState([])
//   const [category, setcategory]             = useState([])
//   const [sorttype, setsorttype]             = useState('relevent')
//   const [visibleCount, setvisibleCount]     = useState(PRODUCTS_PER_PAGE)
//   const [priceRange, setPriceRange]         = useState([0, 50000])
//   const [priceMax, setPriceMax]             = useState(50000)

//   // ── Pre-select category from URL param OR navigation state ──
//   useEffect(() => {
//     // Priority 1: URL query param (from banner click)
//     const catParam = searchParams.get('category')
//     if (catParam) {
//       setcategory([catParam])
//       setvisibleCount(PRODUCTS_PER_PAGE)
//       return
//     }

//     // Priority 2: Navigation state (from category card click)
//     if (location.state?.category) {
//       setcategory([location.state.category])
//       setvisibleCount(PRODUCTS_PER_PAGE)
//       window.history.replaceState({}, document.title)
//     }
//   }, [location.state, searchParams])

//   // ── Set price max from products ──
//   useEffect(() => {
//     if (products.length > 0) {
//       const max     = Math.max(...products.map(p => p.price))
//       const rounded = Math.ceil(max / 1000) * 1000
//       setPriceMax(rounded)
//       setPriceRange([0, rounded])
//     }
//   }, [products])

//   const togglecategory = (value) => {
//     setvisibleCount(PRODUCTS_PER_PAGE)
//     setcategory(prev =>
//       prev.includes(value)
//         ? prev.filter(item => item !== value)
//         : [...prev, value]
//     )
//   }

//   const applyfilter = () => {
//     let productcopy = products.slice()

//     if (search && showsearch) {
//       productcopy = productcopy.filter(item =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       )
//     }
//     if (category.length > 0) {
//       productcopy = productcopy.filter(item =>
//         category.map(c => c.toLowerCase()).includes(item.category?.toLowerCase())
//       )
//     }
//     productcopy = productcopy.filter(item =>
//       item.price >= priceRange[0] && item.price <= priceRange[1]
//     )

//     setfilterproducts(productcopy)
//   }

//   useEffect(() => {
//     setvisibleCount(PRODUCTS_PER_PAGE)
//     applyfilter()
//   }, [category, search, showsearch, products, priceRange])

//   const sortproduct = () => {
//     let fpcopy = filterproducts.slice()
//     switch (sorttype) {
//       case 'low-high':
//         setfilterproducts(fpcopy.sort((a, b) => a.price - b.price))
//         break
//       case 'high-low':
//         setfilterproducts(fpcopy.sort((a, b) => b.price - a.price))
//         break
//       default:
//         applyfilter()
//         break
//     }
//   }

//   useEffect(() => { sortproduct() }, [sorttype])

//   const visibleProducts = filterproducts.slice(0, visibleCount)
//   const hasMore         = visibleCount < filterproducts.length

//   const categories = [
//     { label: 'Bedsheets',     value: 'Bedsheets'     },
//     { label: 'Curtains',      value: 'Curtains'      },
//     { label: 'Quilts',        value: 'Quilts'        },
//     { label: 'Cushions',      value: 'Cushions'      },
//     { label: 'Pillow Covers', value: 'Pillow Covers' },
//     { label: 'Blankets',      value: 'Blankets'      },
//   ]

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-20 pb-12">

//         {/* ── Page Header ── */}
//         <div className="py-6 mb-6 border-b border-slate-200">
//           <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
//             Browse
//           </p>
//           <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//             All Collection
//           </h1>

//           {/* Show active filter from URL if present */}
//           {searchParams.get('category') && (
//             <div className="flex items-center gap-2 mt-2">
//               <span className="text-xs text-slate-500">Filtered by:</span>
//               <span className="flex items-center gap-1.5 bg-blue-600 text-white
//                 text-xs font-medium px-3 py-1 rounded-full">
//                 {searchParams.get('category')}
//               </span>
//             </div>
//           )}

//           <p className="text-sm text-slate-400 mt-1">
//             {filterproducts.length} product{filterproducts.length !== 1 ? 's' : ''} found
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-6">

//           {/* ── Sidebar ── */}
//           <aside className="w-full sm:w-56 flex-shrink-0">

//             <button
//               onClick={() => setshowfilter(!showfilter)}
//               className="sm:hidden w-full flex items-center justify-between bg-white
//                 border border-slate-200 rounded-xl px-4 py-3 mb-3 text-sm
//                 font-semibold text-slate-700"
//             >
//               <span>Filters</span>
//               <svg className={`w-4 h-4 transition-transform duration-200
//                 ${showfilter ? 'rotate-180' : ''}`}
//                 fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//                 <polyline points="6 9 12 15 18 9"/>
//               </svg>
//             </button>

//             <div className={`space-y-3 ${showfilter ? 'block' : 'hidden'} sm:block`}>

//               {/* Categories */}
//               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
//                 <div className="px-4 py-3 border-b border-slate-100
//                   flex items-center justify-between">
//                   <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
//                     Categories
//                   </p>
//                   {category.length > 0 && (
//                     <button
//                       onClick={() => { setcategory([]); setvisibleCount(PRODUCTS_PER_PAGE) }}
//                       className="text-[10px] text-blue-600 font-medium hover:text-blue-800">
//                       Clear
//                     </button>
//                   )}
//                 </div>
//                 <div className="p-3 space-y-1">
//                   {categories.map(cat => (
//                     <label key={cat.value}
//                       className={`flex items-center gap-2.5 px-2 py-2 rounded-lg
//                         cursor-pointer transition-colors text-sm
//                         ${category.includes(cat.value)
//                           ? 'bg-blue-50 text-blue-700 font-medium'
//                           : 'text-slate-600 hover:bg-slate-50'
//                         }`}>
//                       <input
//                         type="checkbox"
//                         checked={category.includes(cat.value)}
//                         onChange={() => togglecategory(cat.value)}
//                         className="w-3.5 h-3.5 accent-blue-600 flex-shrink-0"
//                       />
//                       {cat.label}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
//                 <div className="px-4 py-3 border-b border-slate-100
//                   flex items-center justify-between">
//                   <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
//                     Price Range
//                   </p>
//                   <button onClick={() => setPriceRange([0, priceMax])}
//                     className="text-[10px] text-blue-600 font-medium hover:text-blue-800">
//                     Reset
//                   </button>
//                 </div>
//                 <div className="p-4">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-xs font-semibold text-slate-700
//                       bg-slate-100 px-2 py-1 rounded-lg">
//                       Rs {priceRange[0].toLocaleString()}
//                     </span>
//                     <span className="text-xs text-slate-400">—</span>
//                     <span className="text-xs font-semibold text-slate-700
//                       bg-slate-100 px-2 py-1 rounded-lg">
//                       Rs {priceRange[1].toLocaleString()}
//                     </span>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <label className="text-[10px] text-slate-400">Min</label>
//                       <span className="text-[10px] text-slate-500">
//                         Rs {priceRange[0].toLocaleString()}
//                       </span>
//                     </div>
//                     <input type="range" min={0} max={priceMax} step={100}
//                       value={priceRange[0]}
//                       onChange={e => {
//                         const val = Number(e.target.value)
//                         if (val <= priceRange[1]) setPriceRange([val, priceRange[1]])
//                       }}
//                       className="w-full accent-blue-600 h-1.5 cursor-pointer" />

//                     <div className="flex items-center justify-between mt-2">
//                       <label className="text-[10px] text-slate-400">Max</label>
//                       <span className="text-[10px] text-slate-500">
//                         Rs {priceRange[1].toLocaleString()}
//                       </span>
//                     </div>
//                     <input type="range" min={0} max={priceMax} step={100}
//                       value={priceRange[1]}
//                       onChange={e => {
//                         const val = Number(e.target.value)
//                         if (val >= priceRange[0]) setPriceRange([priceRange[0], val])
//                       }}
//                       className="w-full accent-blue-600 h-1.5 cursor-pointer" />
//                   </div>

//                   <div className="mt-3 flex flex-wrap gap-1.5">
//                     {[
//                       { label: 'Under 1k', min: 0,    max: 1000     },
//                       { label: '1k–3k',    min: 1000, max: 3000     },
//                       { label: '3k–5k',    min: 3000, max: 5000     },
//                       { label: '5k+',      min: 5000, max: priceMax },
//                     ].map(preset => (
//                       <button key={preset.label}
//                         onClick={() => setPriceRange([preset.min, preset.max])}
//                         className={`text-[10px] px-2 py-1 rounded-lg border font-medium
//                           transition-colors
//                           ${priceRange[0] === preset.min && priceRange[1] === preset.max
//                             ? 'bg-blue-600 text-white border-blue-600'
//                             : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
//                           }`}>
//                         {preset.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Sort — mobile */}
//               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden sm:hidden">
//                 <div className="px-4 py-3 border-b border-slate-100">
//                   <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
//                     Sort By
//                   </p>
//                 </div>
//                 <div className="p-3 space-y-1">
//                   {[
//                     { label: 'Relevant',           value: 'relevent' },
//                     { label: 'Price: Low to High', value: 'low-high' },
//                     { label: 'Price: High to Low', value: 'high-low' },
//                   ].map(opt => (
//                     <button key={opt.value} onClick={() => setsorttype(opt.value)}
//                       className={`w-full text-left text-sm px-2 py-2 rounded-lg
//                         transition-colors
//                         ${sorttype === opt.value
//                           ? 'bg-blue-50 text-blue-700 font-medium'
//                           : 'text-slate-600 hover:bg-slate-50'
//                         }`}>
//                       {opt.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* ── Main Content ── */}
//           <div className="flex-1 min-w-0">

//             {/* Top bar */}
//             <div className="flex flex-col sm:flex-row sm:items-center
//               justify-between gap-3 mb-5">
//               <div className="flex flex-wrap gap-2 items-center">
//                 {category.length === 0 ? (
//                   <span className="text-xs text-slate-400">All categories</span>
//                 ) : (
//                   category.map(cat => (
//                     <span key={cat}
//                       className="flex items-center gap-1.5 bg-blue-600 text-white
//                         text-xs font-medium px-3 py-1 rounded-full">
//                       {cat}
//                       <button onClick={() => togglecategory(cat)}
//                         className="hover:text-blue-200 transition-colors">
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor"
//                           strokeWidth={2.5} viewBox="0 0 24 24">
//                           <line x1="18" y1="6" x2="6" y2="18"/>
//                           <line x1="6" y1="6" x2="18" y2="18"/>
//                         </svg>
//                       </button>
//                     </span>
//                   ))
//                 )}
//                 {(priceRange[0] > 0 || priceRange[1] < priceMax) && (
//                   <span className="flex items-center gap-1.5 bg-slate-700 text-white
//                     text-xs font-medium px-3 py-1 rounded-full">
//                     Rs {priceRange[0].toLocaleString()} – {priceRange[1].toLocaleString()}
//                     <button onClick={() => setPriceRange([0, priceMax])}
//                       className="hover:text-slate-300 transition-colors">
//                       <svg className="w-3 h-3" fill="none" stroke="currentColor"
//                         strokeWidth={2.5} viewBox="0 0 24 24">
//                         <line x1="18" y1="6" x2="6" y2="18"/>
//                         <line x1="6" y1="6" x2="18" y2="18"/>
//                       </svg>
//                     </button>
//                   </span>
//                 )}
//               </div>

//               {/* Sort — desktop */}
//               <select onChange={e => setsorttype(e.target.value)} value={sorttype}
//                 className="hidden sm:block border border-slate-200 bg-white
//                   text-slate-700 text-sm px-3 py-2 rounded-xl outline-none
//                   focus:border-blue-400 cursor-pointer">
//                 <option value="relevent">Sort: Relevant</option>
//                 <option value="low-high">Price: Low to High</option>
//                 <option value="high-low">Price: High to Low</option>
//               </select>
//             </div>

//             {/* Product Grid */}
//             {filterproducts.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-24 text-center">
//                 <svg className="w-14 h-14 text-slate-200 mb-4" fill="none"
//                   stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
//                   <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
//                   <line x1="3" y1="6" x2="21" y2="6"/>
//                 </svg>
//                 <p className="text-slate-500 font-medium mb-1">No products found</p>
//                 <p className="text-slate-400 text-sm">Try adjusting your filters</p>
//                 {(category.length > 0 || priceRange[0] > 0 || priceRange[1] < priceMax) && (
//                   <button
//                     onClick={() => { setcategory([]); setPriceRange([0, priceMax]) }}
//                     className="mt-4 text-sm text-blue-600 font-medium
//                       hover:text-blue-800 underline">
//                     Clear all filters
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3
//                   gap-2 sm:gap-3 md:gap-2 gap-y-4 md:gap-y-4 lg:gap-4">
//                   {visibleProducts.map((item, index) => (
//                     <Productitems
//                       key={index}
//                       id={item._id}
//                       name={item.name}
//                       price={item.price}
//                       stock={item.stock}
//                       image={Array.isArray(item.image) ? item.image[0] : item.image}
//                       rating={item.rating || 0}
//                       reviewCount={item.reviewCount || 0}
//                     />
//                   ))}
//                 </div>

//                 {/* View More */}
//                 <div className="mt-10 flex flex-col items-center gap-3">
//                   <p className="text-xs text-slate-400">
//                     Showing {Math.min(visibleCount, filterproducts.length)} of{' '}
//                     {filterproducts.length} products
//                   </p>
//                   <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
//                     <div
//                       className="h-1 bg-blue-600 rounded-full transition-all duration-500"
//                       style={{
//                         width: `${Math.min(
//                           (visibleCount / filterproducts.length) * 100, 100
//                         )}%`
//                       }}
//                     />
//                   </div>
//                   {hasMore && (
//                     <button
//                       onClick={() => setvisibleCount(prev => prev + PRODUCTS_PER_PAGE)}
//                       className="mt-2 flex items-center gap-2 bg-white border
//                         border-slate-200 hover:border-blue-400 hover:text-blue-600
//                         text-slate-700 text-sm font-semibold px-8 py-3 rounded-xl
//                         transition-all duration-200 hover:shadow-md">
//                       View More
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor"
//                         strokeWidth={2.5} viewBox="0 0 24 24">
//                         <polyline points="6 9 12 15 18 9"/>
//                       </svg>
//                     </button>
//                   )}
//                   {!hasMore && filterproducts.length > PRODUCTS_PER_PAGE && (
//                     <p className="text-xs text-slate-400 font-medium">
//                       All products loaded
//                     </p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Collection

// pages/Collection.jsx
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import { useLocation, useSearchParams } from 'react-router-dom'
import Productitems from '../Components/Productitems'
import axios from 'axios'

const PRODUCTS_PER_PAGE = 9

const Collection = () => {
  const { products, search, showsearch, backendurl } = useContext(ShopContext)
  const location       = useLocation()
  const [searchParams] = useSearchParams()

  const [showfilter, setshowfilter]           = useState(false)
  const [filterproducts, setfilterproducts]   = useState([])
  const [category, setcategory]               = useState([])
  const [sorttype, setsorttype]               = useState('relevent')
  const [visibleCount, setvisibleCount]       = useState(PRODUCTS_PER_PAGE)
  const [priceRange, setPriceRange]           = useState([0, 50000])
  const [priceMax, setPriceMax]               = useState(50000)
  const [onSaleOnly, setOnSaleOnly]           = useState(false)
  const [dbCategories, setDbCategories]       = useState([])  // from DB

  // ── Fetch categories from DB ──
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.post(backendurl + '/api/category/list')
        if (data.success) setDbCategories(data.categories)
      } catch (err) {
        console.log('Category fetch error:', err)
      }
    }
    fetchCategories()
  }, [backendurl])

  // ── Also derive categories from products as fallback ──
  // This ensures any product category not in DB still shows up
  const allCategories = (() => {
    const fromDB   = dbCategories.map(c => ({ label: c.name, value: c.name }))
    const fromDB_lower = fromDB.map(c => c.value.toLowerCase())
    // Add any product categories not already in DB list
    const extra = [...new Set(products.map(p => p.category).filter(Boolean))]
      .filter(c => !fromDB_lower.includes(c.toLowerCase()))
      .map(c => ({ label: c, value: c }))
    return [...fromDB, ...extra]
  })()

  // ── Pre-select category from URL param or nav state ──
  useEffect(() => {
    const catParam = searchParams.get('category')
    if (catParam) {
      setcategory([catParam])
      setvisibleCount(PRODUCTS_PER_PAGE)
      return
    }
    if (location.state?.category) {
      setcategory([location.state.category])
      setvisibleCount(PRODUCTS_PER_PAGE)
      window.history.replaceState({}, document.title)
    }
  }, [location.state, searchParams])

  // ── Set price max from products ──
  useEffect(() => {
    if (products.length > 0) {
      const max     = Math.max(...products.map(p => p.price))
      const rounded = Math.ceil(max / 1000) * 1000
      setPriceMax(rounded)
      setPriceRange([0, rounded])
    }
  }, [products])

  const togglecategory = (value) => {
    setvisibleCount(PRODUCTS_PER_PAGE)
    setcategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  const applyfilter = () => {
    let productcopy = products.slice()

    if (search && showsearch) {
      productcopy = productcopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (category.length > 0) {
      productcopy = productcopy.filter(item =>
        category.map(c => c.toLowerCase()).includes(item.category?.toLowerCase())
      )
    }
    productcopy = productcopy.filter(item =>
      item.price >= priceRange[0] && item.price <= priceRange[1]
    )
    if (onSaleOnly) {
      productcopy = productcopy.filter(item => item.onSale && item.salePrice > 0)
    }
    if (sorttype === 'relevent') {
    productcopy = productcopy.sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    )
    }
    setfilterproducts(productcopy)
    }

  useEffect(() => {
    setvisibleCount(PRODUCTS_PER_PAGE)
    applyfilter()
  }, [category, search, showsearch, products, priceRange, onSaleOnly])

  const sortproduct = () => {
    let fpcopy = filterproducts.slice()
    switch (sorttype) {
      case 'low-high':
        setfilterproducts(fpcopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setfilterproducts(fpcopy.sort((a, b) => b.price - a.price))
        break
      default:
         // 'relevent' = newest first
        setfilterproducts(fpcopy.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
        ))
        break
        applyfilter()
        break
    }
  }

  useEffect(() => { sortproduct() }, [sorttype])

  const visibleProducts = filterproducts.slice(0, visibleCount)
  const hasMore         = visibleCount < filterproducts.length
  const saleCount       = products.filter(p => p.onSale && p.salePrice > 0).length

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-20 pb-12">

        {/* ── Page Header ── */}
        <div className="py-6 mb-6 border-b border-slate-200">
          <p className="text-xs font-semibold  text-gray-900 uppercase tracking-widest mb-1">Browse</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">All Collection</h1>
          {searchParams.get('category') && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-500">Filtered by:</span>
              <span className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                {searchParams.get('category')}
              </span>
            </div>
          )}
          <p className="text-sm text-slate-400 mt-1">
            {filterproducts.length} product{filterproducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">

          {/* ── Sidebar ── */}
          <aside className="w-full sm:w-56 flex-shrink-0">
            <button
              onClick={() => setshowfilter(!showfilter)}
              className="sm:hidden w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 mb-3 text-sm font-semibold text-slate-700"
            >
              <span>Filters</span>
              <svg className={`w-4 h-4 transition-transform duration-200 ${showfilter ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            <div className={`space-y-3 ${showfilter ? 'block' : 'hidden'} sm:block`}>

              {/* ── Sale Filter ── */}
              {saleCount > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Offers</p>
                  </div>
                  <div className="p-3">
                    <label className={`flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer transition-colors text-sm
                      ${onSaleOnly ? 'bg-red-50 text-red-600 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <input
                        type="checkbox"
                        checked={onSaleOnly}
                        onChange={() => { setOnSaleOnly(p => !p); setvisibleCount(PRODUCTS_PER_PAGE) }}
                        className="w-3.5 h-3.5 accent-red-500 flex-shrink-0"
                      />
                      <span className="flex items-center gap-1.5">
                        On Sale
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {saleCount}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* ── Categories — dynamic from DB ── */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Categories</p>
                  {category.length > 0 && (
                    <button
                      onClick={() => { setcategory([]); setvisibleCount(PRODUCTS_PER_PAGE) }}
                      className="text-[10px] text-blue-600 font-medium hover:text-blue-800"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="p-3 space-y-1">
                  {allCategories.length === 0 ? (
                    <p className="text-xs text-slate-400 px-2 py-1">Loading...</p>
                  ) : (
                    allCategories.map(cat => (
                      <label key={cat.value}
                        className={`flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer transition-colors text-sm
                          ${category.includes(cat.value)
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                          }`}>
                        <input
                          type="checkbox"
                          checked={category.includes(cat.value)}
                          onChange={() => togglecategory(cat.value)}
                          className="w-3.5 h-3.5 accent-blue-600 flex-shrink-0"
                        />
                        <span className="flex-1">{cat.label}</span>
                        <span className="text-[10px] text-slate-400">
                          {products.filter(p => p.category?.toLowerCase() === cat.value.toLowerCase()).length}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* ── Price Range ── */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Price Range</p>
                  <button onClick={() => setPriceRange([0, priceMax])}
                    className="text-[10px] text-blue-600 font-medium hover:text-blue-800">
                    Reset
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">
                      Rs {priceRange[0].toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400">—</span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">
                      Rs {priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-slate-400">Min</label>
                      <span className="text-[10px] text-slate-500">Rs {priceRange[0].toLocaleString()}</span>
                    </div>
                    <input type="range" min={0} max={priceMax} step={100}
                      value={priceRange[0]}
                      onChange={e => {
                        const val = Number(e.target.value)
                        if (val <= priceRange[1]) setPriceRange([val, priceRange[1]])
                      }}
                      className="w-full accent-blue-600 h-1.5 cursor-pointer" />
                    <div className="flex items-center justify-between mt-2">
                      <label className="text-[10px] text-slate-400">Max</label>
                      <span className="text-[10px] text-slate-500">Rs {priceRange[1].toLocaleString()}</span>
                    </div>
                    <input type="range" min={0} max={priceMax} step={100}
                      value={priceRange[1]}
                      onChange={e => {
                        const val = Number(e.target.value)
                        if (val >= priceRange[0]) setPriceRange([priceRange[0], val])
                      }}
                      className="w-full accent-blue-600 h-1.5 cursor-pointer" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[
                      { label: 'Under 1k', min: 0,    max: 1000     },
                      { label: '1k–3k',    min: 1000, max: 3000     },
                      { label: '3k–5k',    min: 3000, max: 5000     },
                      { label: '5k+',      min: 5000, max: priceMax },
                    ].map(preset => (
                      <button key={preset.label}
                        onClick={() => setPriceRange([preset.min, preset.max])}
                        className={`text-[10px] px-2 py-1 rounded-lg border font-medium transition-colors
                          ${priceRange[0] === preset.min && priceRange[1] === preset.max
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                          }`}>
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sort — mobile */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden sm:hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Sort By</p>
                </div>
                <div className="p-3 space-y-1">
                  {[
                    { label: 'Newest First',           value: 'relevent' },
                    { label: 'Price: Low to High', value: 'low-high' },
                    { label: 'Price: High to Low', value: 'high-low' },
                  ].map(opt => (
                    <button key={opt.value} onClick={() => setsorttype(opt.value)}
                      className={`w-full text-left text-sm px-2 py-2 rounded-lg transition-colors
                        ${sorttype === opt.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">

            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex flex-wrap gap-2 items-center">
                {category.length === 0 && !onSaleOnly ? (
                  <span className="text-xs text-slate-400">All categories</span>
                ) : (
                  <>
                    {category.map(cat => (
                      <span key={cat}
                        className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {cat}
                        <button onClick={() => togglecategory(cat)} className="hover:text-blue-200 transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </span>
                    ))}
                    {onSaleOnly && (
                      <span className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        On Sale
                        <button onClick={() => setOnSaleOnly(false)} className="hover:text-red-200 transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </span>
                    )}
                  </>
                )}
                {(priceRange[0] > 0 || priceRange[1] < priceMax) && (
                  <span className="flex items-center gap-1.5 bg-slate-700 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Rs {priceRange[0].toLocaleString()} – {priceRange[1].toLocaleString()}
                    <button onClick={() => setPriceRange([0, priceMax])} className="hover:text-slate-300 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </span>
                )}
              </div>

              {/* Sort — desktop */}
              <select onChange={e => setsorttype(e.target.value)} value={sorttype}
                className="hidden sm:block border border-slate-200 bg-white text-slate-700 text-sm px-3 py-2 rounded-xl outline-none focus:border-blue-400 cursor-pointer">
                <option value="relevent">Sort: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Product Grid */}
            {filterproducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg className="w-14 h-14 text-slate-200 mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                </svg>
                <p className="text-slate-500 font-medium mb-1">No products found</p>
                <p className="text-slate-400 text-sm">Try adjusting your filters</p>
                {(category.length > 0 || onSaleOnly || priceRange[0] > 0 || priceRange[1] < priceMax) && (
                  <button
                    onClick={() => { setcategory([]); setPriceRange([0, priceMax]); setOnSaleOnly(false) }}
                    className="mt-4 text-sm text-blue-600 font-medium hover:text-blue-800 underline">
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-2 gap-y-4 md:gap-y-4 lg:gap-4">
                  {visibleProducts.map((item, index) => (
                    <Productitems
                      key={index}
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      stock={item.stock}
                      image={Array.isArray(item.image) ? item.image[0] : item.image}
                      rating={item.rating || 0}
                      reviewCount={item.reviewCount || 0}
                      onSale={item.onSale || false}
                      salePrice={item.salePrice || 0}
                    />
                  ))}
                </div>

                {/* View More */}
                <div className="mt-10 flex flex-col items-center gap-3">
                  <p className="text-xs text-slate-400">
                    Showing {Math.min(visibleCount, filterproducts.length)} of {filterproducts.length} products
                  </p>
                  <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-1 bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((visibleCount / filterproducts.length) * 100, 100)}%` }}
                    />
                  </div>
                  {hasMore && (
                    <button
                      onClick={() => setvisibleCount(prev => prev + PRODUCTS_PER_PAGE)}
                      className="mt-2 flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 text-sm font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-md">
                      View More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                  )}
                  {!hasMore && filterproducts.length > PRODUCTS_PER_PAGE && (
                    <p className="text-xs text-slate-400 font-medium">All products loaded</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection