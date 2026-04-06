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
        </div>
      {/* rendring product */}
      <div  className=' grid gap-2 grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-y-6'>
        { latestproducts.map((item,index)=>(
          <Productitems key={index} id={item._id} image={Array.isArray(item.image) ? item.image[0] : item.image } name={item.name} price={item.price} />
        ))}
      </div>
      
    </div>

  )
}

export default Latestcollection
