import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/Shopcontext';
import Title from './Title';
import Collection from '../Pages/Collection';
import Productitems from './Productitems';
import {motion} from 'motion/react'

const Latestcollection = () => {
    const  {products}=useContext(ShopContext);
    const [latestproducts,setlatestproducts]=useState([]);
    useEffect(()=>{
      
   setlatestproducts(products.slice(0,4));
    },[products])

  return (
    <div className='my-5'>

        <div className='text-center py-8 text-3xl '>
            <Title text1={'Latest '} text2={'Collections'}/>
            <p className='w-3/4 text-center m-auto text-xs sm:text-sm md:text-base'>Elevate your space with our newest arrivals featuring contemporary designs and seasonal trends.</p>
        </div>
      {/* rendring product */}
      <div  className=' grid gap-2 grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-y-6'>
        { latestproducts.map((item,index)=>(
          <Productitems key={index} id={item._id} stock={item.stock}  image={Array.isArray(item.image) ? item.image[0] : item.image } name={item.name} price={item.price} rating={item.rating || 0}
reviewCount={item.reviewCount || 0} /> 
        ))}
      </div>
      
    </div>

  )
}

export default Latestcollection
