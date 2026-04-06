// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../../Context/Shopcontext'
// import { assets } from '../assets/assets';
// import Title from '../Components/Title';
// import Productitems from '../Components/Productitems';
// import { dimensionValueTypes } from 'framer-motion';
// // import toast from "react-toastify"

// const Collection = () => {
// //     useEffect(() => {
// //     toast.info("Welcome to Collection Page 📦");
// //   }, []); 
//     const {products,search,showsearch,setshowsearch} =useContext(ShopContext);
//     const [Showfilter,setshowfilter]=useState(false)
//     const [filterproducts,setfilterproducts]=useState([]);
//     const[category,setcategory]=useState([]);
//     const[subcategory,setsubcategory]=useState([]);
// const [sorttype,setsorttype]=useState("relevent");

//     const togglecategory=(e)=>{
//     if(category.includes(e.target.value)){
//         setcategory(prev=> prev.filter(item=> item !== e.target.value))
//     }
//     else{
//         setcategory(prev=> [...prev ,e.target.value])
//     }
//     }

//     const togglesubcategory=(e)=>{
//     if(subcategory.includes(e.target.value)){
//         setsubcategory(prev=> prev.filter(item=> item !== e.target.value))
//     }
//     else{
//         setsubcategory(prev=> [...prev ,e.target.value])
//     }
//     }


//     const applyfilter=()=>{
//         let productcopy=products.slice();

// if(search && showsearch ){
//     productcopy=productcopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
// }

//         if(category.length >0){
//             productcopy=productcopy.filter(item=> category.includes(item.category))
//         }
//         if(subcategory.length >0){
//             productcopy=productcopy.filter(item=> subcategory.includes(item.subcategory))
//         }
//         setfilterproducts(productcopy);
//     }

//      useEffect(()=>{
//         applyfilter();
//     },[category,subcategory,search,showsearch,products])
    
//     const sortproduct=()=>{
//         let fpcopy=filterproducts.slice();
//         switch(sorttype){
//             case "low-high":
//               setfilterproducts(fpcopy.sort((a,b)=>(a.price - b.price)));
//               break;  
//               case "high-low":
//               setfilterproducts(fpcopy.sort((a,b)=>(b.price - a.price)));
//               break;  
//               default: 
//               applyfilter();
//               break;  
//         }
//     }
//     useEffect(()=>{
//     sortproduct();
//     },[sorttype])
   
//   return (
//       <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] sm:pt-20 sm '>
//     <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 '>
// {/* filter option */}
//    <div className='min-w-60'>
//     <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
//     <img className={`h-3 sm:hidden ${Showfilter ? 'rotate-90' : ''} `} src={assets.dropdown} alt="" />

//     </p>
//     {/* catagetory filter */}
//     <div className={`border border-gray-300 pl-5 py-3 my-5 ${Showfilter ?'' :'hidden'} sm:block`}>
//         <p className='mb-3 text-sm font-medium'>Catageries</p>
//         <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//             <p className='flex gap-2'>
//                 <input className='w-3' type="checkbox" value={'bedsheets'} onChange={togglecategory} />Bedsheets
//             </p>
//              <p className='flex gap-2'>
//                 <input className='w-3' type="checkbox" value={'Pillows'} onChange={togglecategory}/>Pillows
//             </p>
//              <p className='flex gap-2'>
//                 <input className='w-3' type="checkbox" value={'Curtains'} onChange={togglecategory}/>Curtains
//             </p>
//              <p className='flex gap-2'>
//                 <input className='w-3' type="checkbox" value={'Quilt'} onChange={togglecategory}/>Quilt
//             </p>
//         </div>
//     </div>
  
//     </div> 
//     <div className='flex-1'>
//         <div className='flex justify-between text-base sm:text-2xl mb-4'>
//            <Title text1={"All"} text2={"Collection"}/> 
//            {/* product sort */}
//                    <select onChange={(e)=>setsorttype(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
//                     <option value="relevent">Sort by relevent</option>
//                     <option value="low-high">Sort by low tp high</option>
//                     <option value="high-low">Sort by high to low</option>
//                    </select>
//             </div>
//             {/* map product */}
//             <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 gap-y-6'>
//                 {
//                     filterproducts.map((item,index)=>(
//                        <Productitems key={index} name={item.name} id={item._id} price={item.price}         image={Array.isArray(item.image) ? item.image[0] : item.image }
// />
//                     ))
//                 }
//             </div>

//             </div>  
//     </div>
//     </div>
//   )

// }

// export default Collection










  {/* sub category */}
    {/* <div className={`border border-gray-300 pl-5 py-3 mt-6 ${Showfilter ?'' :'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>Type</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'kid'} onChange={togglesubcategory}/>kid
            </p>
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'bottomwear'} onChange={togglesubcategory}/>Fancy
            </p >
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'charmy'} onChange={togglesubcategory}/>Charmy
            </p>
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'awesom'} onChange={togglesubcategory}/>Awesom
            </p>
        </div>
    </div> */}


import React, { useContext, useEffect, useState, useMemo } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import { useLocation } from 'react-router-dom'
import Productitems from '../Components/Productitems'

const PRODUCTS_PER_PAGE = 9

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext)
  const location = useLocation()

  const [showfilter, setshowfilter]       = useState(false)
  const [filterproducts, setfilterproducts] = useState([])
  const [category, setcategory]           = useState([])
  const [sorttype, setsorttype]           = useState('relevent')
  const [visibleCount, setvisibleCount]   = useState(PRODUCTS_PER_PAGE)
  const [priceRange, setPriceRange]       = useState([0, 50000])
  const [priceMax, setPriceMax]           = useState(50000)

  // ── Pre-select category from Home ──
  useEffect(() => {
    if (location.state?.category) {
      setcategory([location.state.category])
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  // ── Set price max from products ──
  useEffect(() => {
    if (products.length > 0) {
      const max = Math.max(...products.map(p => p.price))
      const rounded = Math.ceil(max / 1000) * 1000
      setPriceMax(rounded)
      setPriceRange([0, rounded])
    }
  }, [products])

  const togglecategory = (value) => {
    setvisibleCount(PRODUCTS_PER_PAGE)
    setcategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
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

    // Price range filter
    productcopy = productcopy.filter(item =>
      item.price >= priceRange[0] && item.price <= priceRange[1]
    )

    setfilterproducts(productcopy)
  }

  useEffect(() => {
    setvisibleCount(PRODUCTS_PER_PAGE)
    applyfilter()
  }, [category, search, showsearch, products, priceRange])

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
        applyfilter()
        break
    }
  }

  useEffect(() => { sortproduct() }, [sorttype])

  const visibleProducts = filterproducts.slice(0, visibleCount)
  const hasMore = visibleCount < filterproducts.length

  const categories = [
    { label: 'Bedsheets',     value: 'Bedsheets' },
    { label: 'Curtains',      value: 'Curtains' },
    { label: 'Quilts',        value: 'Quilts' },
    { label: 'Cushions',      value: 'Cushions' },
    { label: 'Pillow Covers', value: 'Pillow Covers' },
    { label: 'Blankets',      value: 'Blankets' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-20 pb-12">

        {/* ── Page Header ── */}
        <div className="py-6 mb-6 border-b border-slate-200">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Browse</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">All Collection</h1>
          <p className="text-sm text-slate-400 mt-1">
            {filterproducts.length} product{filterproducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">

          {/* ══════════════════════════
              SIDEBAR
          ══════════════════════════ */}
          <aside className="w-full sm:w-56 flex-shrink-0">

            {/* Mobile toggle */}
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

              {/* ── Categories ── */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Categories</p>
                  {category.length > 0 && (
                    <button onClick={() => { setcategory([]); setvisibleCount(PRODUCTS_PER_PAGE) }}
                      className="text-[10px] text-blue-600 font-medium hover:text-blue-800">
                      Clear
                    </button>
                  )}
                </div>
                <div className="p-3 space-y-1">
                  {categories.map((cat) => (
                    <label key={cat.value}
                      className={`flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer transition-colors text-sm
                        ${category.includes(cat.value) ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <input
                        type="checkbox"
                        checked={category.includes(cat.value)}
                        onChange={() => togglecategory(cat.value)}
                        className="w-3.5 h-3.5 accent-blue-600 flex-shrink-0"
                      />
                      {cat.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* ── Price Range ── */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Price Range</p>
                  <button
                    onClick={() => setPriceRange([0, priceMax])}
                    className="text-[10px] text-blue-600 font-medium hover:text-blue-800"
                  >
                    Reset
                  </button>
                </div>
                <div className="p-4">
                  {/* Min/Max display */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">
                      Rs {priceRange[0].toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400">—</span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">
                      Rs {priceRange[1].toLocaleString()}
                    </span>
                  </div>

                  {/* Min slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-slate-400">Min</label>
                      <span className="text-[10px] text-slate-500">Rs {priceRange[0].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={priceMax}
                      step={100}
                      value={priceRange[0]}
                      onChange={e => {
                        const val = Number(e.target.value)
                        if (val <= priceRange[1]) setPriceRange([val, priceRange[1]])
                      }}
                      className="w-full accent-blue-600 h-1.5 cursor-pointer"
                    />

                    {/* Max slider */}
                    <div className="flex items-center justify-between mt-2">
                      <label className="text-[10px] text-slate-400">Max</label>
                      <span className="text-[10px] text-slate-500">Rs {priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={priceMax}
                      step={100}
                      value={priceRange[1]}
                      onChange={e => {
                        const val = Number(e.target.value)
                        if (val >= priceRange[0]) setPriceRange([priceRange[0], val])
                      }}
                      className="w-full accent-blue-600 h-1.5 cursor-pointer"
                    />
                  </div>

                  {/* Quick presets */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[
                      { label: 'Under 1k',   min: 0,    max: 1000  },
                      { label: '1k–3k',      min: 1000, max: 3000  },
                      { label: '3k–5k',      min: 3000, max: 5000  },
                      { label: '5k+',        min: 5000, max: priceMax },
                    ].map(preset => (
                      <button
                        key={preset.label}
                        onClick={() => setPriceRange([preset.min, preset.max])}
                        className={`text-[10px] px-2 py-1 rounded-lg border font-medium transition-colors
                          ${priceRange[0] === preset.min && priceRange[1] === preset.max
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                          }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sort — mobile only */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden sm:hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Sort By</p>
                </div>
                <div className="p-3 space-y-1">
                  {[
                    { label: 'Relevant',          value: 'relevent' },
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

          {/* ══════════════════════════
              MAIN CONTENT
          ══════════════════════════ */}
          <div className="flex-1 min-w-0">

            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex flex-wrap gap-2 items-center">
                {category.length === 0 ? (
                  <span className="text-xs text-slate-400">All categories</span>
                ) : (
                  category.map(cat => (
                    <span key={cat}
                      className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {cat}
                      <button onClick={() => togglecategory(cat)} className="hover:text-blue-200 transition-colors">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </span>
                  ))
                )}
                {(priceRange[0] > 0 || priceRange[1] < priceMax) && (
                  <span className="flex items-center gap-1.5 bg-slate-700 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Rs {priceRange[0].toLocaleString()} – {priceRange[1].toLocaleString()}
                    <button onClick={() => setPriceRange([0, priceMax])} className="hover:text-slate-300 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
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

            {/* ── Product Grid ── */}
            {filterproducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg className="w-14 h-14 text-slate-200 mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                </svg>
                <p className="text-slate-500 font-medium mb-1">No products found</p>
                <p className="text-slate-400 text-sm">Try adjusting your filters</p>
                {(category.length > 0 || priceRange[0] > 0 || priceRange[1] < priceMax) && (
                  <button
                    onClick={() => { setcategory([]); setPriceRange([0, priceMax]) }}
                    className="mt-4 text-sm text-blue-600 font-medium hover:text-blue-800 underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid gap-y-4 grid-cols-2  md:grid-cols-2 lg:gap-4 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-2 md:gap-y-4">
                  {visibleProducts.map((item, index) => (
                    <Productitems
                      key={index}
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      image={Array.isArray(item.image) ? item.image[0] : item.image}
                      rating={item.rating || 4.5}
                    />
                  ))}
                </div>

                {/* ── View More / Count ── */}
                <div className="mt-10 flex flex-col items-center gap-3">
                  <p className="text-xs text-slate-400">
                    Showing {Math.min(visibleCount, filterproducts.length)} of {filterproducts.length} products
                  </p>

                  {/* Progress bar */}
                  <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-1 bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((visibleCount / filterproducts.length) * 100, 100)}%` }}
                    />
                  </div>

                  {hasMore && (
                    <button
                      onClick={() => setvisibleCount(prev => prev + PRODUCTS_PER_PAGE)}
                      className="mt-2 flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 text-sm font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-md"
                    >
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