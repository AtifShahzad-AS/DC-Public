import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/Shopcontext';
// import Title from './Title';
import Title from '../Components/Title';
import { NavLink } from 'react-router-dom';
// import { ShopContext } from '../Context/Shopcontext'

const catagories = () => {
    // const  {products}=useContext(ShopContext);
    // console.log(products.slice(0,10));
    // const [latestproducts,setlatestproducts]=useState([]);
//     useEffect(()=>{
//    setlatestproducts(products.slice(0,4));
//     },[])

  return (
    // <div className='hidden lg:block my-10'>
    <div className='my-5 '>

        <div className='text-center py-5 lg:py-8 text-3xl'>
            <Title text1={'Catagories '} text2={'Stack'}/>
        </div>
       <div className="hidden lg:grid  grid-rows-9 gap-4 w-full h-[400px] sm:h-[900px]   mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
  <div className="col-span-3 row-span-5  flex items-center justify-center text-2xl font-bold rounded-2xl bg-[url('/g.png')] bg-cover bg-center ">BedSheets </div>

  <div className="col-span-2 row-span-5 col-start-4  flex items-center justify-center text-2xl font-bold rounded-2xl bg-[url('/sheet.webp')] bg-cover bg-center">Quilts</div>

  <div className="col-span-2 row-span-4 row-start-6  flex items-center justify-center text-2xl font-bold rounded-2xl bg-[url('/pilow.png')] bg-cover bg-center">Pillows Cover</div>


  <div className="col-span-3 row-span-4 col-start-3 row-start-6  flex items-center justify-center text-2xl font-bold rounded-2xl bg-[url('/bg1.jpg')] bg-cover bg-center">Curtains</div>

  
  {/* <div className=" hidden row-span-4 col-start-5 row-start-6 bg-pink-300 sm:flex items-center justify-center text-2xl font-bold rounded-2xl bg-[url('/g.png')] bg-cover bg-center">Cution Cover</div> */}
</div>



      {/* rendring product */}
      {/* <div  className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 gap-y-6'>
        { latestproducts.map((item,index)=>(
          <Productitems key={index} id={item._id} image={Array.isArray(item.image) ? item.image[0] : item.image } name={item.name} price={item.price} />
        ))}
      </div> */}
      
       <ul className='lg:hidden  flex justify-between  sm:gap-7 md:gap-10  gap-5 text-black border-gray-400  px-7 py-4 text-sm sm:text-2xl font-medium bg-gray-300 rounded-full '>
          <NavLink to='/' className="hover:text-blue-600  border-b-2 border-transparent  hover:border-b-blue-600">Bedsheets</NavLink>
          <NavLink to='/collection' className="hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600 ">Curtains</NavLink>
          <NavLink to='/contact' className="hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600">Quilts</NavLink>
          <NavLink to='/about' className="hover:text-blue-600 border-b-2 border-transparent  hover:border-b-blue-600">Pillows</NavLink>
        </ul>
    </div>
      
  )
}

export default catagories
