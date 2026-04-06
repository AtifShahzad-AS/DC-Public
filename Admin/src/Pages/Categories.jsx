import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendurl, currency } from '../App'
import { assets } from '../assets/assets'

const DEFAULT_CATEGORIES = [
  { id: 'bedsheets', name: 'Bedsheets', emoji: '🛏', description: 'All types of bedsheets', productCount: 0 },
  { id: 'quilts', name: 'Quilts', emoji: '🛌', description: 'Winter and summer quilts', productCount: 0 },
  { id: 'curtains', name: 'Curtains', emoji: '🪟', description: 'Window and door curtains', productCount: 0 },
  { id: 'cushions', name: 'Cushions', emoji: '🛋', description: 'Decorative cushion covers', productCount: 0 },
  { id: 'pillow-covers', name: 'Pillow Covers', emoji: '💤', description: 'Pillow covers and cases', productCount: 0 },
  { id: 'blankets', name: 'Blankets', emoji: '🧣', description: 'Warm and cozy blankets', productCount: 0 },
]

const Categories = ({ token }) => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [showCatForm, setShowCatForm] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [catName, setCatName] = useState('')
  const [catEmoji, setCatEmoji] = useState('')
  const [catDesc, setCatDesc] = useState('')
  const [catImage, setCatImage] = useState(null)
const [pStock, setPStock] = useState(0)


  // Per-category product upload
  const [activeCat, setActiveCat] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)
  const [catProducts, setCatProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  // Product form fields
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [pName, setPName] = useState('')
  const [pDesc, setPDesc] = useState('')
  const [pPrice, setPPrice] = useState('')
  const [pBestseller, setPBestseller] = useState(false)
  const [pSizes, setPSizes] = useState([])
  const [pLoading, setPLoading] = useState(false)

  // Fetch products for selected category
  const fetchCategoryProducts = async (catName) => {
    setLoadingProducts(true)
    try {
      const { data } = await axios.get(backendurl + '/api/product/list')
      if (data.success) {
        const filtered = data.products.filter(
          p => p.category?.toLowerCase() === catName.toLowerCase()
        )
        setCatProducts(filtered)
        setCategories(prev => prev.map(c =>
          c.name.toLowerCase() === catName.toLowerCase()
            ? { ...c, productCount: filtered.length }
            : c
        ))
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleOpenCategory = (cat) => {
    if (activeCat?.id === cat.id) {
      setActiveCat(null)
      setShowProductForm(false)
    } else {
      setActiveCat(cat)
      setShowProductForm(false)
      fetchCategoryProducts(cat.name)
    }
  }

  const resetProductForm = () => {
    setImage1(false); setImage2(false); setImage3(false); setImage4(false);
setPStock(0)
    setPName(''); setPDesc(''); setPPrice(''); setPBestseller(false); setPSizes([])
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (!pName || !pPrice) { toast.error('Name and price are required'); return }
    setPLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', pName)
      formData.append("stock", pStock)
      formData.append('description', pDesc)
      formData.append('price', pPrice)
      formData.append('category', activeCat.name)
      formData.append('subcategory', '')
      formData.append('sizes', JSON.stringify(pSizes))
      formData.append('bestseller', pBestseller)
      if (image1) formData.append('image1', image1)
      if (image2) formData.append('image2', image2)
      if (image3) formData.append('image3', image3)
      if (image4) formData.append('image4', image4)

      const { data } = await axios.post(backendurl + '/api/product/add', formData, { headers: { token } })
      if (data.success) {
        toast.success('Product added successfully')
        resetProductForm()
        setShowProductForm(false)
        fetchCategoryProducts(activeCat.name)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to add product')
    } finally {
      setPLoading(false)
    }
  }

  const handleRemoveProduct = async (id) => {
    try {
      const { data } = await axios.post(backendurl + '/api/product/remove', { id }, { headers: { token } })
      if (data.success) {
        toast.success('Product removed')
        fetchCategoryProducts(activeCat.name)
      }
    } catch (err) {
      toast.error('Failed to remove product')
    }
  }

  const handleAddCategory = (e) => {
    e.preventDefault()
    if (!catName) { toast.error('Category name required'); return }
    const newCat = {
      id: catName.toLowerCase().replace(/\s+/g, '-'),
      name: catName, emoji: catEmoji || '📦',
      description: catDesc, productCount: 0
    }
    if (editIndex !== null) {
      setCategories(prev => prev.map((c, i) => i === editIndex ? { ...c, ...newCat, id: c.id } : c))
      toast.success('Category updated')
      setEditIndex(null)
    } else {
      setCategories(prev => [...prev, newCat])
      toast.success('Category added')
    }
    setCatName(''); setCatEmoji(''); setCatDesc(''); setCatImage(null)
    setShowCatForm(false)
  }

  const deleteCategory = (i) => {
    setCategories(prev => prev.filter((_, idx) => idx !== i))
    if (activeCat?.id === categories[i].id) setActiveCat(null)
    toast.success('Category deleted')
  }

  const startEdit = (i) => {
    setCatName(categories[i].name)
    setCatEmoji(categories[i].emoji)
    setCatDesc(categories[i].description)
    setEditIndex(i)
    setShowCatForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const ImageUpload = ({ image, setImage, id }) => (
    <label htmlFor={id} className="cursor-pointer block">
      <div className={`w-20 h-20 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors ${image ? 'border-[#e8a87c]' : 'border-gray-200 hover:border-gray-300'}`}>
        {image
          ? <img src={URL.createObjectURL(image)} className="w-full h-full object-cover" alt="" />
          : <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        }
      </div>
      <input type="file" id={id} hidden accept="image/*" onChange={e => setImage(e.target.files[0])} />
    </label>
  )

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a2e]">Categories</h2>
          <p className="text-xs text-gray-400 mt-0.5">{categories.length} categories · Click any to manage its products</p>
        </div>
        <button
          onClick={() => { setShowCatForm(!showCatForm); setEditIndex(null); setCatName(''); setCatEmoji(''); setCatDesc('') }}
          className="flex items-center gap-1.5 bg-[#1a1a2e] text-white text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-[#2a2a3e] transition-colors self-start"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Category
        </button>
      </div>

      {/* Add/Edit Category Form */}
      {showCatForm && (
        <div className="bg-white rounded-xl border border-black/5 p-5">
          <p className="text-sm font-semibold text-[#1a1a2e] mb-4">
            {editIndex !== null ? 'Edit Category' : 'New Category'}
          </p>
          <form onSubmit={handleAddCategory}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="sm:col-span-2">
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Category Name *</label>
                <input
                  type="text" value={catName} onChange={e => setCatName(e.target.value)}
                  placeholder="e.g. Bedsheets"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
                />
              </div>
              <div>
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Emoji Icon</label>
                <input
                  type="text" value={catEmoji} onChange={e => setCatEmoji(e.target.value)}
                  placeholder="🛏"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Description</label>
                <input
                  type="text" value={catDesc} onChange={e => setCatDesc(e.target.value)}
                  placeholder="Short description of this category"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Category Image (optional)</label>
                <label className="flex items-center gap-3 border border-dashed border-gray-200 rounded-lg px-4 py-3 bg-gray-50 cursor-pointer hover:border-[#e8a87c] transition-colors w-fit">
                  {catImage
                    ? <img src={URL.createObjectURL(catImage)} className="w-10 h-10 object-cover rounded-lg" alt="" />
                    : <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  }
                  <span className="text-xs text-gray-400">{catImage ? catImage.name : 'Click to upload category image'}</span>
                  <input type="file" hidden accept="image/*" onChange={e => setCatImage(e.target.files[0])} />
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-[#e8a87c] text-white text-xs font-medium px-5 py-2.5 rounded-lg hover:bg-[#d4956a] transition-colors">
                {editIndex !== null ? 'Update Category' : 'Save Category'}
              </button>
              <button type="button" onClick={() => { setShowCatForm(false); setEditIndex(null) }}
                className="bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <div key={cat.id} className="bg-white rounded-xl border border-black/5 overflow-hidden">

            {/* Category Header */}
            <div
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${activeCat?.id === cat.id ? 'bg-[#1a1a2e]' : 'hover:bg-gray-50'}`}
              onClick={() => handleOpenCategory(cat)}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${activeCat?.id === cat.id ? 'bg-white/15' : 'bg-gray-50'}`}>
                {cat.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${activeCat?.id === cat.id ? 'text-white' : 'text-[#1a1a2e]'}`}>{cat.name}</div>
                <div className={`text-[11px] mt-0.5 ${activeCat?.id === cat.id ? 'text-white/60' : 'text-gray-400'}`}>{cat.description}</div>
                <div className={`text-[10px] mt-1 font-medium ${activeCat?.id === cat.id ? 'text-[#e8a87c]' : 'text-[#e8a87c]'}`}>
                  {cat.productCount} products
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
                <button onClick={() => startEdit(i)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${activeCat?.id === cat.id ? 'bg-white/15 hover:bg-white/25' : 'bg-gray-100 hover:bg-blue-50'}`}>
                  <svg className={`w-3 h-3 ${activeCat?.id === cat.id ? 'text-white' : 'text-blue-500'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button onClick={() => deleteCategory(i)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${activeCat?.id === cat.id ? 'bg-white/15 hover:bg-red-500/30' : 'bg-gray-100 hover:bg-red-50'}`}>
                  <svg className={`w-3 h-3 ${activeCat?.id === cat.id ? 'text-white' : 'text-red-400'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                  </svg>
                </button>
                <svg className={`w-4 h-4 transition-transform duration-200 ${activeCat?.id === cat.id ? 'rotate-180 text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            {/* Expanded: Products Panel */}
            {activeCat?.id === cat.id && (
              <div className="border-t border-gray-100">

                {/* Add Product Button */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    {loadingProducts ? 'Loading...' : `${catProducts.length} products in ${cat.name}`}
                  </span>
                  <button
                    onClick={() => setShowProductForm(!showProductForm)}
                    className="flex items-center gap-1 bg-[#e8a87c] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-[#d4956a] transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Product
                  </button>
                </div>

                {/* Product Upload Form */}
{showProductForm && (
  <form onSubmit={handleAddProduct} className="p-4 bg-gray-50 border-b border-gray-100 space-y-3">
    <p className="text-xs font-semibold text-[#1a1a2e]">Add product to {cat.name}</p>

    {/* Image Uploads */}
    <div>
      <label className="text-[11px] text-gray-500 font-medium mb-1.5 block">Product Images</label>
      <div className="flex gap-2 flex-wrap">
        <ImageUpload image={image1} setImage={setImage1} id="pi1" />
        <ImageUpload image={image2} setImage={setImage2} id="pi2" />
        <ImageUpload image={image3} setImage={setImage3} id="pi3" />
        <ImageUpload image={image4} setImage={setImage4} id="pi4" />
      </div>
    </div>

    {/* Name */}
    <div>
      <label className="text-[11px] text-gray-500 font-medium mb-1 block">Product Name *</label>
      <input
        type="text"
        value={pName}
        onChange={e => setPName(e.target.value)}
        placeholder="e.g. Luxary Product"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white"
      />
    </div>

    {/* Description */}
    <div>
      <label className="text-[11px] text-gray-500 font-medium mb-1 block">Description</label>
      <textarea
        value={pDesc}
        onChange={e => setPDesc(e.target.value)}
        rows={2}
        placeholder="Product description..."
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white resize-none"
      />
    </div>

    {/* Price + Sizes */}
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="text-[11px] text-gray-500 font-medium mb-1 block">Price (Rs) *</label>
        <input
          type="number"
          value={pPrice}
          onChange={e => setPPrice(e.target.value)}
          placeholder="1200"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white"
        />
      </div>
      {/* stock */}
      <div>
  <label className="text-[11px] text-gray-500 font-medium mb-1 block">
    Initial Stock
  </label>
  <input
    type="number"
    value={pStock}
    onChange={e => setPStock(e.target.value)}
    placeholder="e.g. 50"
    min="0"
    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white"
  />
</div>



      {/* ── Size options — conditional per category ── */}
      {(() => {
        const name = cat.name?.toLowerCase()

        // Bedsheets — Single, Double, King, Queen
        if (name === 'bedsheets') {
          return (
            <div>
              <label className="text-[11px] text-gray-500 font-medium mb-1 block">Sizes</label>
              <div className="flex gap-1.5 flex-wrap">
                {['Single', 'Double', 'King', 'Queen'].map(sz => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setPSizes(prev =>
                      prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]
                    )}
                    className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors
                      ${pSizes.includes(sz)
                        ? 'bg-[#1a1a2e] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )
        }

        // Quilts & Blankets — Single, Double only
        if (name === 'quilts' || name === 'blankets') {
          return (
            <div>
              <label className="text-[11px] text-gray-500 font-medium mb-1 block">Sizes</label>
              <div className="flex gap-1.5 flex-wrap">
                {['Single', 'Double'].map(sz => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setPSizes(prev =>
                      prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]
                    )}
                    className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors
                      ${pSizes.includes(sz)
                        ? 'bg-[#1a1a2e] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )
        }

        // All other categories — no size option
        return null
      })()}
    </div>

    {/* Bestseller */}
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={pBestseller}
        onChange={() => setPBestseller(p => !p)}
        className="rounded"
      />
      <span className="text-xs text-gray-600">Mark as bestseller</span>
    </label>

    {/* Actions */}
    <div className="flex gap-2 pt-1">
      <button
        type="submit"
        disabled={pLoading}
        className="bg-[#1a1a2e] text-white text-xs font-medium px-5 py-2 rounded-lg hover:bg-[#2a2a3e] transition-colors disabled:opacity-60"
      >
        {pLoading ? 'Adding...' : 'Add Product'}
      </button>
      <button
        type="button"
        onClick={() => { setShowProductForm(false); resetProductForm() }}
        className="bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Cancel
      </button>
    </div>
  </form>
)}

                {/* Products List */}
                <div className="max-h-72 overflow-y-auto">
                  {loadingProducts ? (
                    <div className="text-center py-6 text-xs text-gray-400">Loading products...</div>
                  ) : catProducts.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-2xl mb-2">{cat.emoji}</div>
                      <p className="text-xs text-gray-400">No products yet in {cat.name}</p>
                      <p className="text-[10px] text-gray-300 mt-0.5">Click "Add Product" to get started</p>
                    </div>
                  ) : (
                    catProducts.map((product, pi) => (
                      <div key={pi} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <img
                          src={product.image?.[0] || '/placeholder.png'}
                          className="w-10 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                          alt={product.name}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#1a1a2e] truncate">{product.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{currency}{product.price?.toLocaleString()}</p>
                          {product.sizes?.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {product.sizes.map(s => (
                                <span key={s} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{s}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        {product.bestseller && (
                          <span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">Bestseller</span>
                        )}
                        <button onClick={() => handleRemoveProduct(product._id)}
                          className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors flex-shrink-0">
                          <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories