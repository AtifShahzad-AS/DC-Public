import React, { useState } from 'react'
import { toast } from 'react-toastify'

const BANNER_COLORS = [
  { bg: '#fff4e5', text: '#b36b00', name: 'Amber' },
  { bg: '#e6f7ee', text: '#1a7a45', name: 'Green' },
  { bg: '#e8f0fe', text: '#1a4fa8', name: 'Blue' },
  { bg: '#fce8e8', text: '#a82222', name: 'Red' },
  { bg: '#f0eafd', text: '#6b21a8', name: 'Purple' },
  { bg: '#f0ede8', text: '#5c4a2e', name: 'Warm' },
]

const Banners = () => {
  const [banners, setBanners] = useState([
    { id: 1, title: 'Eid Special Sale — 30% Off All Bedsheets', link: '/collection/bedsheets', position: 'Top', status: 'Live', colorIndex: 0 },
    { id: 2, title: 'Free Delivery on Orders Above Rs 2,000', link: '/', position: 'Middle', status: 'Live', colorIndex: 1 },
    { id: 3, title: 'New Arrivals: Winter Quilts Collection', link: '/collection/quilts', position: 'Bottom', status: 'Draft', colorIndex: 2 },
  ])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [position, setPosition] = useState('Top')
  const [status, setStatus] = useState('Live')
  const [colorIndex, setColorIndex] = useState(0)

  const resetForm = () => { setTitle(''); setLink(''); setPosition('Top'); setStatus('Live'); setColorIndex(0); setEditId(null) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title) { toast.error('Banner text is required'); return }
    if (editId) {
      setBanners(prev => prev.map(b => b.id === editId ? { ...b, title, link, position, status, colorIndex } : b))
      toast.success('Banner updated')
    } else {
      setBanners(prev => [...prev, { id: Date.now(), title, link, position, status, colorIndex }])
      toast.success('Banner added')
    }
    resetForm(); setShowForm(false)
  }

  const startEdit = (b) => {
    setTitle(b.title); setLink(b.link); setPosition(b.position)
    setStatus(b.status); setColorIndex(b.colorIndex); setEditId(b.id)
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleStatus = (id) => setBanners(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'Live' ? 'Draft' : 'Live' } : b))
  const deleteBanner = (id) => { setBanners(prev => prev.filter(b => b.id !== id)); toast.success('Banner deleted') }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a2e]">Banners</h2>
          <p className="text-xs text-gray-400 mt-0.5">{banners.filter(b => b.status === 'Live').length} live · {banners.filter(b => b.status === 'Draft').length} draft</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); resetForm() }}
          className="flex items-center gap-1.5 bg-[#1a1a2e] text-white text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-[#2a2a3e] transition-colors self-start">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Banner
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-black/5 p-5">
          <p className="text-sm font-semibold text-[#1a1a2e] mb-4">{editId ? 'Edit Banner' : 'New Banner'}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] text-gray-500 font-medium mb-1 block">Banner Text *</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Eid Special Sale — 30% Off All Bedsheets"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Link URL</label>
                <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder="/collection/bedsheets"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50" />
              </div>
              <div>
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Position</label>
                <select value={position} onChange={e => setPosition(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50">
                  <option>Top</option><option>Middle</option><option>Bottom</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50">
                  <option>Live</option><option>Draft</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 font-medium mb-2 block">Banner Color</label>
              <div className="flex gap-2 flex-wrap">
                {BANNER_COLORS.map((c, i) => (
                  <button key={i} type="button" onClick={() => setColorIndex(i)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${colorIndex === i ? 'border-[#1a1a2e] scale-110' : 'border-transparent hover:scale-105'}`}
                    style={{ background: c.bg }} title={c.name} />
                ))}
              </div>
            </div>
            {/* Live Preview */}
            <div>
              <label className="text-[11px] text-gray-500 font-medium mb-1 block">Preview</label>
              <div className="rounded-lg px-4 py-3 text-sm font-medium"
                style={{ background: BANNER_COLORS[colorIndex].bg, color: BANNER_COLORS[colorIndex].text }}>
                {title || 'Your banner text will appear here'} {link && <span className="opacity-60 text-xs ml-2">→ {link}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-[#e8a87c] text-white text-xs font-medium px-5 py-2.5 rounded-lg hover:bg-[#d4956a] transition-colors">
                {editId ? 'Update Banner' : 'Save Banner'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); resetForm() }}
                className="bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Banners List */}
      <div className="space-y-3">
        {banners.map((banner) => {
          const color = BANNER_COLORS[banner.colorIndex] || BANNER_COLORS[0]
          return (
            <div key={banner.id} className="bg-white rounded-xl border border-black/5 overflow-hidden">
              {/* Preview */}
              <div className="px-5 py-4 flex items-center justify-between"
                style={{ background: color.bg, color: color.text }}>
                <span className="text-sm font-medium">{banner.title}</span>
                {banner.link && <span className="text-xs opacity-60 hidden sm:block">→ {banner.link}</span>}
              </div>
              {/* Controls */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{banner.position}</span>
                  <span className={`flex items-center gap-1 text-[10px] font-medium ${banner.status === 'Live' ? 'text-[#2e9e5b]' : 'text-yellow-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${banner.status === 'Live' ? 'bg-[#2e9e5b]' : 'bg-yellow-500'}`}></span>
                    {banner.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => startEdit(banner)}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => toggleStatus(banner.id)}
                    className={`text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors ${banner.status === 'Live' ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                    {banner.status === 'Live' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => deleteBanner(banner.id)}
                    className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors">
                    <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Banners