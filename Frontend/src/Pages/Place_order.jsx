// import React, { useContext, useState } from 'react'
// import Title from '../Components/Title'
// import Carttotal from '../Components/Carttotal'
// import { assets } from '../assets/assets'
// import { ShopContext } from '../../Context/Shopcontext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Place_order = () => {
//   const [method,setmethod]=useState('cod');
  
//   const {navigate,backendurl,token,cartitems,setcartitems,getcartamount,delievery_fee,products}=useContext(ShopContext);

//   const [formdata,setformdata]=useState({
//     firstname:"",
//     lastname:"",  
//     email:"",
//     street:"",
//     city:"",
//     state:"",
//     country:"",
//     zipcode:"",
//     phone:""

//   })
//   const onchange= (event)=>{
//     const name= event.target.name;
//     const value=event.target.value;
//     setformdata(data=> ({...data,[name]:value}))
//   }
//   const onsubmit= async (event)=>{
//    event.preventDefault()
//    try {
// //     let orderitems=[]
// //     for(const items in cartitems){
// //       for(const item in cartitems[items]){
// //         if(cartitems[items][item] > 0){
// //           const iteminfo= structuredClone(products.find(product => product._id===items))
// //           if(iteminfo)
// // {
// //   iteminfo.size=item
// //   iteminfo.quantity= cartitems[items][item]
// //   orderitems.push(iteminfo)
// // }        }
// //       }
// //     }
// // ── NEW ──
// let orderitems = []
// for (const items in cartitems) {
//   for (const item in cartitems[items]) {
//     if (cartitems[items][item] > 0) {
//       const product = products.find(product => product._id === items)
//       if (product) {
//         orderitems.push({
//           productId: product._id,   // ← explicit id for stock deduction
//           name:      product.name,
//           price:     product.price,
//           image:     product.image,
//           category:  product.category,
//           size:      item,
//           quantity:  cartitems[items][item],
//         })
//       }
//     }
//   }
// }
//    let orderdata= {
//     address:formdata,
//     items:orderitems,
//     amount:getcartamount() + delievery_fee
   
//    }
//    switch(method){
    
//     //api for cod
//     case "cod":
//   const response= await axios.post(backendurl + '/api/order/place',orderdata,{
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// })
//   if(response.data.success){
//     setcartitems({})
//     navigate('/orders')
//   }
//   else{
//     toast.error(response.data.message)
//   }
//       break;

//        case "stripe":
        
//   const responsestripe= await axios.post(backendurl + '/api/order/stripe',orderdata,{
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// })
//   // console.log(responsestripe.data)
//   if(responsestripe.data.success){
//     const {session_url}=responsestripe.data
//     window.location.replace(session_url)
//     setcartitems({})
//     // navigate('/orders')
//   }
//   else{
//     toast.error(responsestripe.data.message)
//   }
//       break;

 

    
//     default:
//       break;
//    }
//    } catch (error) {
//     console.log(error);
    
//   }
//   }
//   return (
//     <form onSubmit={onsubmit} className='px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
//       <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
//       {/* left side */}
//       <div className='flex flex-col w-full pt-5 sm:max-w-[480px]'>
//         <div className='text-xl sm:text-2xl my-3'>
          
//             <Title text1={'Delievery' } text2={"Information"}/>
//           </div>
//           <div className='flex  gap-3 '>
//         <input required onChange={onchange} name="firstname" value={formdata.firstname} className=' border border-gray-300 px-1.5 py-3.5 w-full rounded ' type="text" placeholder='First Name' />
//         <input required onChange={onchange} name="lastname" value={formdata.lastname} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Last Name' />
//           </div>
//             <input required onChange={onchange} name="email" value={formdata.email} className='border border-gray-300 px-1.5 py-3.5 w-full rounded mt-4' type="Email" placeholder='Email Address' />
//             <input required onChange={onchange} name="street" value={formdata.street} className='border border-gray-300 px-1.5 py-3.5 w-full rounded mt-4' type="Text" placeholder='Street' />
//             <div className='flex  gap-3  mt-4'>
//         <input required onChange={onchange} name="city" value={formdata.city} className=' border border-gray-300 px-1.5 py-3.5 w-full rounded ' type="text" placeholder='City' />
//         <input required onChange={onchange} name="state" value={formdata.state} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='State' />
//           </div>
//            <div className='flex  gap-3 mt-4 '>
//         <input required onChange={onchange} name="zipcode" value={formdata.zipcode} className=' border border-gray-300 px-1.5 py-3.5 w-full rounded ' type="number" placeholder='Zip code' />
//         <input required onChange={onchange} name="country" value={formdata.country} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Country' />
//           </div>
//         <input required onChange={onchange} name="phone" value={formdata.phone} className=' border border-gray-300 px-1.5 py-3.5 w-full rounded mt-4' type="number" placeholder='Phone Number' />

       

//       </div>
//       {/* right side */}
//       <div className='mt-8'>
//         <div className='mt-8 min-w-80'>
//           <Carttotal/>
//           </div>
//           <div className='mt-12'>
//               <Title text1={"PAYMENT "} text2={"METHOD"}/>
//  </div>
//               {/* payment slection */}
//             <div  className='flex flex-col lg:flex-row gap-3'>
//               <div onClick={()=>setmethod("stripe")} className='flex items-center gap-3 border p-2 py-3 cursor-pointer '>
//                  <p className={`min-w-3.5 h-3.5 border rounded-full cursor-pointer ${method === "stripe" ? 'bg-green-400' : ''}`}></p> <img  className='h-5  mx-3 w-[40px] ' src={assets.stripe} alt="Stripe" />
//               </div>
             
//               <div onClick={()=>setmethod("cod")}   className='flex items-center gap-3 border p-2 py-3 cursor-pointer'>
//                <p className={`min-w-3.5 h-3.5 border rounded-full cursor-pointer ${method === "cod" ? 'bg-green-400' : ''}`}></p>  <img  className='h-5  mx-4' src={assets.clogo} alt="Cash On Delievery" />
//               </div>
//             </div>
//             <div className='w-full text-end mt-8'>
//               <button type='submit'  className='bg-blue-600 text-white px-16 py-4 rounded  cursor-pointer'>Place Order</button>
//             </div>
         
        
//       </div>
//       </div>
      
//     </form>
//   )
// }

// export default Place_order


import React, { useContext, useState, useEffect } from 'react'
import Title from '../Components/Title'
import Carttotal from '../Components/Carttotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../../Context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Place_order = () => {
  const [method, setmethod]                   = useState('cod')
  const [enabledPayments, setEnabledPayments] = useState({ cod: true, stripe: true })
  const [loadingSettings, setLoadingSettings] = useState(true)
  const [placing, setPlacing]                 = useState(false)

  const {
    navigate, backendurl, token,
    cartitems, setcartitems,
    getcartamount, getDeliveryFee,   // ← from context, not hardcoded
    products
  } = useContext(ShopContext)

  const [formdata, setformdata] = useState({
    firstname: "", lastname: "", email: "",
    street: "", city: "", state: "",
    country: "", zipcode: "", phone: ""
  })

  // ── Build order items ──
  const buildOrderItems = () => {
    let orderitems = []
    for (const items in cartitems) {
      for (const item in cartitems[items]) {
        if (cartitems[items][item] > 0) {
          const product = products.find(p => p._id === items)
          if (product) {
            // Use sale price if on sale
            const price = product.onSale && product.salePrice > 0
              ? product.salePrice
              : product.price
            orderitems.push({
              productId: product._id,
              name:      product.name,
              price,                    // ← correct price (sale or regular)
              image:     product.image,
              category:  product.category,
              size:      item,
              quantity:  cartitems[items][item],
            })
          }
        }
      }
    }
    return orderitems
  }

  // ── Fetch payment settings ──
  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        const { data } = await axios.post(backendurl + '/api/settings/get')
        if (data.success) {
          const payments = data.settings.payments
          setEnabledPayments(payments)
          if (!payments.cod && payments.stripe) setmethod('stripe')
          else if (payments.cod) setmethod('cod')
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoadingSettings(false)
      }
    }
    fetchPaymentSettings()
  }, [backendurl])

  const onchange = (event) => {
    const { name, value } = event.target
    setformdata(data => ({ ...data, [name]: value }))
  }

  const onsubmit = async (event) => {
    event.preventDefault()

    const orderitems = buildOrderItems()
    if (orderitems.length === 0) {
      toast.error("Your cart is empty")
      navigate('/cart')
      return
    }
    if (!token) {
      toast.error("Please login to place an order")
      navigate('/login')
      return
    }

    setPlacing(true)

    // ── Calculate amount using context getDeliveryFee ──
    const subtotal = getcartamount()
    const fee      = getDeliveryFee(subtotal)    // 0 if free delivery applies
    const amount   = subtotal + fee

    const orderdata = {
      address: formdata,
      items:   orderitems,
      amount                                     // correct total
    }

    try {
      switch (method) {

        case "cod": {
          const response = await axios.post(
            backendurl + '/api/order/place',
            orderdata,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          if (response.data.success) {
            setcartitems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break
        }

        case "stripe": {
          const responsestripe = await axios.post(
            backendurl + '/api/order/stripe',
            orderdata,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          if (responsestripe.data.success) {
            const { session_url } = responsestripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responsestripe.data.message)
          }
          break
        }

        default:
          break
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setPlacing(false)
    }
  }

  const inputClass = "border border-gray-300 px-3 py-3.5 w-full rounded-lg text-sm outline-none focus:border-blue-400 transition-colors"

  return (
    <form onSubmit={onsubmit} className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
      <div className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t'>

        {/* ── Left — Delivery Info ── */}
        <div className='flex flex-col w-full pt-5 sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'Delivery'} text2={"Information"} />
          </div>
          <div className='flex gap-3'>
            <input required onChange={onchange} name="firstname" value={formdata.firstname}
              className={inputClass} type="text" placeholder='First Name' />
            <input required onChange={onchange} name="lastname" value={formdata.lastname}
              className={inputClass} type="text" placeholder='Last Name' />
          </div>
          <input required onChange={onchange} name="email" value={formdata.email}
            className={inputClass + ' mt-3'} type="email" placeholder='Email Address' />
          <input required onChange={onchange} name="street" value={formdata.street}
            className={inputClass + ' mt-3'} type="text" placeholder='Street Address' />
          <div className='flex gap-3 mt-3'>
            <input required onChange={onchange} name="city" value={formdata.city}
              className={inputClass} type="text" placeholder='City' />
            <input required onChange={onchange} name="state" value={formdata.state}
              className={inputClass} type="text" placeholder='State' />
          </div>
          <div className='flex gap-3 mt-3'>
            <input required onChange={onchange} name="zipcode" value={formdata.zipcode}
              className={inputClass} type="number" placeholder='Zip Code' />
            <input required onChange={onchange} name="country" value={formdata.country}
              className={inputClass} type="text" placeholder='Country' />
          </div>
          <input required onChange={onchange} name="phone" value={formdata.phone}
            className={inputClass + ' mt-3'} type="number" placeholder='Phone Number' />
        </div>

        {/* ── Right — Cart Total + Payment ── */}
        <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <Carttotal />
          </div>

          <div className='mt-10'>
            <div className='text-xl sm:text-2xl mb-4'>
              <Title text1={"Payment"} text2={"Method"} />
            </div>

            {loadingSettings ? (
              <div className="flex items-center gap-2 py-4">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-400">Loading payment options...</span>
              </div>
            ) : (
              <div className='flex flex-col sm:flex-row gap-3'>

                {enabledPayments.stripe && (
                  <div
                    onClick={() => setmethod("stripe")}
                    className={`flex items-center gap-3 border-2 p-3 px-4 cursor-pointer rounded-xl transition-all duration-200
                      ${method === "stripe" ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors
                      ${method === "stripe" ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                      {method === "stripe" && <div className="w-full h-full rounded-full bg-white scale-50" />}
                    </div>
                    <img className='h-5 w-[50px] object-contain' src={assets.stripe} alt="Stripe" />
                    <span className="text-xs text-gray-600 font-medium">Card Payment</span>
                  </div>
                )}

                {enabledPayments.cod && (
                  <div
                    onClick={() => setmethod("cod")}
                    className={`flex items-center gap-3 border-2 p-3 px-4 cursor-pointer rounded-xl transition-all duration-200
                      ${method === "cod" ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors
                      ${method === "cod" ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                      {method === "cod" && <div className="w-full h-full rounded-full bg-white scale-50" />}
                    </div>
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="2" y="6" width="20" height="12" rx="2"/>
                      <path d="M12 12h.01M17 12h.01M7 12h.01"/>
                    </svg>
                    <span className="text-xs text-gray-600 font-medium">Cash on Delivery</span>
                  </div>
                )}

                {!enabledPayments.cod && !enabledPayments.stripe && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    No payment methods are currently available. Please contact support.
                  </div>
                )}
              </div>
            )}

            <div className='w-full text-end mt-8'>
              <button
                type='submit'
                disabled={placing || loadingSettings || (!enabledPayments.cod && !enabledPayments.stripe)}
                className={`px-16 py-4 rounded-xl text-white font-semibold text-sm transition-all duration-200
                  ${placing || loadingSettings || (!enabledPayments.cod && !enabledPayments.stripe)
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer active:scale-95'
                  }`}
              >
                {placing
                  ? <span className="flex items-center gap-2 justify-center">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Placing Order...
                    </span>
                  : 'Place Order'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Place_order