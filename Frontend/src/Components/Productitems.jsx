// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { ShopContext } from '../../Context/Shopcontext'
// import { FaHeart, FaRegHeart } from 'react-icons/fa'
// import axios from 'axios'

// const Productitems = ({ id, image, name, price, rating = 0, reviewCount = 0 }) => {
//   const { backendurl, token, wishlist, setWishlist, currency } = useContext(ShopContext)

//   const handleWishlist = async (e) => {
//     e.preventDefault()
//     if (!token) return
//     try {
//       const res = await axios.post(
//         backendurl + '/api/wishlist/toggle',
//         { productId: id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       if (res.data.success) {
//         setWishlist(res.data.wishlist)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const isWishlisted = wishlist?.includes(id)

//   // Only show stars if product has at least one approved review
//   const hasRating = rating > 0 && reviewCount > 0

//   return (
//     <Link to={`/product/${id}`} className="group block">
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50">

//         {/* ── Image ── */}
//         <div className="relative overflow-hidden bg-slate-50">
//           <img
//             src={image}
//             alt={name}
//             className="w-full h-30 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
//           />

//           {/* Wishlist button */}
//           <button
//             onClick={handleWishlist}
//             className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border
//               ${isWishlisted
//                 ? 'bg-red-50 border-red-200 text-red-500'
//                 : 'bg-white/90 border-slate-200 text-slate-400 hover:text-red-400 hover:border-red-200'
//               }`}
//           >
//             {isWishlisted
//               ? <FaHeart size={14} />
//               : <FaRegHeart size={14} />
//             }
//           </button>

//           {/* Rating badge on image — only if has reviews */}
//           {hasRating && (
//             <div className="hidden absolute bottom-2 left-2 sm:flex items-center gap-1 bg-white/90 backdrop-blur-sm
//               border border-slate-100 rounded-full px-2 py-0.5">
//               <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//               </svg>
//               <span className="text-[10px] font-semibold text-slate-700">{rating}</span>
//               <span className="text-[10px] text-slate-400">({reviewCount})</span>
//             </div>
//           )}
//         </div>

//         {/* ── Info ── */}
//         <div className="px-2 py-1 sm:p-4">
//           <p className="text-sm  font-medium sm:font-semibold text-slate-800 line-clamp-2 mb-1 sm:mb-1.5 group-hover:text-blue-600 transition-colors duration-200">
//             {name}
//           </p>

//           {/* Stars row — show real stars if rated, show 'No reviews' if not */}
//           <div className="flex items-center gap-1  sm:mb-2">
//             {hasRating ? (
//               <>
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <svg
//                       key={i}
//                       className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-slate-200'}`}
//                       fill="currentColor" viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                     </svg>
//                   ))}
//                 </div>
//                 <span className="text-[11px] text-slate-400">{reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>
//               </>
//             ) : (
//               <span className="text-[11px] text-slate-300">No reviews yet</span>
//             )}
//           </div>

//           {/* Price + Arrow */}
//           <div className="flex items-center justify-between">
//             <p className="text-base sm:text-lg font-semibold sm:font-bold text-slate-900">
//               {currency}{price}
//             </p>
//             <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
//               <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors duration-200"
//                 fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//                 <path d="M5 12h14M12 5l7 7-7 7"/>
//               </svg>
//             </div>
//           </div>
//         </div>

//       </div>
//     </Link>
//   )
// }

// export default Productitems


// //2nd
// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { ShopContext } from '../../Context/Shopcontext'
// import { FaHeart, FaRegHeart } from 'react-icons/fa'
// import axios from 'axios'

// const Productitems = ({ id, image, name, price, rating = 0, reviewCount = 0, stock = 0 }) => {
//   const { backendurl, token, wishlist, setWishlist, currency } = useContext(ShopContext)

//   const isOutOfStock = stock === 0

//   const handleWishlist = async (e) => {
//     e.preventDefault()
//     if (!token) return
//     try {
//       const res = await axios.post(
//         backendurl + '/api/wishlist/toggle',
//         { productId: id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       if (res.data.success) {
//         setWishlist(res.data.wishlist)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const isWishlisted = wishlist?.includes(id)
//   const hasRating    = rating > 0 && reviewCount > 0
// // console.log(name, 'stock:', stock)
//   return (
//     <Link to={`/product/${id}`} className="group block">
//       <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300
//         ${isOutOfStock
//           ? 'border-slate-200 opacity-75'
//           : 'border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50'
//         }`}
//       >

//         {/* ── Image ── */}
//         <div className="relative overflow-hidden bg-slate-50">
//           <img
//             src={image}
//             alt={name}
//             className={`w-full h-30 sm:h-56 object-cover transition-transform duration-500
//               ${!isOutOfStock ? 'group-hover:scale-105' : ''}`}
//           />

//           {/* Out of stock overlay */}
//           {isOutOfStock && (
//             <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
//               <span className="bg-white border border-red-200 text-red-500 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
//                 Out of Stock
//               </span>
//             </div>
//           )}

//           {/* Wishlist button */}
//           <button
//             onClick={handleWishlist}
//             className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border
//               ${isWishlisted
//                 ? 'bg-red-50 border-red-200 text-red-500'
//                 : 'bg-white/90 border-slate-200 text-slate-400 hover:text-red-400 hover:border-red-200'
//               }`}
//           >
//             {isWishlisted ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
//           </button>

//           {/* Rating badge */}
//           {hasRating && !isOutOfStock && (
//             <div className="hidden absolute bottom-2 left-2 sm:flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full px-2 py-0.5">
//               <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//               </svg>
//               <span className="text-[10px] font-semibold text-slate-700">{rating}</span>
//               <span className="text-[10px] text-slate-400">({reviewCount})</span>
//             </div>
//           )}
//         </div>

//         {/* ── Info ── */}
//         <div className="px-2 py-1 sm:p-4">
//           <p className={`text-sm font-medium sm:font-semibold line-clamp-2 mb-1 sm:mb-1.5 transition-colors duration-200
//             ${isOutOfStock ? 'text-slate-400' : 'text-slate-800 group-hover:text-blue-600'}`}
//           >
//             {name}
//           </p>

//           {/* Stars */}
//           <div className="flex items-center gap-1 sm:mb-2">
//             {hasRating ? (
//               <>
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-slate-200'}`}
//                       fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                     </svg>
//                   ))}
//                 </div>
//                 <span className="text-[11px] text-slate-400">{reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>
//               </>
//             ) : (
//               <span className="text-[11px] text-slate-300">No reviews yet</span>
//             )}
//           </div>

//           {/* Price + Arrow */}
//           <div className="flex items-center justify-between">
//             <p className={`text-base sm:text-lg font-semibold sm:font-bold
//               ${isOutOfStock ? 'text-slate-400' : 'text-slate-900'}`}
//             >
//               {currency}{price}
//             </p>

//             {isOutOfStock ? (
//               <span className="text-xs font-semibold text-red-400 bg-red-50 border border-red-100 px-2 py-1 rounded-lg">
//                 Unavailable
//               </span>
//             ) : (
//               <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
//                 <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors duration-200"
//                   fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//                   <path d="M5 12h14M12 5l7 7-7 7"/>
//                 </svg>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default Productitems


// components/Productitems.jsx
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/Shopcontext'
import { FaArrowAltCircleRight, FaHeart, FaRegHeart } from 'react-icons/fa'
import axios from 'axios'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
const Productitems = ({
  id, image, name, price,
  rating = 0, reviewCount = 0,
  stock = 1,
  onSale = false, salePrice = 0
}) => {
  const { backendurl, token, wishlist, setWishlist, currency } = useContext(ShopContext)

  const isOutOfStock  = stock === 0
  const hasRating     = rating > 0 && reviewCount > 0
  const displayPrice  = onSale && salePrice > 0 ? salePrice : price
  const discountPct   = onSale && salePrice > 0
    ? Math.round(((price - salePrice) / price) * 100)
    : 0

  const handleWishlist = async (e) => {
    e.preventDefault()
    if (!token) return
    try {
      const res = await axios.post(
        backendurl + '/api/wishlist/toggle',
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.success) setWishlist(res.data.wishlist)
    } catch (err) {
      console.log(err)
    }
  }

  const isWishlisted = wishlist?.includes(id)

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300
        ${isOutOfStock
          ? 'border-slate-200 opacity-75'
          : 'border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50'
        }`}
      >
        {/* ── Image ── */}
        <div className="relative overflow-hidden bg-slate-50">
          <img
            src={image}
            alt={name}
            className={`w-full h-30 sm:h-56 object-cover transition-transform duration-500
              ${!isOutOfStock ? 'group-hover:scale-105' : ''}`}
          />

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="bg-white border border-red-200 text-red-500 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Out of Stock
              </span>
            </div>
          )}

          {/* Sale badge — top left */}
          {onSale && !isOutOfStock && discountPct > 0 && (
            <div className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              -{discountPct}%
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border
              ${isWishlisted
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'bg-white/90 border-slate-200 text-slate-400 hover:text-red-400 hover:border-red-200'
              }`}
          >
            {isWishlisted ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
          </button>

          {/* Rating badge */}
          {hasRating && !isOutOfStock && (
            <div className="hidden absolute bottom-2 left-2 sm:flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full px-2 py-0.5">
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-[10px] font-semibold text-slate-700">{rating}</span>
              <span className="text-[10px] text-slate-400">({reviewCount})</span>
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="px-2 py-1 sm:p-4">
          <p className={`text-sm font-medium sm:font-semibold line-clamp-2 mb-1 sm:mb-1.5 transition-colors duration-200
            ${isOutOfStock ? 'text-slate-400' : 'text-slate-800 group-hover:text-blue-600'}`}
          >
            {name}
          </p>

          {/* Stars */}
          <div className="flex items-center gap-1 sm:mb-2">
            {hasRating ? (
              <>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-slate-200'}`}
                      fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-[11px] text-slate-400">{reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>
              </>
            ) : (
              <span className="text-[11px] text-slate-300">No reviews yet</span>
            )}
          </div>

          {/* Price + Arrow */}
          <div className="flex items-center justify-between">
            <div>
              {onSale && salePrice > 0 ? (
                <div className="flex items-center gap-1.5">
                  <p className="text-base sm:text-lg font-bold text-red-500">
                    {currency}{salePrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400 line-through">
                    {currency}{price.toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className={`text-base sm:text-lg font-semibold sm:font-bold
                  ${isOutOfStock ? 'text-slate-400' : 'text-slate-900'}`}
                >
                  {currency}{price.toLocaleString()}
                </p>
              )}
            </div>

            {isOutOfStock ? (
              <span className=" hidden sm:flex text-xs font-semibold text-red-400 bg-red-50 border border-red-100 px-2 py-1 rounded-lg">
                Unavailable
              </span>
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
               <FaArrowRight className=' text-gray-400 group-hover:text-white '/>
               
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Productitems