import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import Carttotal from '../Components/Carttotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../../Context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Place_order = () => {
  const [method,setmethod]=useState('cod');
  const {navigate,backendurl,token,cartitems,setcartitems,getcartamount,delievery_fee,products}=useContext(ShopContext);

  const [formdata,setformdata]=useState({
    firstname:"",
    lastname:"",  
    email:"",
    street:"",
    city:"",
    state:"",
    country:"",
    zipcode:"",
    phone:""

  })
  const onchange= (event)=>{
    const name= event.target.name;
    const value=event.target.value;
    setformdata(data=> ({...data,[name]:value}))
  }
  const onsubmit= async (event)=>{
   event.preventDefault()
   try {
//     let orderitems=[]
//     for(const items in cartitems){
//       for(const item in cartitems[items]){
//         if(cartitems[items][item] > 0){
//           const iteminfo= structuredClone(products.find(product => product._id===items))
//           if(iteminfo)
// {
//   iteminfo.size=item
//   iteminfo.quantity= cartitems[items][item]
//   orderitems.push(iteminfo)
// }        }
//       }
//     }
// ── NEW ──
let orderitems = []
for (const items in cartitems) {
  for (const item in cartitems[items]) {
    if (cartitems[items][item] > 0) {
      const product = products.find(product => product._id === items)
      if (product) {
        orderitems.push({
          productId: product._id,   // ← explicit id for stock deduction
          name:      product.name,
          price:     product.price,
          image:     product.image,
          category:  product.category,
          size:      item,
          quantity:  cartitems[items][item],
        })
      }
    }
  }
}
   let orderdata= {
    address:formdata,
    items:orderitems,
    amount:getcartamount() + delievery_fee
   
   }
   switch(method){
    
    //api for cod
    case "cod":
  const response= await axios.post(backendurl + '/api/order/place',orderdata,{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  if(response.data.success){
    setcartitems({})
    navigate('/orders')
  }
  else{
    toast.error(response.data.message)
  }
      break;

       case "stripe":
        
  const responsestripe= await axios.post(backendurl + '/api/order/stripe',orderdata,{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  // console.log(responsestripe.data)
  if(responsestripe.data.success){
    const {session_url}=responsestripe.data
    window.location.replace(session_url)
    setcartitems({})
    // navigate('/orders')
  }
  else{
    toast.error(responsestripe.data.message)
  }
      break;

 

    
    default:
      break;
   }
   } catch (error) {
    console.log(error);
    
  }
  }
  return (
    <form onSubmit={onsubmit} className='px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
      <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
      {/* left side */}
      <div className='flex flex-col w-full pt-5 sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          
            <Title text1={'Delievery' } text2={"Information"}/>
          </div>
          <div className='flex  gap-3 '>
        <input required onChange={onchange} name="firstname" value={formdata.firstname} className=' border border-gray-300 px-1.5 py-3.5 w-full rounded ' type="text" placeholder='First Name' />
        <input required onChange={onchange} name="lastname" value={formdata.lastname} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Last Name' />
          </div>
            <input required onChange={onchange} name="email" value={formdata.email} className='border border-gray-300 px-1.5 py-3.5 w-full rounded mt-4' type="Email" placeholder='Email Address' />
            <input required onChange={onchange} name="street" value={formdata.street} className='border border-gray-300 px-1.5 py-3.5 w-full rounded mt-4' type="Text" placeholder='Street' />
            <div className='flex  gap-3  mt-4'>
        <input required onChange={onchange} name="city" value={formdata.city} className=' border border-gray-300 px-1.5 py-3.5 w-full rounded ' type="text" placeholder='City' />
        <input required onChange={onchange} name="state" value={formdata.state} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='State' />
          </div>
           <div className='flex  gap-3 mt-4 '>
        <input required onChange={onchange} name="zipcode" value={formdata.zipcode} className=' border border-gray-300 px-1.5 py-3.5 w-full rounded ' type="number" placeholder='Zip code' />
        <input required onChange={onchange} name="country" value={formdata.country} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Country' />
          </div>
        <input required onChange={onchange} name="phone" value={formdata.phone} className=' border border-gray-300 px-1.5 py-3.5 w-full rounded mt-4' type="number" placeholder='Phone Number' />

       

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
                 <p className={`min-w-3.5 h-3.5 border rounded-full cursor-pointer ${method === "stripe" ? 'bg-green-400' : ''}`}></p> <img  className='h-5  mx-3 w-[40px] ' src={assets.stripe} alt="Stripe" />
              </div>
              <div onClick={()=>setmethod("payfast")}   className='flex items-center gap-3 border p-2 py-3 cursor-pointer '>
               <p className={`min-w-3.5 h-3.5 border rounded-full cursor-pointer ${method === "payfast" ? 'bg-green-400' : ''}`}></p>  <img  className='h-5  mx-4' src={assets.plogo} alt="Googlepay" />
              </div>
              <div onClick={()=>setmethod("cod")}   className='flex items-center gap-3 border p-2 py-3 cursor-pointer'>
               <p className={`min-w-3.5 h-3.5 border rounded-full cursor-pointer ${method === "cod" ? 'bg-green-400' : ''}`}></p>  <img  className='h-5  mx-4' src={assets.clogo} alt="Cash On Delievery" />
              </div>
            </div>
            <div className='w-full text-end mt-8'>
              <button type='submit'  className='bg-blue-600 text-white px-16 py-4 rounded  cursor-pointer'>Place Order</button>
            </div>
         
        
      </div>
      </div>
      
    </form>
  )
}

export default Place_order
