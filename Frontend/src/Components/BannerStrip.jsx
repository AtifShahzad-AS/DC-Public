import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BANNER_COLORS = [
  { bg: '#fff4e5', text: '#b36b00', accent: '#e8a87c' },
  { bg: '#e6f7ee', text: '#1a7a45', accent: '#2e9e5b' },
  { bg: '#e8f0fe', text: '#1a4fa8', accent: '#3b82f6' },
  { bg: '#fce8e8', text: '#a82222', accent: '#ef4444' },
  { bg: '#f0eafd', text: '#6b21a8', accent: '#9b59b6' },
  { bg: '#f0ede8', text: '#5c4a2e', accent: '#92400e' },
]

// ── Smart navigation handler ──
const handleBannerClick = (link, navigate) => {
  if (!link || link === '/') return

  // External URL
  if (link.startsWith('http')) {
    window.open(link, '_blank')
    return
  }

  // Internal — use navigate
  navigate(link)
}

// ── Marquee for Top position ──
const MarqueeBanner = ({ banners, color, navigate }) => {
  const items = [...banners, ...banners, ...banners]

  return (
    <div
      className="relative w-full overflow-hidden py-2.5"
      style={{ background: color.bg }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${color.bg}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${color.bg}, transparent)` }} />

      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((banner, i) => (
          <span
            key={i}
            onClick={() => handleBannerClick(banner.link, navigate)}
            className="inline-flex items-center gap-3 mx-8 cursor-pointer group"
            style={{ color: color.text }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: color.accent }} />
            <span className="text-sm font-medium group-hover:underline
              underline-offset-2 transition-all">
              {banner.title}
            </span>
            {banner.link && banner.link !== '/' && (
              <span className="text-xs opacity-60 group-hover:opacity-100
                transition-opacity flex items-center gap-1">
                Shop Now
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Slideshow for Middle / Bottom ──
const SlideshowBanner = ({ banners, navigate }) => {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [hovered, setHovered] = useState(false)
  const intervalRef           = useRef(null)

  const goTo = (index) => {
    setVisible(false)
    clearInterval(intervalRef.current)
    setTimeout(() => {
      setCurrent(index)
      setVisible(true)
    }, 350)
  }

  useEffect(() => {
    if (banners.length <= 1 || hovered) return
    intervalRef.current = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % banners.length)
        setVisible(true)
      }, 350)
    }, 4000)
    return () => clearInterval(intervalRef.current)
  }, [banners.length, hovered])

  const banner = banners[current]
  const color  = BANNER_COLORS[banner?.colorIndex] || BANNER_COLORS[0]

  if (!banner) return null

  return (
    <div
      className="relative w-full overflow-hidden cursor-pointer select-none"
      style={{ background: color.bg }}
      onClick={() => handleBannerClick(banner.link, navigate)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
        <div className="h-full w-1/3 animate-shimmer"
          style={{ background: `linear-gradient(to right, transparent, ${color.accent}, transparent)` }} />
      </div>

      <div className={`flex items-center justify-between px-4 sm:px-8 py-3
        transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>

        {/* Left */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="relative flex-shrink-0">
            <span className="absolute inline-flex w-2.5 h-2.5 rounded-full
              opacity-75 animate-ping"
              style={{ background: color.accent }} />
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full"
              style={{ background: color.accent }} />
          </span>
          <p className="text-sm font-semibold truncate" style={{ color: color.text }}>
            {banner.title}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
          {banner.link && banner.link !== '/' && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold
              px-3 py-1 rounded-full border transition-all"
              style={{
                color:       color.text,
                borderColor: color.accent + '60',
                background:  color.accent + '15',
              }}>
              Shop Now
              <svg className="w-3 h-3" fill="none" stroke="currentColor"
                strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          )}

          {banners.length > 1 && (
            <div className="flex items-center gap-1.5">
              {banners.map((_, i) => (
                <button key={i}
                  onClick={e => { e.stopPropagation(); goTo(i) }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      i === current ? '16px' : '6px',
                    height:     '6px',
                    background: i === current ? color.accent : color.accent + '40',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom shimmer */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
        <div className="h-full w-1/3 animate-shimmer-reverse"
          style={{ background: `linear-gradient(to right, transparent, ${color.accent}, transparent)` }} />
      </div>
    </div>
  )
}

const BannerStrip = ({ position }) => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate              = useNavigate()
  const backendurl            = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.post(backendurl + '/api/banner/live')
        if (data.success) {
          setBanners(data.banners.filter(b => b.position === position))
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBanners()
  }, [position])

  if (loading || banners.length === 0) return null

  if (position === 'Top') {
    const color = BANNER_COLORS[banners[0]?.colorIndex] || BANNER_COLORS[0]
    return <MarqueeBanner banners={banners} color={color} navigate={navigate} />
  }

  return <SlideshowBanner banners={banners} navigate={navigate} />
}

export default BannerStrip