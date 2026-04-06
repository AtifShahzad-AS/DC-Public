import React, { useState } from 'react'
import { toast } from 'react-toastify'

const MOCK_REVIEWS = [
  { id: 1, customer: 'Ayesha Khan', avatar: 'AK', product: 'Royal Cotton Bedsheet', rating: 5, comment: 'Absolutely love the quality! Super soft and the colors are vibrant.', date: '2026-04-01', visible: true },
  { id: 2, customer: 'Raza Malik', avatar: 'RM', product: 'Velvet Curtain Pair', rating: 4, comment: 'Great curtains, very thick and block light well. Fast delivery too.', date: '2026-03-30', visible: true },
  { id: 3, customer: 'Sara Ahmed', avatar: 'SA', product: 'Embroidered Cushion Cover', rating: 3, comment: 'Decent quality but colour was slightly different from the picture.', date: '2026-03-28', visible: false },
  { id: 4, customer: 'Bilal Hussain', avatar: 'BH', product: 'Winter Quilt King Size', rating: 5, comment: 'Best quilt I have ever bought. Warm, lightweight, and beautiful design.', date: '2026-03-25', visible: true },
  { id: 5, customer: 'Nadia Farooq', avatar: 'NF', product: 'Pillow Cover Set (2)', rating: 2, comment: 'Stitching came apart after first wash. Very disappointed.', date: '2026-03-22', visible: false },
  { id: 6, customer: 'Hamza Tariq', avatar: 'HT', product: 'Printed Bedsheet Double', rating: 4, comment: 'Good value for money. The print quality is excellent.', date: '2026-03-20', visible: true },
]

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(s => (
      <svg key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
)

const Reviews = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS)
  const [filter, setFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState(0)
  const [search, setSearch] = useState('')

  const toggleVisibility = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, visible: !r.visible } : r))
    const r = reviews.find(r => r.id === id)
    toast.success(`Review ${r.visible ? 'hidden' : 'shown'} on storefront`)
  }

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id))
    toast.success('Review deleted')
  }

  const filtered = reviews.filter(r => {
    const matchFilter = filter === 'all' ? true : filter === 'visible' ? r.visible : !r.visible
    const matchRating = ratingFilter === 0 ? true : r.rating === ratingFilter
    const matchSearch = search === '' ? true :
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.product.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchRating && matchSearch
  })

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-[#1a1a2e]">Reviews</h2>
        <p className="text-xs text-gray-400 mt-0.5">{reviews.length} total · {reviews.filter(r => r.visible).length} visible on store</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Reviews', value: reviews.length, color: '#e8f0fe', text: '#1a4fa8' },
          { label: 'Visible', value: reviews.filter(r => r.visible).length, color: '#e6f7ee', text: '#1a7a45' },
          { label: 'Hidden', value: reviews.filter(r => !r.visible).length, color: '#fce8e8', text: '#a82222' },
          { label: 'Avg Rating', value: `${avgRating} ★`, color: '#fff4e5', text: '#b36b00' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-black/5">
            <div className="text-xl font-bold" style={{ color: s.text }}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-black/5 p-4 flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-48">
          <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by customer or product..."
            className="bg-transparent text-sm outline-none flex-1 placeholder-gray-300 text-[#1a1a2e]" />
        </div>
        <div className="flex gap-1.5">
          {['all', 'visible', 'hidden'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs px-3 py-2 rounded-lg font-medium capitalize transition-colors ${filter === f ? 'bg-[#1a1a2e] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 items-center">
          <span className="text-xs text-gray-400">Stars:</span>
          {[0,5,4,3,2,1].map(r => (
            <button key={r} onClick={() => setRatingFilter(r)}
              className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${ratingFilter === r ? 'bg-amber-400 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {r === 0 ? 'All' : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-black/5 py-12 text-center text-sm text-gray-400">
            No reviews match your filters
          </div>
        ) : filtered.map(review => (
          <div key={review.id}
            className={`bg-white rounded-xl border border-black/5 p-4 sm:p-5 transition-opacity ${!review.visible ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center text-xs font-semibold text-[#1a4fa8] flex-shrink-0">
                {review.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a2e]">{review.customer}</p>
                    <p className="text-[11px] text-gray-400">{review.product}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Stars rating={review.rating} />
                      <span className="text-[10px] text-gray-400">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!review.visible && (
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden from store</span>
                    )}
                    <button onClick={() => toggleVisibility(review.id)}
                      className={`flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors ${review.visible ? 'bg-green-50 text-green-700 hover:bg-red-50 hover:text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-700'}`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        {review.visible
                          ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                          : <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                        }
                      </svg>
                      {review.visible ? 'Visible' : 'Hidden'}
                    </button>
                    <button onClick={() => deleteReview(review.id)}
                      className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors">
                      <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mt-2">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews