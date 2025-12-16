import React, { useContext } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import {Link} from 'react-router-dom'
import {anticipate, motion} from "motion/react"
const Productitems = ({id,image,name,price}) => {
    const {currency}=useContext(ShopContext);
  return (
   
    <Link
  className="text-gray-700 cursor-pointer group block relative rounded-2xl overflow-hidden"
  to={`/product/${id}`}
>
  {/* Product Image */}
  <img
    className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-110"
    src={image}
    alt={name}
  />

  {/* Hover Overlay */}
  <div
    className="absolute inset-0 flex flex-col items-center justify-center 
               bg-black/60 opacity-0 group-hover:opacity-100 
               transition-opacity duration-500 rounded-2xl"
  >
    <p className="text-white text-lg font-semibold mb-1">{name}</p>
    <p className="text-white text-sm mb-3">
      {currency}
      {price}
    </p>
    <div className="flex gap-3">
      <button className="bg-gray-400 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-blue-500 transition">
        Shop Now
      </button>
     
    </div>
  </div>
</Link>
 

   


  )
}

export default Productitems

// import React, { useContext } from 'react'
// import { ShopContext } from '../../Context/Shopcontext'
// import { Link } from 'react-router-dom'

// const Productitems = ({ id, image, name, price }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <Link
//       to={`/product/${id}`}
//       className="block bg-white rounded-2xl shadow-md hover:shadow-xl 
//                  transition duration-300 overflow-hidden group"
//     >
//       {/* Product Image */}
//       <div className="overflow-hidden">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
//         />
//       </div>

//       {/* Product Details */}
//       <div className="p-4">
//         <p className="text-gray-800 font-semibold text-lg mb-1">{name}</p>

//         <p className="text-gray-600 text-md mb-3">
//           {currency}{price}
//         </p>

//         {/* Shop Now Button */}
//         {/* <button
//           className="w-full bg-red-500 text-white py-2 rounded-lg 
//                      font-medium hover:bg-red-600 transition"
//         >
//           Shop Now
//         </button> */}
//           <button className="w-full bg-gray-400 text-white px-4 py-2  rounded-lg font-medium hover:bg-red-500 transition">
//         Shop Now
//       </button>
//       </div>
//     </Link>
//   );
// };

// export default Productitems;

 // <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
    // {/* <motion.div  transition={{duration:1,}}   whileHover={{scale:'1.1',rotate:5,y:20,}}  className='overflow-hidden'>
    //  <img className='rounded-2xl hover:' src={image} alt="img" />
    // </motion.div> */}
    //  <div className="relative overflow-hidden rounded-2xl transition-transform duration-700 hover:scale-110 hover:rotate-1 hover:translate-x-1">
    //   <img className="w-full h-auto rounded-2xl" src={image} alt="img" />

    //   {/* Overlay */}
    //   <div
    //     className="absolute inset-0 flex items-center justify-center 
    //                bg-black/50 opacity-0 transition-opacity duration-300 
    //                hover:opacity-100 rounded-2xl text-red-500 text-2xl font-bold"
    //   > Shop Now
    //     {/* <a
    //       href="https://example.com"        className="text-white text-lg font-semibold no-underline"     >   Visit Link        </a> */}
    //   </div>
    // </div>

    //  <p className='pt-3 pb-1 text-sm'>{name}</p>
    //  <p className='text-sm font-medium'>{currency}{price}</p>
    // </Link>
     {/* <button className="bg-red-500 text-white px-4 py-1 rounded-md font-medium hover:bg-red-600 transition">
        Buy Now
      </button> */}