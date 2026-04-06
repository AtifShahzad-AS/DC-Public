import React, { useState, useEffect } from "react"
import axios from "axios"
import { backendurl } from "../App"
import { toast } from "react-toastify"

const HomeSlides = ({ token }) => {
  const [slides, setSlides]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [showForm, setShowForm]       = useState(false)
  const [imageFile, setImageFile]     = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [title, setTitle]             = useState("")
  const [link, setLink]               = useState("")
  const [order, setOrder]             = useState("1")
  const [status, setStatus]           = useState("Live")
  const [saving, setSaving]           = useState(false)

  // ── Fetch all slides ──
  const fetchSlides = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        backendurl + "/api/slide/all",
        {},
        { headers: { token } }
      )
      if (data.success) {
        setSlides(data.slides)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Failed to load slides")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSlides() }, [token])

  // ── Image preview ──
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  // ── Add slide ──
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!imageFile) { toast.error("Please select a slide image"); return }
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("image",  imageFile)
      formData.append("title",  title)
      formData.append("link",   link)
      formData.append("order",  order)
      formData.append("status", status)

      const { data } = await axios.post(
        backendurl + "/api/slide/add",
        formData,
        { headers: { token, "Content-Type": "multipart/form-data" } }
      )

      if (data.success) {
        toast.success("Slide added successfully")
        setTitle(""); setLink(""); setOrder("1"); setStatus("Live")
        setImageFile(null); setImagePreview(null)
        setShowForm(false)
        fetchSlides()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Failed to add slide")
      console.log(err)
    } finally {
      setSaving(false)
    }
  }

  // ── Toggle status ──
  const handleToggle = async (slideId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/slide/toggle",
        { slideId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        fetchSlides()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Failed to update slide")
    }
  }

  // ── Delete ──
  const handleDelete = async (slideId) => {
    if (!window.confirm("Delete this slide?")) return
    try {
      const { data } = await axios.post(
        backendurl + "/api/slide/delete",
        { slideId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success("Slide deleted")
        fetchSlides()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Failed to delete slide")
    }
  }

  // ── Update order ──
  const handleOrderChange = async (slideId, newOrder) => {
    try {
      await axios.post(
        backendurl + "/api/slide/updateorder",
        { slideId, order: newOrder },
        { headers: { token } }
      )
      fetchSlides()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="space-y-5">

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { label: "Total Slides", value: slides.length },
          { label: "Live",         value: slides.filter(s => s.status === "Live").length },
          { label: "Draft",        value: slides.filter(s => s.status === "Draft").length },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-black/5">
            <div className="text-xl font-bold text-[#1a1a2e]">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Main Card ── */}
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#1a1a2e]">Home Slides</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Images upload to Cloudinary · Recommended size 1920×600px
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 bg-[#1a1a2e] text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-[#2a2a3e] transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Slide
          </button>
        </div>

        {/* ── Add Form ── */}
        {showForm && (
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-[#1a1a2e] mb-4">New Slide</p>
            <form onSubmit={handleAdd} className="space-y-3">

              {/* Image upload */}
              <div>
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">
                  Slide Image <span className="text-red-400">*</span>
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-4 bg-white cursor-pointer hover:border-[#e8a87c] transition-colors overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <svg className="w-6 h-6 text-gray-300 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <p className="text-xs text-gray-400">Click to upload · 1920×600px recommended</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null) }}
                    className="text-[10px] text-red-400 mt-1 hover:text-red-600"
                  >
                    Remove image
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-500 font-medium mb-1 block">Slide Title (optional)</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Summer Sale 2026"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 font-medium mb-1 block">Link URL (optional)</label>
                  <input
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    placeholder="/collection"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 font-medium mb-1 block">Display Order</label>
                  <select
                    value={order}
                    onChange={e => setOrder(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 font-medium mb-1 block">Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white"
                  >
                    <option>Live</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1.5 bg-[#e8a87c] hover:bg-[#d4956a] text-white text-xs font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-60"
                >
                  {saving
                    ? <><div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>Saving...</>
                    : "Save Slide"
                  }
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setImageFile(null)
                    setImagePreview(null)
                    setTitle(""); setLink(""); setOrder("1"); setStatus("Live")
                  }}
                  className="bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Slides List ── */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-xs text-gray-400">Loading slides...</span>
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="13" rx="2"/>
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
            </svg>
            <p className="text-sm text-gray-400">No slides yet — add your first one above</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {slides.map((slide, i) => (
              <div
                key={slide._id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors"
              >
                {/* Order number */}
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <select
                    value={slide.order}
                    onChange={e => handleOrderChange(slide._id, e.target.value)}
                    className="text-[11px] font-semibold text-[#1a1a2e] bg-transparent border-none outline-none cursor-pointer w-full text-center"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Thumbnail */}
                <div className="w-24 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={slide.image}
                    alt={slide.title || `Slide ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1a1a2e] truncate">
                    {slide.title || `Slide ${i + 1}`}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 truncate">
                    {slide.link || "No link"}
                  </p>
                  <p className="text-[10px] text-gray-300 mt-0.5">
                    Added {new Date(slide.createdAt).toLocaleDateString("en-PK", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                </div>

                {/* Status + Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full
                    ${slide.status === "Live"
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-600"
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full
                      ${slide.status === "Live" ? "bg-green-500" : "bg-yellow-500"}`}>
                    </span>
                    {slide.status}
                  </span>

                  {/* Toggle */}
                  <button
                    onClick={() => handleToggle(slide._id)}
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-lg border transition-colors
                      ${slide.status === "Live"
                        ? "bg-gray-50 border-gray-200 text-gray-500 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-700"
                        : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      }`}
                  >
                    {slide.status === "Live" ? "Set Draft" : "Go Live"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(slide._id)}
                    className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6"/><path d="M14 11v6"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips footer */}
        {slides.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50">
            <p className="text-[10px] text-gray-400">
              Drag the order number to reorder · Only <strong>Live</strong> slides appear on the homepage · Recommended image size: 1920×600px
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

export default HomeSlides