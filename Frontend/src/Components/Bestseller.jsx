import React, { useContext, useEffect, useState } from 'react'

import { ShopContext } from '../../Context/Shopcontext'
import products from '../assets/products';
import Title from './Title';
import Product from '../Pages/Product';
import Productitems from './Productitems';
const Bestseller = () => {
    const {products} =useContext(ShopContext);
    const [bestseller,setbestseller]=useState([]);
    useEffect(()=>{
   const bestproduct= products.filter((item)=>{
   return item.bestseller 
   });
   setbestseller(bestproduct.slice(0,4))

    },[products])
  return (
     <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'Best '} text2={'Seller'}/>
            <p className='w-3/4 text-center m-auto text-xs sm:text-sm md:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, perspiciatis?</p>
        </div>
      {/* rendring product */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 gap-y-6'>
        { bestseller.map((item,index)=>(
          <Productitems key={index} id={item._id} image={Array.isArray(item.image) ? item.image[0] : item.image } name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  ) 
}

export default Bestseller
