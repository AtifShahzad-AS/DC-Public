import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <svg key={s} className={`w-3 h-3 ${s <= rating ? 'text-amber-400' : 'text-gray-200'}`}
        fill="currentColor" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
)

const Reviews = ({ token }) => {
  const [reviews, setReviews]     = useState([])
  const [counts, setCounts]       = useState({ all: 0, pending: 0, approved: 0, rejected: 0 })
  const [loading, setLoading]     = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  const fetchReviews = async (status = 'all') => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        backendurl + '/api/review/admin/all',
        status === 'all' ? {} : { status },
        { headers: { token } }
      )
      if (data.success) {
        setReviews(data.reviews)
        setCounts(data.counts)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to load reviews')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReviews(activeFilter) }, [activeFilter, token])

  const handleApprove = async (reviewId) => {
    try {
      const { data } = await axios.post(
        backendurl + '/api/review/admin/approve',
        { reviewId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Review approved')
        fetchReviews(activeFilter)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to approve review')
    }
  }

  const handleReject = async (reviewId) => {
    try {
      const { data } = await axios.post(
        backendurl + '/api/review/admin/reject',
        { reviewId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Review rejected')
        fetchReviews(activeFilter)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to reject review')
    }
  }

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Delete this review permanently?')) return
    try {
      const { data } = await axios.post(
        backendurl + '/api/review/admin/delete',
        { reviewId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Review deleted')
        fetchReviews(activeFilter)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to delete review')
    }
  }

  const statusStyle = (status) => ({
    pending:  'bg-yellow-50 text-yellow-700',
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-600',
  }[status] || 'bg-gray-100 text-gray-600')

  const filters = [
    { key: 'all',      label: 'All',      count: counts.all      },
    { key: 'pending',  label: 'Pending',  count: counts.pending  },
    { key: 'approved', label: 'Approved', count: counts.approved },
    { key: 'rejected', label: 'Rejected', count: counts.rejected },
  ]

  return (
    <div className="space-y-5">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {filters.map((f, i) => (
          <div key={f.key} className="bg-white rounded-xl p-4 border border-black/5">
            <div className="text-xl font-bold text-[#1a1a2e]">{f.count}</div>
            <div className="text-xs text-gray-400 mt-1 capitalize">{f.label} Reviews</div>
          </div>
        ))}
      </div>

      {/* ── Pending alert ── */}
      {counts.pending > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <svg className="w-4 h-4 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <p className="text-sm font-medium text-yellow-700">
            {counts.pending} review{counts.pending > 1 ? 's' : ''} waiting for approval
          </p>
        </div>
      )}

      {/* ── Main Card ── */}
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">

        {/* Header + filters */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <h2 className="text-sm font-semibold text-[#1a1a2e]">Customer Reviews</h2>
          <div className="flex gap-1 flex-wrap">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`text-[11px] px-3 py-1.5 rounded-lg font-medium capitalize transition-colors
                  ${activeFilter === f.key
                    ? 'bg-[#1a1a2e] text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {f.label}
                {f.count > 0 && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px]
                    ${activeFilter === f.key ? 'bg-white/20' : 'bg-gray-200 text-gray-600'}`}>
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews list */}
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2">
            <div className="w-5 h-5 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-gray-400">Loading reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <p className="text-sm text-gray-400">No {activeFilter === 'all' ? '' : activeFilter} reviews found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {reviews.map(review => (
              <div key={review._id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start gap-3">

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#e8f0fe] flex items-center justify-center
                    text-xs font-semibold text-[#1a4fa8] flex-shrink-0">
                    {review.userName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="text-xs font-semibold text-[#1a1a2e]">{review.userName}</p>

                        {/* Product info */}
                        {review.productId && (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {review.productId.image?.[0] && (
                              <img
                                src={review.productId.image[0]}
                                alt=""
                                className="w-4 h-4 rounded object-cover"
                              />
                            )}
                            <p className="text-[10px] text-gray-400 truncate max-w-[180px]">
                              {review.productId.name}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right side — date + status */}
                      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                        <span className="text-[10px] text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString('en-PK', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(review.status)}`}>
                          {review.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1.5 mb-2">
                      <StarRating rating={review.rating} />
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {review.status !== 'approved' && (
                        <button
                          onClick={() => handleApprove(review._id)}
                          className="flex items-center gap-1 text-[10px] font-medium px-3 py-1.5
                            bg-green-50 border border-green-200 text-green-700 rounded-lg
                            hover:bg-green-100 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          Approve
                        </button>
                      )}
                      {review.status !== 'rejected' && (
                        <button
                          onClick={() => handleReject(review._id)}
                          className="flex items-center gap-1 text-[10px] font-medium px-3 py-1.5
                            bg-orange-50 border border-orange-200 text-orange-700 rounded-lg
                            hover:bg-orange-100 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="flex items-center gap-1 text-[10px] font-medium px-3 py-1.5
                          bg-red-50 border border-red-200 text-red-600 rounded-lg
                          hover:bg-red-100 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14H6L5 6"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reviews