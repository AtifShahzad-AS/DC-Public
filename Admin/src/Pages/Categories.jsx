
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { backendurl, currency } from '../App'

// const CATEGORY_SIZES = {
//   bedsheets:      ['Single', 'Double', 'King', 'Queen'],
//   quilts:         ['Single', 'Double'],
//   blankets:       ['Single', 'Double'],
//   curtains:       [],
//   cushions:       [],
//   'pillow covers':[]
// }

// const Categories = ({ token }) => {
//   const [categories, setCategories]       = useState([])
//   const [loading, setLoading]             = useState(true)
//   const [showCatForm, setShowCatForm]     = useState(false)
//   const [editCat, setEditCat]             = useState(null)   // category being edited
//   const [catImage, setCatImage]           = useState(null)
//   const [submitting, setSubmitting]       = useState(false)
//   const [form, setForm]                   = useState({ name: '', emoji: '', description: '' })

//   // Per-category product panel
//   const [activeCat, setActiveCat]         = useState(null)
//   const [catProducts, setCatProducts]     = useState([])
//   const [loadingProducts, setLoadingProducts] = useState(false)
//   const [showProductForm, setShowProductForm] = useState(false)
//   const [pLoading, setPLoading]           = useState(false)
//   const [pStock, setPStock]               = useState(0)
//   const [pName, setPName]                 = useState('')
//   const [pDesc, setPDesc]                 = useState('')
//   const [pPrice, setPPrice]               = useState('')
//   const [pBestseller, setPBestseller]     = useState(false)
//   const [pSizes, setPSizes]               = useState([])
//   const [image1, setImage1]               = useState(false)
//   const [image2, setImage2]               = useState(false)
//   const [image3, setImage3]               = useState(false)
//   const [image4, setImage4]               = useState(false)

//   // ── Fetch categories ──
//   const fetchCategories = async () => {
//     setLoading(true)
//     try {
//       const { data } = await axios.post(backendurl + '/api/category/list')
//       if (data.success) setCategories(data.categories)
//       else toast.error(data.message)
//     } catch (err) {
//       toast.error('Failed to load categories')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { fetchCategories() }, [])

//   // ── Fetch products for a category ──
//   const fetchCategoryProducts = async (catName) => {
//     setLoadingProducts(true)
//     try {
//       const { data } = await axios.post(backendurl + '/api/product/list')
//       if (data.success) {
//         const filtered = data.products.filter(
//           p => p.category?.toLowerCase() === catName.toLowerCase()
//         )
//         setCatProducts(filtered)
//       }
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoadingProducts(false)
//     }
//   }

//   const handleOpenCategory = (cat) => {
//     if (activeCat?._id === cat._id) {
//       setActiveCat(null)
//       setShowProductForm(false)
//     } else {
//       setActiveCat(cat)
//       setShowProductForm(false)
//       fetchCategoryProducts(cat.name)
//     }
//   }

//   // ── Add / Update category ──
//   const handleSubmitCat = async (e) => {
//     e.preventDefault()
//     if (!form.name) return toast.error('Category name is required')
//     setSubmitting(true)
//     try {
//       const formData = new FormData()
//       formData.append('name', form.name)
//       formData.append('emoji', form.emoji)
//       formData.append('description', form.description)
//       if (catImage) formData.append('image', catImage)

//       let data
//       if (editCat) {
//         formData.append('categoryId', editCat._id)
//         const res = await axios.post(backendurl + '/api/category/update', formData, { headers: { token } })
//         data = res.data
//       } else {
//         const res = await axios.post(backendurl + '/api/category/add', formData, { headers: { token } })
//         data = res.data
//       }

//       if (data.success) {
//         toast.success(editCat ? 'Category updated' : 'Category added')
//         setShowCatForm(false)
//         setEditCat(null)
//         setForm({ name: '', emoji: '', description: '' })
//         setCatImage(null)
//         fetchCategories()
//       } else {
//         toast.error(data.message)
//       }
//     } catch (err) {
//       toast.error('Something went wrong')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   // ── Delete category ──
//   const handleDeleteCat = async (categoryId) => {
//     if (!window.confirm('Delete this category?')) return
//     try {
//       const { data } = await axios.post(
//         backendurl + '/api/category/delete',
//         { categoryId },
//         { headers: { token } }
//       )
//       if (data.success) {
//         toast.success('Category deleted')
//         if (activeCat?._id === categoryId) setActiveCat(null)
//         fetchCategories()
//       } else {
//         toast.error(data.message)
//       }
//     } catch (err) {
//       toast.error('Failed to delete category')
//     }
//   }

//   // ── Start edit ──
//   const startEdit = (cat) => {
//     setEditCat(cat)
//     setForm({ name: cat.name, emoji: cat.emoji, description: cat.description })
//     setCatImage(null)
//     setShowCatForm(true)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   // ── Add product ──
//   const resetProductForm = () => {
//     setImage1(false); setImage2(false); setImage3(false); setImage4(false)
//     setPName(''); setPDesc(''); setPPrice(''); setPBestseller(false)
//     setPSizes([]); setPStock(0)
//   }

//   const handleAddProduct = async (e) => {
//     e.preventDefault()
//     if (!pName || !pPrice) return toast.error('Name and price are required')
//     setPLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append('name', pName)
//       formData.append('stock', pStock)
//       formData.append('description', pDesc)
//       formData.append('price', pPrice)
//       formData.append('category', activeCat.name)
//       // formData.append('subcategory', '')
//       formData.append('sizes', JSON.stringify(pSizes))
//       formData.append('bestseller', pBestseller)
//       if (image1) formData.append('image1', image1)
//       if (image2) formData.append('image2', image2)
//       if (image3) formData.append('image3', image3)
//       if (image4) formData.append('image4', image4)

//       const { data } = await axios.post(backendurl + '/api/product/add', formData, { headers: { token } })
//       if (data.success) {
//         toast.success('Product added successfully')
//         resetProductForm()
//         setShowProductForm(false)
//         fetchCategoryProducts(activeCat.name)
//       } else {
//         toast.error(data.message)
//       }
//     } catch (err) {
//       toast.error('Failed to add product')
//     } finally {
//       setPLoading(false)
//     }
//   }

//   const handleRemoveProduct = async (id) => {
//     try {
//       const { data } = await axios.post(backendurl + '/api/product/remove', { id }, { headers: { token } })
//       if (data.success) {
//         toast.success('Product removed')
//         fetchCategoryProducts(activeCat.name)
//       }
//     } catch (err) {
//       toast.error('Failed to remove product')
//     }
//   }

//   // ── Image upload component ──
//   const ImageUpload = ({ image, setImage, id }) => (
//     <label htmlFor={id} className="cursor-pointer block">
//       <div className={`w-20 h-20 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors
//         ${image ? 'border-[#e8a87c]' : 'border-gray-200 hover:border-gray-300'}`}>
//         {image
//           ? <img src={URL.createObjectURL(image)} className="w-full h-full object-cover" alt="" />
//           : <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
//               <rect x="3" y="3" width="18" height="18" rx="2"/>
//               <circle cx="8.5" cy="8.5" r="1.5"/>
//               <polyline points="21 15 16 10 5 21"/>
//             </svg>
//         }
//       </div>
//       <input type="file" id={id} hidden accept="image/*" onChange={e => setImage(e.target.files[0])} />
//     </label>
//   )

//   // ── Size buttons for category ──
//   const getSizes = (catName) => {
//     return CATEGORY_SIZES[catName?.toLowerCase()] || []
//   }

//   return (
//     <div className="space-y-5">

//       {/* ── Header ── */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//         <div>
//           <h2 className="text-lg font-semibold text-[#1a1a2e]">Categories</h2>
//           <p className="text-xs text-gray-400 mt-0.5">
//             {categories.length} categories · Click any to manage its products
//           </p>
//         </div>
//         <button
//           onClick={() => {
//             setShowCatForm(!showCatForm)
//             setEditCat(null)
//             setForm({ name: '', emoji: '', description: '' })
//             setCatImage(null)
//           }}
//           className="flex items-center gap-1.5 bg-[#1a1a2e] text-white text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-[#2a2a3e] transition-colors self-start"
//         >
//           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//           </svg>
//           Add Category
//         </button>
//       </div>

//       {/* ── Add / Edit Category Form ── */}
//       {showCatForm && (
//         <div className="bg-white rounded-xl border border-black/5 p-5">
//           <p className="text-sm font-semibold text-[#1a1a2e] mb-4">
//             {editCat ? 'Edit Category' : 'New Category'}
//           </p>
//           <form onSubmit={handleSubmitCat}>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

//               <div className="sm:col-span-2">
//                 <label className="text-[11px] text-gray-500 font-medium mb-1 block">Category Name *</label>
//                 <input
//                   type="text"
//                   value={form.name}
//                   onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
//                   placeholder="e.g. Bedsheets"
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
//                 />
//               </div>

//               <div>
//                 <label className="text-[11px] text-gray-500 font-medium mb-1 block">Emoji Icon</label>
//                 <input
//                   type="text"
//                   value={form.emoji}
//                   onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}
//                   placeholder="🛏"
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
//                 />
//               </div>

//               <div className="sm:col-span-3">
//                 <label className="text-[11px] text-gray-500 font-medium mb-1 block">Description</label>
//                 <input
//                   type="text"
//                   value={form.description}
//                   onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
//                   placeholder="Short description of this category"
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
//                 />
//               </div>

//               <div className="sm:col-span-3">
//                 <label className="text-[11px] text-gray-500 font-medium mb-1 block">
//                   Category Image <span className="text-gray-300">(optional — shown on frontend)</span>
//                 </label>
//                 <label className="flex items-center gap-3 border border-dashed border-gray-200 rounded-lg px-4 py-3 bg-gray-50 cursor-pointer hover:border-[#e8a87c] transition-colors w-fit">
//                   {catImage
//                     ? <img src={URL.createObjectURL(catImage)} className="w-10 h-10 object-cover rounded-lg" alt="" />
//                     : editCat?.image
//                       ? <img src={editCat.image} className="w-10 h-10 object-cover rounded-lg" alt="" />
//                       : <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
//                           <rect x="3" y="3" width="18" height="18" rx="2"/>
//                           <circle cx="8.5" cy="8.5" r="1.5"/>
//                           <polyline points="21 15 16 10 5 21"/>
//                         </svg>
//                   }
//                   <span className="text-xs text-gray-400">
//                     {catImage ? catImage.name : editCat?.image ? 'Change image' : 'Click to upload category image'}
//                   </span>
//                   <input type="file" hidden accept="image/*" onChange={e => setCatImage(e.target.files[0])} />
//                 </label>
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="bg-[#e8a87c] text-white text-xs font-medium px-5 py-2.5 rounded-lg hover:bg-[#d4956a] transition-colors disabled:opacity-60"
//               >
//                 {submitting ? 'Saving...' : editCat ? 'Update Category' : 'Save Category'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => { setShowCatForm(false); setEditCat(null) }}
//                 className="bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* ── Loading ── */}
//       {loading ? (
//         <div className="flex items-center justify-center py-16">
//           <div className="w-6 h-6 border-2 border-[#1a1a2e] border-t-transparent rounded-full animate-spin" />
//         </div>
//       ) : categories.length === 0 ? (
//         <div className="text-center py-16 text-gray-400">
//           <div className="text-4xl mb-3">📦</div>
//           <p className="text-sm">No categories yet</p>
//           <p className="text-xs mt-1">Click "Add Category" to create your first one</p>
//         </div>
//       ) : (

//         /* ── Category Cards ── */
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//           {categories.map((cat) => (
//             <div key={cat._id} className="bg-white rounded-xl border border-black/5 overflow-hidden">

//               {/* Category Header */}
//               <div
//                 className={`flex items-center gap-3 p-4 cursor-pointer transition-colors
//                   ${activeCat?._id === cat._id ? 'bg-[#1a1a2e]' : 'hover:bg-gray-50'}`}
//                 onClick={() => handleOpenCategory(cat)}
//               >
//                 {/* Emoji or image */}
//                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden
//                   ${activeCat?._id === cat._id ? 'bg-white/15' : 'bg-gray-50'}`}>
//                   {cat.image
//                     ? <img src={cat.image} className="w-full h-full object-cover rounded-xl" alt={cat.name} />
//                     : <span>{cat.emoji}</span>
//                   }
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className={`text-sm font-semibold ${activeCat?._id === cat._id ? 'text-white' : 'text-[#1a1a2e]'}`}>
//                     {cat.name}
//                   </div>
//                   <div className={`text-[11px] mt-0.5 truncate ${activeCat?._id === cat._id ? 'text-white/60' : 'text-gray-400'}`}>
//                     {cat.description || 'No description'}
//                   </div>
//                   <div className="text-[10px] mt-1 font-medium text-[#e8a87c]">
//                     {catProducts.length > 0 && activeCat?._id === cat._id
//                       ? `${catProducts.length} products`
//                       : 'Click to view products'
//                     }
//                   </div>
//                 </div>

//                 {/* Action buttons */}
//                 <div className="flex items-center gap-1.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
//                   <button
//                     onClick={() => startEdit(cat)}
//                     className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
//                       ${activeCat?._id === cat._id ? 'bg-white/15 hover:bg-white/25' : 'bg-gray-100 hover:bg-blue-50'}`}
//                   >
//                     <svg className={`w-3 h-3 ${activeCat?._id === cat._id ? 'text-white' : 'text-blue-500'}`}
//                       fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                       <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
//                       <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
//                     </svg>
//                   </button>
//                   <button
//                     onClick={() => handleDeleteCat(cat._id)}
//                     className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
//                       ${activeCat?._id === cat._id ? 'bg-white/15 hover:bg-red-500/30' : 'bg-gray-100 hover:bg-red-50'}`}
//                   >
//                     <svg className={`w-3 h-3 ${activeCat?._id === cat._id ? 'text-white' : 'text-red-400'}`}
//                       fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                       <polyline points="3 6 5 6 21 6"/>
//                       <path d="M19 6l-1 14H6L5 6"/>
//                     </svg>
//                   </button>
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200
//                       ${activeCat?._id === cat._id ? 'rotate-180 text-white' : 'text-gray-400'}`}
//                     fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                     <polyline points="6 9 12 15 18 9"/>
//                   </svg>
//                 </div>
//               </div>

//               {/* ── Expanded Product Panel ── */}
//               {activeCat?._id === cat._id && (
//                 <div className="border-t border-gray-100">

//                   {/* Toolbar */}
//                   <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
//                     <span className="text-xs text-gray-500 font-medium">
//                       {loadingProducts ? 'Loading...' : `${catProducts.length} products in ${cat.name}`}
//                     </span>
//                     <button
//                       onClick={() => setShowProductForm(!showProductForm)}
//                       className="flex items-center gap-1 bg-[#e8a87c] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-[#d4956a] transition-colors"
//                     >
//                       <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//                         <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//                       </svg>
//                       Add Product
//                     </button>
//                   </div>

//                   {/* Product Form */}
//                   {showProductForm && (
//                     <form onSubmit={handleAddProduct} className="p-4 bg-gray-50 border-b border-gray-100 space-y-3">
//                       <p className="text-xs font-semibold text-[#1a1a2e]">Add product to {cat.name}</p>

//                       <div>
//                         <label className="text-[11px] text-gray-500 font-medium mb-1.5 block">Product Images</label>
//                         <div className="flex gap-2 flex-wrap">
//                           <ImageUpload image={image1} setImage={setImage1} id="pi1" />
//                           <ImageUpload image={image2} setImage={setImage2} id="pi2" />
//                           <ImageUpload image={image3} setImage={setImage3} id="pi3" />
//                           <ImageUpload image={image4} setImage={setImage4} id="pi4" />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="text-[11px] text-gray-500 font-medium mb-1 block">Product Name *</label>
//                         <input type="text" value={pName} onChange={e => setPName(e.target.value)}
//                           placeholder="e.g. Luxury Bedsheet"
//                           className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white" />
//                       </div>

//                       <div>
//                         <label className="text-[11px] text-gray-500 font-medium mb-1 block">Description</label>
//                         <textarea value={pDesc} onChange={e => setPDesc(e.target.value)} rows={2}
//                           placeholder="Product description..."
//                           className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white resize-none" />
//                       </div>

//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="text-[11px] text-gray-500 font-medium mb-1 block">Price (Rs) *</label>
//                           <input type="number" value={pPrice} onChange={e => setPPrice(e.target.value)}
//                             placeholder="1200"
//                             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white" />
//                         </div>
//                         <div>
//                           <label className="text-[11px] text-gray-500 font-medium mb-1 block">Initial Stock</label>
//                           <input type="number" value={pStock} onChange={e => setPStock(e.target.value)}
//                             placeholder="e.g. 50" min="0"
//                             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white" />
//                         </div>
//                       </div>

//                       {/* Sizes — based on category */}
//                       {getSizes(cat.name).length > 0 && (
//                         <div>
//                           <label className="text-[11px] text-gray-500 font-medium mb-1 block">Sizes</label>
//                           <div className="flex gap-1.5 flex-wrap">
//                             {getSizes(cat.name).map(sz => (
//                               <button key={sz} type="button"
//                                 onClick={() => setPSizes(prev =>
//                                   prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]
//                                 )}
//                                 className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors
//                                   ${pSizes.includes(sz) ? 'bg-[#1a1a2e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                               >
//                                 {sz}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input type="checkbox" checked={pBestseller} onChange={() => setPBestseller(p => !p)} className="rounded" />
//                         <span className="text-xs text-gray-600">Mark as bestseller</span>
//                       </label>

//                       <div className="flex gap-2 pt-1">
//                         <button type="submit" disabled={pLoading}
//                           className="bg-[#1a1a2e] text-white text-xs font-medium px-5 py-2 rounded-lg hover:bg-[#2a2a3e] transition-colors disabled:opacity-60">
//                           {pLoading ? 'Adding...' : 'Add Product'}
//                         </button>
//                         <button type="button" onClick={() => { setShowProductForm(false); resetProductForm() }}
//                           className="bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
//                           Cancel
//                         </button>
//                       </div>
//                     </form>
//                   )}

//                   {/* Products List */}
//                   <div className="max-h-72 overflow-y-auto">
//                     {loadingProducts ? (
//                       <div className="text-center py-6 text-xs text-gray-400">Loading products...</div>
//                     ) : catProducts.length === 0 ? (
//                       <div className="text-center py-8">
//                         <div className="text-2xl mb-2">{cat.emoji}</div>
//                         <p className="text-xs text-gray-400">No products yet in {cat.name}</p>
//                         <p className="text-[10px] text-gray-300 mt-0.5">Click "Add Product" to get started</p>
//                       </div>
//                     ) : (
//                       catProducts.map((product, pi) => (
//                         <div key={pi} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
//                           <img src={product.image?.[0] || '/placeholder.png'}
//                             className="w-10 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0" alt={product.name} />
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs font-medium text-[#1a1a2e] truncate">{product.name}</p>
//                             <p className="text-[10px] text-gray-400 mt-0.5">{currency}{product.price?.toLocaleString()}</p>
//                             {product.sizes?.length > 0 && (
//                               <div className="flex gap-1 mt-1">
//                                 {product.sizes.map(s => (
//                                   <span key={s} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{s}</span>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                           {/* Stock badge */}
//                           <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0
//                             ${product.stock === 0
//                               ? 'bg-red-50 text-red-500'
//                               : product.stock <= product.lowStockAlert
//                                 ? 'bg-orange-50 text-orange-500'
//                                 : 'bg-green-50 text-green-600'
//                             }`}>
//                             {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
//                           </span>
//                           {product.bestseller && (
//                             <span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
//                               Bestseller
//                             </span>
//                           )}
//                           <button onClick={() => handleRemoveProduct(product._id)}
//                             className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors flex-shrink-0">
//                             <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                               <polyline points="3 6 5 6 21 6"/>
//                               <path d="M19 6l-1 14H6L5 6"/>
//                             </svg>
//                           </button>
//                         </div>
//                       ))
//                     )}
                 
//                   </div>
                  
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Categories

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendurl, currency } from '../App'

const CATEGORY_SIZES = {
  bedsheets:      ['Single', 'Double', 'King', 'Queen'],
  quilts:         ['Single', 'Double'],
  blankets:       ['Single', 'Double'],
  curtains:       [],
  cushions:       [],
  'pillow covers':[]
}

const Categories = ({ token }) => {
  const [categories, setCategories]       = useState([])
  const [loading, setLoading]             = useState(true)
  const [showCatForm, setShowCatForm]     = useState(false)
  const [editCat, setEditCat]             = useState(null)
  const [catImage, setCatImage]           = useState(null)
  const [submitting, setSubmitting]       = useState(false)
  const [form, setForm]                   = useState({ name: '', emoji: '', description: '' })

  // Per-category product panel
  const [activeCat, setActiveCat]         = useState(null)
  const [catProducts, setCatProducts]     = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)
  const [pLoading, setPLoading]           = useState(false)
  const [pStock, setPStock]               = useState(0)
  const [pName, setPName]                 = useState('')
  const [pDesc, setPDesc]                 = useState('')
  const [pPrice, setPPrice]               = useState('')
  const [pBestseller, setPBestseller]     = useState(false)
  const [pSizes, setPSizes]               = useState([])
  const [pOnSale, setPOnSale]             = useState(false)
  const [pSalePrice, setPSalePrice]       = useState('')
  const [image1, setImage1]               = useState(false)
  const [image2, setImage2]               = useState(false)
  const [image3, setImage3]               = useState(false)
  const [image4, setImage4]               = useState(false)

  // ── Fetch categories ──
  const fetchCategories = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(backendurl + '/api/category/list')
      if (data.success) setCategories(data.categories)
      else toast.error(data.message)
    } catch (err) {
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  // ── Fetch products for a category ──
  const fetchCategoryProducts = async (catName) => {
    setLoadingProducts(true)
    try {
      const { data } = await axios.post(backendurl + '/api/product/list')
      if (data.success) {
        const filtered = data.products.filter(
          p => p.category?.toLowerCase() === catName.toLowerCase()
        )
        setCatProducts(filtered)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleOpenCategory = (cat) => {
    if (activeCat?._id === cat._id) {
      setActiveCat(null)
      setShowProductForm(false)
    } else {
      setActiveCat(cat)
      setShowProductForm(false)
      fetchCategoryProducts(cat.name)
    }
  }

  // ── Add / Update category ──
  const handleSubmitCat = async (e) => {
    e.preventDefault()
    if (!form.name) return toast.error('Category name is required')
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('emoji', form.emoji)
      formData.append('description', form.description)
      if (catImage) formData.append('image', catImage)

      let data
      if (editCat) {
        formData.append('categoryId', editCat._id)
        const res = await axios.post(backendurl + '/api/category/update', formData, { headers: { token } })
        data = res.data
      } else {
        const res = await axios.post(backendurl + '/api/category/add', formData, { headers: { token } })
        data = res.data
      }

      if (data.success) {
        toast.success(editCat ? 'Category updated' : 'Category added')
        setShowCatForm(false)
        setEditCat(null)
        setForm({ name: '', emoji: '', description: '' })
        setCatImage(null)
        fetchCategories()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Delete category ──
  const handleDeleteCat = async (categoryId) => {
    if (!window.confirm('Delete this category?')) return
    try {
      const { data } = await axios.post(
        backendurl + '/api/category/delete',
        { categoryId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Category deleted')
        if (activeCat?._id === categoryId) setActiveCat(null)
        fetchCategories()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to delete category')
    }
  }

  // ── Start edit ──
  const startEdit = (cat) => {
    setEditCat(cat)
    setForm({ name: cat.name, emoji: cat.emoji, description: cat.description })
    setCatImage(null)
    setShowCatForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Add product ──
  const resetProductForm = () => {
    setImage1(false); setImage2(false); setImage3(false); setImage4(false)
    setPName(''); setPDesc(''); setPPrice(''); setPBestseller(false)
    setPSizes([]); setPStock(0); setPOnSale(false); setPSalePrice('')
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (!pName || !pPrice) return toast.error('Name and price are required')
    setPLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', pName)
      formData.append('stock', pStock)
      formData.append('description', pDesc)
      formData.append('price', pPrice)
      formData.append('category', activeCat.name)
      formData.append('sizes', JSON.stringify(pSizes))
      formData.append('bestseller', pBestseller)
      formData.append('onSale', pOnSale)
      formData.append('salePrice', pOnSale ? pSalePrice : 0)
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

  // ── Image upload component ──
  const ImageUpload = ({ image, setImage, id }) => (
    <label htmlFor={id} className="cursor-pointer block">
      <div className={`w-20 h-20 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors
        ${image ? 'border-[#e8a87c]' : 'border-gray-200 hover:border-gray-300'}`}>
        {image
          ? <img src={URL.createObjectURL(image)} className="w-full h-full object-cover" alt="" />
          : <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
        }
      </div>
      <input type="file" id={id} hidden accept="image/*" onChange={e => setImage(e.target.files[0])} />
    </label>
  )

  // ── Size buttons for category ──
  const getSizes = (catName) => {
    return CATEGORY_SIZES[catName?.toLowerCase()] || []
  }

  return (
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a2e]">Categories</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {categories.length} categories · Click any to manage its products
          </p>
        </div>
        <button
          onClick={() => {
            setShowCatForm(!showCatForm)
            setEditCat(null)
            setForm({ name: '', emoji: '', description: '' })
            setCatImage(null)
          }}
          className="flex items-center gap-1.5 bg-[#1a1a2e] text-white text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-[#2a2a3e] transition-colors self-start"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Category
        </button>
      </div>

      {/* ── Add / Edit Category Form ── */}
      {showCatForm && (
        <div className="bg-white rounded-xl border border-black/5 p-5">
          <p className="text-sm font-semibold text-[#1a1a2e] mb-4">
            {editCat ? 'Edit Category' : 'New Category'}
          </p>
          <form onSubmit={handleSubmitCat}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

              <div className="sm:col-span-2">
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Category Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Bedsheets"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
                />
              </div>

              <div>
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Emoji Icon</label>
                <input
                  type="text"
                  value={form.emoji}
                  onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}
                  placeholder="🛏"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Short description of this category"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">
                  Category Image <span className="text-gray-300">(optional — shown on frontend)</span>
                </label>
                <label className="flex items-center gap-3 border border-dashed border-gray-200 rounded-lg px-4 py-3 bg-gray-50 cursor-pointer hover:border-[#e8a87c] transition-colors w-fit">
                  {catImage
                    ? <img src={URL.createObjectURL(catImage)} className="w-10 h-10 object-cover rounded-lg" alt="" />
                    : editCat?.image
                      ? <img src={editCat.image} className="w-10 h-10 object-cover rounded-lg" alt="" />
                      : <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                  }
                  <span className="text-xs text-gray-400">
                    {catImage ? catImage.name : editCat?.image ? 'Change image' : 'Click to upload category image'}
                  </span>
                  <input type="file" hidden accept="image/*" onChange={e => setCatImage(e.target.files[0])} />
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#e8a87c] text-white text-xs font-medium px-5 py-2.5 rounded-lg hover:bg-[#d4956a] transition-colors disabled:opacity-60"
              >
                {submitting ? 'Saving...' : editCat ? 'Update Category' : 'Save Category'}
              </button>
              <button
                type="button"
                onClick={() => { setShowCatForm(false); setEditCat(null) }}
                className="bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Loading ── */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#1a1a2e] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📦</div>
          <p className="text-sm">No categories yet</p>
          <p className="text-xs mt-1">Click "Add Category" to create your first one</p>
        </div>
      ) : (

        /* ── Category Cards ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat._id} className="bg-white rounded-xl border border-black/5 overflow-hidden">

              {/* Category Header */}
              <div
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors
                  ${activeCat?._id === cat._id ? 'bg-[#1a1a2e]' : 'hover:bg-gray-50'}`}
                onClick={() => handleOpenCategory(cat)}
              >
                {/* Emoji or image */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden
                  ${activeCat?._id === cat._id ? 'bg-white/15' : 'bg-gray-50'}`}>
                  {cat.image
                    ? <img src={cat.image} className="w-full h-full object-cover rounded-xl" alt={cat.name} />
                    : <span>{cat.emoji}</span>
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold ${activeCat?._id === cat._id ? 'text-white' : 'text-[#1a1a2e]'}`}>
                    {cat.name}
                  </div>
                  <div className={`text-[11px] mt-0.5 truncate ${activeCat?._id === cat._id ? 'text-white/60' : 'text-gray-400'}`}>
                    {cat.description || 'No description'}
                  </div>
                  <div className="text-[10px] mt-1 font-medium text-[#e8a87c]">
                    {catProducts.length > 0 && activeCat?._id === cat._id
                      ? `${catProducts.length} products`
                      : 'Click to view products'
                    }
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => startEdit(cat)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
                      ${activeCat?._id === cat._id ? 'bg-white/15 hover:bg-white/25' : 'bg-gray-100 hover:bg-blue-50'}`}
                  >
                    <svg className={`w-3 h-3 ${activeCat?._id === cat._id ? 'text-white' : 'text-blue-500'}`}
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteCat(cat._id)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
                      ${activeCat?._id === cat._id ? 'bg-white/15 hover:bg-red-500/30' : 'bg-gray-100 hover:bg-red-50'}`}
                  >
                    <svg className={`w-3 h-3 ${activeCat?._id === cat._id ? 'text-white' : 'text-red-400'}`}
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                    </svg>
                  </button>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200
                      ${activeCat?._id === cat._id ? 'rotate-180 text-white' : 'text-gray-400'}`}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>

              {/* ── Expanded Product Panel ── */}
              {activeCat?._id === cat._id && (
                <div className="border-t border-gray-100">

                  {/* Toolbar */}
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

                  {/* Product Form */}
                  {showProductForm && (
                    <form onSubmit={handleAddProduct} className="p-4 bg-gray-50 border-b border-gray-100 space-y-3">
                      <p className="text-xs font-semibold text-[#1a1a2e]">Add product to {cat.name}</p>

                      <div>
                        <label className="text-[11px] text-gray-500 font-medium mb-1.5 block">Product Images</label>
                        <div className="flex gap-2 flex-wrap">
                          <ImageUpload image={image1} setImage={setImage1} id="pi1" />
                          <ImageUpload image={image2} setImage={setImage2} id="pi2" />
                          <ImageUpload image={image3} setImage={setImage3} id="pi3" />
                          <ImageUpload image={image4} setImage={setImage4} id="pi4" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-500 font-medium mb-1 block">Product Name *</label>
                        <input type="text" value={pName} onChange={e => setPName(e.target.value)}
                          placeholder="e.g. Luxury Bedsheet"
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white" />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-500 font-medium mb-1 block">Description</label>
                        <textarea value={pDesc} onChange={e => setPDesc(e.target.value)} rows={2}
                          placeholder="Product description..."
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white resize-none" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-gray-500 font-medium mb-1 block">Price (Rs) *</label>
                          <input type="number" value={pPrice} onChange={e => setPPrice(e.target.value)}
                            placeholder="1200"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white" />
                        </div>
                        <div>
                          <label className="text-[11px] text-gray-500 font-medium mb-1 block">Initial Stock</label>
                          <input type="number" value={pStock} onChange={e => setPStock(e.target.value)}
                            placeholder="e.g. 50" min="0"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e8a87c] bg-white" />
                        </div>
                      </div>

                      {/* Sizes — based on category */}
                      {getSizes(cat.name).length > 0 && (
                        <div>
                          <label className="text-[11px] text-gray-500 font-medium mb-1 block">Sizes</label>
                          <div className="flex gap-1.5 flex-wrap">
                            {getSizes(cat.name).map(sz => (
                              <button key={sz} type="button"
                                onClick={() => setPSizes(prev =>
                                  prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]
                                )}
                                className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors
                                  ${pSizes.includes(sz) ? 'bg-[#1a1a2e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* On Sale */}
                      <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer mb-2">
                          <input
                            type="checkbox"
                            checked={pOnSale}
                            onChange={() => { setPOnSale(p => !p); if (pOnSale) setPSalePrice('') }}
                            className="rounded"
                          />
                          <span className="text-xs text-gray-600 font-medium">Mark as On Sale</span>
                        </label>
                        {pOnSale && (
                          <div>
                            <label className="text-[11px] text-gray-500 font-medium mb-1 block">
                              Sale Price (Rs) *
                            </label>
                            <input
                              type="number"
                              value={pSalePrice}
                              onChange={e => setPSalePrice(e.target.value)}
                              placeholder="e.g. 900"
                              min="0"
                              className="w-full border border-red-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-red-400 bg-white"
                            />
                            {pPrice && pSalePrice && Number(pSalePrice) < Number(pPrice) && (
                              <p className="text-[10px] text-green-600 mt-1">
                                {Math.round(((Number(pPrice) - Number(pSalePrice)) / Number(pPrice)) * 100)}% discount
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={pBestseller} onChange={() => setPBestseller(p => !p)} className="rounded" />
                        <span className="text-xs text-gray-600">Mark as bestseller</span>
                      </label>

                      <div className="flex gap-2 pt-1">
                        <button type="submit" disabled={pLoading}
                          className="bg-[#1a1a2e] text-white text-xs font-medium px-5 py-2 rounded-lg hover:bg-[#2a2a3e] transition-colors disabled:opacity-60">
                          {pLoading ? 'Adding...' : 'Add Product'}
                        </button>
                        <button type="button" onClick={() => { setShowProductForm(false); resetProductForm() }}
                          className="bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
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
                          <img src={product.image?.[0] || '/placeholder.png'}
                            className="w-10 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0" alt={product.name} />
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
                          {/* Stock badge */}
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0
                            ${product.stock === 0
                              ? 'bg-red-50 text-red-500'
                              : product.stock <= product.lowStockAlert
                                ? 'bg-orange-50 text-orange-500'
                                : 'bg-green-50 text-green-600'
                            }`}>
                            {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
                          </span>
                          {product.onSale && product.salePrice > 0 && (
                            <span className="text-[9px] bg-red-50 text-red-500 border border-red-100 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                              Sale: Rs {product.salePrice?.toLocaleString()}
                            </span>
                          )}
                          {product.bestseller && (
                            <span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                              Bestseller
                            </span>
                          )}
                          <button onClick={() => handleRemoveProduct(product._id)}
                            className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors flex-shrink-0">
                            <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14H6L5 6"/>
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
      )}
    </div>
  )
}

export default Categories