// src/Pages/Promo.jsx
import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams }  from 'react-router-dom'
import { ShopContext }       from '../../Context/Shopcontext'
import Productitems          from '../Components/Productitems'

const Promo = () => {
  const { products }        = useContext(ShopContext)
  const [searchParams]      = useSearchParams()
  const [filtered, setFiltered] = useState([])

  const category = searchParams.get('category')
  const tag      = searchParams.get('tag')       // e.g. ?tag=bestseller
  const title    = searchParams.get('title') || 'Special Offer'

  useEffect(() => {
    let result = products

    if (category) {
      result = result.filter(p =>
        p.category?.toLowerCase() === category.toLowerCase()
      )
    }

    if (tag === 'bestseller') {
      result = result.filter(p => p.bestseller)
    }

    setFiltered(result)
  }, [products, category, tag])

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-20 pb-16">

      {/* Hero strip matching banner color */}
      <div className="rounded-2xl p-8 mb-10 text-center"
        style={{ background: '#fff4e5' }}>
        <p className="text-xs font-semibold text-[#b36b00] uppercase
          tracking-widest mb-2">
          Limited Time Offer
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          {title}
        </h1>
        <p className="text-slate-500 text-sm">
          {filtered.length} products available
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <Productitems
              key={i}
              id={item._id}
              name={item.name}
              price={item.price}
              image={Array.isArray(item.image) ? item.image[0] : item.image}
              rating={item.rating || 0}
              reviewCount={item.reviewCount || 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Promo