// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../../Context/Shopcontext'
// import Productitems from './Productitems'
// import Title from './Title'

// const Relatedproduct = ({ category, subcategory }) => {
//     const { products } = useContext(ShopContext)
//     const [related, setrelated] = useState([])
//     useEffect(() => {
//         if (products.length > 0) {
//             let productcopy = products.slice();
//             productcopy = productcopy.filter((item) =>
//                 category === item.category);
//             productcopy = productcopy.filter((item) => 
//                 subcategory === item.subcategory);
//             setrelated(products.slice(0,5));
//         }
//     }, [products])
//     return (
//         <div className='my-24'> 
//             <div className='text-center text-3xl py-2'>
//     <Title text1={"Related "} text2={'Products'}  />
//             </div>
//             <div className=' grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6' >
//      {
//         related.map((item,index)=>
//         <Productitems key={index} id={item._id}   image={Array.isArray(item.image) ? item.image[0] : item.image } price={item.price} name={item.name} /> 
//     )
//      }
//             </div>

//         </div>
//     )
// }

// export default Relatedproduct

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import Productitems from './Productitems'
import Title from './Title'

const Relatedproduct = ({ category, subcategory }) => {
  const { products } = useContext(ShopContext)
  const [related, setrelated] = useState([])

  useEffect(() => {
    if (products.length > 0 && category) {
      let filtered = products.filter(item => item.category === category)

      // If subcategory exists and matches, filter further
      if (subcategory) {
        const withSub = filtered.filter(item => item.subcategory === subcategory)
        // Fall back to category-only if subcategory match gives too few results
        filtered = withSub.length >= 2 ? withSub : filtered
      }

      setrelated(filtered.slice(0, 4))
    }
  }, [products, category, subcategory])

  if (related.length === 0) return null

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={"Related "} text2={'Products'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <Productitems
            key={index}
            id={item._id}
            image={Array.isArray(item.image) ? item.image[0] : item.image}
            price={item.price}
            name={item.name}
            rating={item.rating || 4.5}
          />
        ))}
      </div>
    </div>
  )
}

export default Relatedproduct