import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import { toast } from 'react-toastify';

import products from '../src/assets/products.js';
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
  // const [token,settoken]=useState('')
  const navigate=useNavigate();


  const addtocart = async (itemid, size) => {

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
        catch(error){}
      }
    }
    return totalamount;
  }


  useEffect(()=>{
   console.log(cartitems)
  },[cartitems])

  const value = {
    products, currency, delievery_fee, search, setsearch, showsearch, setshowsearch,cartitems,addtocart,getcartcount,
    updatequantity,getcartamount,navigate,settoken,token,backendurl
  }
  return (
    <ShopContext.Provider value={value}>
      {props.children}

    </ShopContext.Provider>
  )
}
export default ShopContextProvider;