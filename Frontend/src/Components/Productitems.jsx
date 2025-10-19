import React, { useContext } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import {Link} from 'react-router-dom'
import {anticipate, motion} from "motion/react"
const Productitems = ({id,image,name,price}) => {
    const {currency}=useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
    {/* <motion.div  transition={{duration:1,}}   whileHover={{scale:'1.1',rotate:5,y:20,}}  className='overflow-hidden'>
     <img className='rounded-2xl hover:' src={image} alt="img" />
    </motion.div> */}
     <div className="relative overflow-hidden rounded-2xl transition-transform duration-700 hover:scale-110 hover:rotate-1 hover:translate-x-1">
      <img className="w-full h-auto rounded-2xl" src={image} alt="img" />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center 
                   bg-black/50 opacity-0 transition-opacity duration-300 
                   hover:opacity-100 rounded-2xl text-red-500 text-2xl font-bold"
      > Shop Now
        {/* <a
          href="https://example.com"        className="text-white text-lg font-semibold no-underline"     >   Visit Link        </a> */}
      </div>
    </div>

     <p className='pt-3 pb-1 text-sm'>{name}</p>
     <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default Productitems
