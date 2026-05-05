// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../../Context/Shopcontext';
// import { assets } from '../assets/assets';
// import Relatedproduct from '../Components/Relatedproduct';
// import { backendurl } from '../../../Admin/src/App';
// import axios from "axios"
// import Productzoom from '../Components/Productzoom';
// const Product = () => {
//   const { productid } = useParams();
//   const { products,currency,addtocart } = useContext(ShopContext);
//   const [productdata, setproductdata] = useState(false);
//   const [image, setimage] = useState("");
//   const [size,setsize]=useState('');

//   const fetchproductdata = async () => {
//   try {
//     const response = await axios.post(backendurl + "/api/product/single", {
//       productid
//     });

//     if (response.data.success) {
//       setproductdata(response.data.product);
//       setimage(response.data.product.image[0]);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };



  

//   useEffect(() => {
//     fetchproductdata();
//   }, [productid])
//   return productdata ? (
//     <div className='px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw] pt-20'>
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//       {/* productdata */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
//         {/* productimages */}
//      <div className=' flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
 
//   {productdata.image.map((item, index) => (
//           <img onClick={()=>setimage(item)}
//             src={item}
//             key={index}
//             className="w-[24%] sm:w-full sm:mb-3  shrink-0 cursor-pointer"
//             alt=""
//           />
//         ))}
// </div >
// <div className='w-full sm:w-[80%]'>
// <img className='w-full h-auto' src={image} alt="" />
// </div>

//         </div>
//         {/* product info */}
//        <div className="flex-1 ">
//         <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
//         <div className="flex items-center gap-1 mt-2">
//           <img src={assets.star_icon} alt="" className="w3 5" />
//           <img src={assets.star_icon} alt="" className="w3 5" />
//           <img src={assets.star_icon} alt="" className="w3 5" />
//           <img src={assets.star_icon} alt="" className="w3 5" />
//           <img src={assets.star_dull_icon} alt="" className="w3 5" />
//           <p className='pl-2'>{122}</p>
//         </div>
// <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
// <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
// <div className='flex flex-col gap-4 my-8'>
//  <p className='font-bold'>Select size</p>
//   <div className='flex gap-2'>
//     {productdata?.sizes?.map((item,index)=>{
// return   <button onClick={()=>(setsize(item))} className={`border py-2 px-4   bg-gray-100 ${item===size ? 'border-orange-500' : ''} `} key={index}> {item}</button>
//   })}</div>
// </div>
// <button onClick={()=>addtocart(productdata._id,size )} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
// <hr className='mt-8 sm:w-4/5'/>
// <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
//   <p>100% rignal product</p>
//   <p>Cash on delievery is available in this product </p>
//   <p>Easy return and exchange policy</p>
// </div>
//        </div>
//     </div>
//     {/* description review */}
//     <div className='mt-20'>
//       <div className="flex">
//         <b className='border px-5 py-3 text-sm'>Description</b>
//         <b className='border px-5 py-3 text-sm'>Reviews(122)</b>

//       </div>
//       <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//         <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur, possimus..</p>
//         <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit enim in itaque placeat quos nostrum ipsa necessitatibus assumenda tempora illo. adiploeisicing.</p>
//       </div>
//     </div>
//     {/* display related product */}
//     <Relatedproduct category={productdata.category } subcategory={productdata.subcategory}/>
//     </div>
//     </div>
//   ) : <div className='opacity-0'></div>

// }


// export default Product

 

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../Context/Shopcontext'
import Relatedproduct from '../Components/Relatedproduct'
import axios from 'axios'

const StarRating = ({ rating = 0, onChange, interactive = false }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(s => (
      <button
        key={s}
        type={interactive ? 'button' : undefined}
        onClick={() => interactive && onChange && onChange(s)}
        className={interactive ? 'cursor-pointer' : 'cursor-default'}
      >
        <svg
          className={`w-4 h-4 ${s <= rating ? 'text-yellow-400' : 'text-slate-200'}`}
          fill="currentColor" viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ))}
  </div>
)

const Product = () => {
  const { productid } = useParams()
  const { products, currency, addtocart, backendurl, token } = useContext(ShopContext)

  const [productdata, setproductdata] = useState(null)
  const [image, setimage] = useState("")
  const [size, setsize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  // Reviews state
  const [reviews, setReviews] = useState([])
  const [reviewSubmittedMsg, setReviewSubmittedMsg] = useState(false)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: ''
  })
  const [hasReviewed, setHasReviewed] = useState(false)

  const fetchproductdata = async () => {
    try {
      const response = await axios.post(backendurl + "/api/product/single", { productid })
      if (response.data.success) {
        setproductdata(response.data.product)
        setimage(response.data.product.image[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

 // Fetch reviews — corrected
const fetchReviews = async () => {
  setReviewLoading(true)
  try {
    const { data } = await axios.post(backendurl + '/api/review/list', {
      productId: productid
    })
    if (data.success) {
      setReviews(data.reviews)
    }
  } catch (err) {
    console.log('Reviews not available yet')
  } finally {
    setReviewLoading(false)
  }
}
// Check if logged-in user already reviewed this product
const checkUserReview = async () => {
  if (!token) return
  try {
    const { data } = await axios.post(
      backendurl + '/api/review/check',
      { productId: productid },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (data.success) {
      setHasReviewed(data.hasReviewed)
    }
  } catch (err) {
    console.log('Check review error:', err)
  }
}
  // Submit review — ready for backend
 const handleSubmitReview = async (e) => {
  e.preventDefault()
  if (!reviewForm.rating) {
    alert('Please select a rating')
    return
  }
  if (!reviewForm.comment.trim()) {
    alert('Please write a comment')
    return
  }

  setSubmitting(true)
  try {
    const { data } = await axios.post(
      backendurl + '/api/review/add',
      { productId: productid, ...reviewForm },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (data.success) {
      // ── Don't add to reviews list — it's pending approval ──
      // Just mark as reviewed and clear form
      setReviewForm({ rating: 0, comment: '' })
      setHasReviewed(true)
      setReviewSubmittedMsg(true)   // show a pending notice
    } else {
      alert(data.message)
    }
  } catch (err) {
    console.log('Submit review error:', err)
  } finally {
    setSubmitting(false)
  }
}
  useEffect(() => {
    fetchproductdata()
  }, [productid])

  useEffect(() => {
  if (activeTab === 'reviews') {
    fetchReviews()
    checkUserReview()   // ← runs independently, correct source of truth
  }
}, [activeTab, productid, token])

  const hasSizes = productdata?.sizes && productdata.sizes.length > 0

  // Average rating
  const avgRating = reviews.length > 0
  ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  : productdata?.rating > 0
    ? productdata.rating.toFixed(1)
    : null   // null means no rating yet

  if (!productdata) return <div className="opacity-0 h-screen" />

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-20 pb-16'>
      <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

        {/* ── Product Main Section ── */}
        <div className='flex gap-10 flex-col sm:flex-row'>

          {/* ── Images ── */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            {/* Thumbnails */}
            <div className="flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2 sm:w-[18%]">
              {productdata.image.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setimage(item)}
                  src={item}
                  className={`w-20 sm:w-full flex-shrink-0 cursor-pointer rounded-lg border-2 transition-all duration-200
                    ${image === item ? 'border-blue-600' : 'border-transparent hover:border-slate-300'}`}
                  alt=""
                />
              ))}
            </div>

            {/* Main image */}
            <div className='w-full sm:w-[80%]'>
              <img
                className='w-full h-auto rounded-xl object-cover'
                src={image}
                alt={productdata.name}
              />
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="flex-1">
            <h1 className='font-bold text-2xl sm:text-3xl text-slate-900 mt-2'>
              {productdata.name}
            </h1>

            {/* Rating row */}
        <div className="flex items-center gap-2 mt-3">
  {avgRating ? (
    <>
      <StarRating rating={Math.round(avgRating)} />
      <span className="text-sm text-slate-500">
        {avgRating} · {reviews.length > 0 ? reviews.length : productdata.reviewCount} review{(reviews.length || productdata.reviewCount) !== 1 ? 's' : ''}
      </span>
    </>
  ) : (
    <span className="text-sm text-slate-400">No reviews yet</span>
  )}
</div>

            <p className='mt-5 text-3xl font-bold text-slate-900'>
              {currency}{productdata.price}
            </p>

            <p className='mt-4 text-slate-500 leading-relaxed md:w-4/5'>
              {productdata.description}
            </p>

            {/* ── Size selector — only if product has sizes ── */}
            {hasSizes && (
              <div className='flex flex-col gap-3 my-6'>
                <p className='font-semibold text-slate-700'>Select Size</p>
                <div className='flex gap-2 flex-wrap'>
                  {productdata.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setsize(item)}
                      className={`border-2 py-2 px-5 rounded-lg text-sm font-medium transition-all duration-200
                        ${item === size
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300'
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Add to Cart ── */}
            <button
              onClick={() => addtocart(productdata._id, size)}
              className='mt-4 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl
                text-sm font-semibold transition-colors duration-200 active:scale-95'
            >
              ADD TO CART
            </button>

            <hr className='mt-8 sm:w-4/5 border-slate-200' />

            {/* Trust badges */}
            <div className='text-sm text-slate-500 mt-5 flex flex-col gap-2'>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                100% original product
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Cash on delivery available
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Easy return and exchange policy
              </div>
            </div>
          </div>
        </div>

        {/* ── Description / Reviews Tabs ── */}
        <div className='mt-16'>

          {/* Tab headers */}
          <div className="flex border-b border-slate-200">
            {[
              { key: 'description', label: 'Description' },
              { key: 'reviews',     label: `Reviews (${reviews.length})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors duration-200
                  ${activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Description Tab ── */}
          {activeTab === 'description' && (
            <div className='px-4 py-6 text-sm text-slate-500 leading-relaxed space-y-3'>
              <p>{productdata.description}</p>
              <p>All our products are made from carefully sourced materials and go through strict quality checks before dispatch.</p>
            </div>
          )}

          {/* ── Reviews Tab ── */}
          {activeTab === 'reviews' && (
            <div className='py-6'>

              {/* Review summary */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-4 mb-8 p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900">{avgRating}</div>
                    <StarRating rating={Math.round(avgRating)} />
                    <div className="text-xs text-slate-400 mt-1">{reviews.length} reviews</div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map(star => {
                      const count = reviews.filter(r => r.rating === star).length
                      const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                      return (
                        <div key={star} className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-slate-500 w-3">{star}</span>
                          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-1.5 bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-slate-400 w-4">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Write a review */}
              {token && !hasReviewed && (
                <div className="mb-8 p-5 bg-white border border-slate-200 rounded-xl">
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Write a Review</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1.5">Your Rating</p>
                      <StarRating
                        rating={reviewForm.rating}
                        onChange={val => setReviewForm(prev => ({ ...prev, rating: val }))}
                        interactive
                      />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1.5">Your Review</p>
                      <textarea
                        value={reviewForm.comment}
                        onChange={e => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                        rows={3}
                        placeholder="Share your experience with this product..."
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700
                          outline-none focus:border-blue-400 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium
                        px-6 py-2.5 rounded-lg transition-colors disabled:opacity-60"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                </div>
              )}

             {token && hasReviewed && (
  <div className={`mb-6 p-3 rounded-lg border text-sm
    ${reviewSubmittedMsg
      ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
      : 'bg-green-50 border-green-200 text-green-700'
    }`}>
    {reviewSubmittedMsg
      ? 'Your review has been submitted.'
      : 'You have already reviewed this product.'
    }
  </div>
)}

              {!token && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                  Please <a href="/login" className="font-semibold underline">log in</a> to write a review.
                </div>
              )}

              {/* Reviews list */}
              {reviewLoading ? (
                <div className="flex items-center justify-center py-10 gap-2">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-slate-400">Loading reviews...</span>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-slate-200 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <p className="text-slate-400 text-sm">No reviews yet — be the first!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review, i) => (
                    <div key={review._id || i} className="p-4 border border-slate-100 rounded-xl bg-white">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700 flex-shrink-0">
                            {review.userName?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{review.userName || 'Customer'}</p>
                            <p className="text-[11px] text-slate-400">
                              {review.createdAt
                                ? new Date(review.createdAt).toLocaleDateString('en-PK', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                  })
                                : ''}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Related Products ── */}
        <Relatedproduct category={productdata.category} subcategory={productdata.subcategory} />
      </div>
    </div>
  )
}

export default Product