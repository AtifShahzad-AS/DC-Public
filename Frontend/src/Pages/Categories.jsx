import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
const categories = [
  {
    name: 'Bedsheets',
    image: assets.b111,
    count: '42 Products',
    tag: 'Best Seller',
    tagColor: 'bg-blue-600',
    value: 'Bedsheets',
  },
  {
    name: 'Curtains',
    image: assets.slogo,
    count: '35 Products',
    tag: 'Trending',
    tagColor: 'bg-slate-700',
    value: 'Curtains',
  },
  {
    name: 'Quilts',
    image: assets.b6,
    count: '28 Products',
    tag: 'New Arrival',
    tagColor: 'bg-blue-800',
    value: 'Quilts',
  },
  {
    name: 'Cushions',
    image: assets.cushion,
    count: '19 Products',
    tag: 'Popular',
    tagColor: 'bg-slate-600',
    value: 'Cushions',
  },
  {
    name: 'Pillow Covers',
    image: assets.pillow,
    count: '23 Products',
    tag: 'New Arrival',
    tagColor: 'bg-blue-700',
    value: 'Pillow Covers',
  },
  {
    name: 'Blankets',
    image: assets.blanket,
    count: '16 Products',
    tag: 'Trending',
    tagColor: 'bg-slate-700',
    value: 'Blankets',
  },
]

const Categories = () => {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  const handleClick = (cat) => {
    navigate('/collection', { state: { category: cat.value } })
  }

  return (
    <section className="px-3 sm:px-[5vw] md:px-[7vw] lg:px-[4vw] py-5 sm:py-10 ">
  <div className='text-center '>
            <Title text1={'Browse by '} text2={'Category'}/>
        </div>
      {/* ── Section Header ── */}
      <div className="flex items-end justify-between mb-2 sm:mb-7">
       
         <div> 
          {/* <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
            Shop Our Collection
          </p>
          <h2 className="text-2xl   sm:text-3xl font-bold text-slate-900 leading-tight">
            Browse by <span className="text-blue-600 ">Category</span>
          </h2> */}
        </div> 

        {/* Nav Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200
              ${canScrollLeft
                ? 'border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
                : 'border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200
              ${canScrollRight
                ? 'border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
                : 'border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Scrollable Cards Strip ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleClick(cat)}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            className="flex-shrink-0 w-[220px] sm:w-[240px] cursor-pointer group"
          >
            <div
              className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300
                ${activeIndex === i
                  ? 'border-blue-600 shadow-lg shadow-blue-100 -translate-y-1'
                  : 'border-slate-100 shadow-sm hover:shadow-md'
                }`}
            >
              {/* Image */}
              <div className="relative w-full h-52 bg-slate-50 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className={`w-full h-full object-cover transition-transform duration-500
                    ${activeIndex === i ? 'scale-105' : 'scale-100'}`}
                />

                {/* Dark overlay on hover */}
                <div className={`absolute inset-0 bg-slate-900 transition-opacity duration-300
                  ${activeIndex === i ? 'opacity-20' : 'opacity-0'}`}
                />

                {/* Tag badge */}
                {/* <div className={`absolute top-3 left-3 ${cat.tagColor} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full`}>
                  {cat.tag}
                </div> */}

                {/* Arrow on hover */}
                <div className={`absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-300
                  ${activeIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              {/* Card Footer */}
              <div className={`px-4 py-3.5 transition-colors duration-300
                ${activeIndex === i ? 'bg-blue-600' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-bold transition-colors duration-300
                      ${activeIndex === i ? 'text-white' : 'text-slate-900'}`}>
                      {cat.name}
                    </p>
                    <p className={`text-xs mt-0.5 transition-colors duration-300
                      ${activeIndex === i ? 'text-blue-100' : 'text-slate-400'}`}>
                      {cat.count}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                    ${activeIndex === i
                      ? 'bg-white/20'
                      : 'bg-slate-100 group-hover:bg-blue-50'
                    }`}>
                    <svg
                      className={`w-4 h-4 transition-colors duration-300
                        ${activeIndex === i ? 'text-white' : 'text-slate-400'}`}
                      fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dot Indicators ── */}
      <div className="flex justify-center gap-1.5 mt-5">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current
              if (!el) return
              el.scrollTo({ left: i * 256, behavior: 'smooth' })
            }}
            className={`transition-all duration-300 rounded-full
              ${activeIndex === i
                ? 'w-6 h-1.5 bg-blue-600'
                : 'w-1.5 h-1.5 bg-slate-200 hover:bg-slate-300'
              }`}
          />
        ))}
      </div>

    </section>
  )
}

export default Categories