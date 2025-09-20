import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import Carttotal from '../Components/Carttotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../../Context/Shopcontext'

const Place_order = () => {
  const [method,setmethod]=useState('cod');
  const {navigate}=useContext(ShopContext);
  return (
    <div className='px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
      <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
      {/* left side */}
      <div className='flex flex-col w-full pt-5 sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          
            <Title text1={'Delievery' } text2={"Information"}/>
          </div>
          <div className='flex  gap-3 '>
        <input className=' border border-gray-300 px-1.5 py-3.5 w-full rounded ' type="text" placeholder='First Name' />
        <input className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Last Name' />
          </div>
            <input className='border border-gray-300 px-1.5 py-3.5 w-full rounded mt-4' type="Email" placeholder='Email Address' />
            <input className='border border-gray-300 px-1.5 py-3.5 w-full rounded mt-4' type="Text" placeholder='Street' />
            <div className='flex  gap-3  mt-4'>
        <input className=' border border-gray-300 px-1.5 py-3.5 w-full rounded ' type="text" placeholder='City' />
        <input className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='State' />
          </div>
           <div className='flex  gap-3 mt-4 '>
        <input className=' border border-gray-300 px-1.5 py-3.5 w-full rounded ' type="number" placeholder='Zip code' />
        <input className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Country' />
          </div>
        <input className=' border border-gray-300 px-1.5 py-3.5 w-full rounded mt-4' type="number" placeholder='Phone Number' />

       

      </div>
      {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <Carttotal/>
          </div>
          <div className='mt-12'>
              <Title text1={"PAYMENT "} text2={"METHOD"}/>
 </div>
              {/* payment slection */}
            <div  className='flex flex-col lg:flex-row gap-3'>
              <div onClick={()=>setmethod("stripe")} className='flex items-center gap-3 border p-2 py-3 cursor-pointer '>
                 <p className={`min-w-3.5 h-3.5 border rounded-full cursor-pointer ${method === "stripe" ? 'bg-green-400' : ''}`}></p> <img  className='h-5  mx-4' src={assets.stripe_logo} alt="Stripe" />
              </div>
              <div onClick={()=>setmethod("googlepay")}   className='flex items-center gap-3 border p-2 py-3 cursor-pointer '>
               <p className={`min-w-3.5 h-3.5 border rounded-full cursor-pointer ${method === "googlepay" ? 'bg-green-400' : ''}`}></p>  <img  className='h-5  mx-4' src={assets.googlepay_logo} alt="Googlepay" />
              </div>
              <div onClick={()=>setmethod("cod")}   className='flex items-center gap-3 border p-2 py-3 cursor-pointer'>
               <p className={`min-w-3.5 h-3.5 border rounded-full cursor-pointer ${method === "cod" ? 'bg-green-400' : ''}`}></p>  <img  className='h-5  mx-4' src={assets.easypaisa_logo} alt="Cash On Delievery" />
              </div>
            </div>
            <div className='w-full text-end mt-8'>
              <button onClick={()=>navigate("/orders")} className='bg-blue-600 text-white px-16 py-4 rounded '>Place Order</button>
            </div>
         
        
      </div>
      </div>
      
    </div>
  )
}

export default Place_order
