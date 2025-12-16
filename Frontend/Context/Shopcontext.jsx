import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import { toast } from 'react-toastify';

// import products from '../assets/products.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = 'RS: ';
  const delievery_fee = 10;
   const [token,settoken]=useState('')
 const backendurl= import.meta.env.VITE_BACKEND_URL

  const [search, setsearch] = useState("")
  const [showsearch, setshowsearch] = useState(false);
  const [cartitems, setcartitems] = useState({});
  const [products,setproducts]=useState([]);
  // const [token,settoken]=useState('')
  const navigate=useNavigate();


  const addtocart = async (itemid, size) => {
 if (!token) {
    toast.error("Please Login First");
    navigate('/login');
    return;
  }
    let cartdata = structuredClone(cartitems);
    if(!size){
      toast.error("Please Slect Size First");
      return;
    }
    if (cartdata[itemid]) {
      if (cartdata[itemid][size]) {
        cartdata[itemid][size] += 1;
      }
      else {
       
        cartdata[itemid][size] = 1;

      }
    }
    else {
       cartdata[itemid] = {};
      cartdata[itemid][size] = 1;
    }
    setcartitems(cartdata);
    if(token){
      try{
      await axios.post(backendurl + '/api/cart/add',{itemid,size},{headers:{token}})
      
    }
   
    catch(error){
      console.log(error)
     toast.error(error.message)
    }
     }
  }
  
  const getcartcount = ()=> {
    let totalcount=0;
    for(const items in cartitems){
      for(const item in cartitems[items]){
       try{
        if(cartitems[items][item]>0){
totalcount+= cartitems[items][item];
        }
       } catch(error){}
      }
    }return totalcount;
  }
  const updatequantity= async(itemid,size,quantity)=>{
    let cartdata =structuredClone(cartitems);
    cartdata[itemid][size]=quantity;
setcartitems(cartdata);
 if(token){
      try{
      await axios.post(backendurl + '/api/cart/update',{itemid,size,quantity},{headers:{token}})
      
      
    }
    
   
    catch(error){
      console.log(error)
     toast.error(error.message)
    }
     }
  }
  const getusercart= async (token)=>{
    
try{
     const response=  await axios.post(backendurl + '/api/cart/get',{},{headers:{token}})
      if(response.data.success){
        setcartitems(response.data.cartdata)
      }
    }
   
    catch(error){
      console.log(error)
     toast.error(error.message)
    }
  }
  const getcartamount=  ()=>{
    let totalamount=0;
    for(const items in cartitems){
      let iteminfo=products.find((product)=>product._id === items)
      for(const item in cartitems[items]){
        try{
          if(cartitems[items][item]> 0)
          {
            totalamount+=iteminfo.price * cartitems[items][item];
          }
        }
        catch(error){
          console.log(error)
        }
      }
    }
    return totalamount;
  }
  const getproductdata= async ()=>{
    try{
         const response=await axios.get(backendurl + '/api/product/list')
         if(response.data.success){
          setproducts(response.data.products)
         }
         else{
     toast.error(response.data.message)
       
         }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }

  }
   useEffect(()=>{
   getproductdata()
  },[])

  useEffect(()=>{
  if(!token && localStorage.getItem('token'))
    {settoken(localStorage.getItem('token'))
   getusercart(localStorage.getItem('token'))}
  },[])



  // useEffect(()=>{
  // //  console.log(cartitems)
  // },[cartitems])

  const value = {
    products, currency, delievery_fee, search, setsearch, showsearch, setshowsearch,cartitems,addtocart,getcartcount,
    updatequantity,getcartamount,getproductdata,navigate,settoken,token,backendurl,setcartitems
  }
  return (
    <ShopContext.Provider value={value}>
      {props.children}

    </ShopContext.Provider>
  )
}
export default ShopContextProvider;