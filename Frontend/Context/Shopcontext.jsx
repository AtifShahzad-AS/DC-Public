// import React, { useEffect, useState } from 'react'
// import { createContext } from 'react';
// import { toast } from 'react-toastify';

// // import products from '../assets/products.js';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// export const ShopContext = createContext();
// const ShopContextProvider = (props) => {
//   const currency = 'RS: ';
//   const delievery_fee = 10;
//   //  const [token,settoken]=useState('')
//   const [token, settoken] = useState(
//   localStorage.getItem("token") || ""
// );

//  const backendurl= import.meta.env.VITE_BACKEND_URL

//   const [search, setsearch] = useState("")
// const [userProfile, setUserProfile] = useState(null);
//   const [wishlist,setWishlist] = useState([])
//   const [showsearch, setshowsearch] = useState(false);
//   const [cartitems, setcartitems] = useState({});
//   const [products,setproducts]=useState([]);
//   // const [token,settoken]=useState('')
//   const navigate=useNavigate();


//   // ShopContext.jsx
// useEffect(() => {
//   if (token) {
//     axios
//       .post(
//         backendurl + "/api/wishlist/toggle", // POST-only
//         {}, // empty body just to fetch wishlist
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => {
//         if (res.data.success) {
//           setWishlist(res.data.wishlist);
//         }
//       })
//       .catch((err) => console.log(err));
//   }
// }, [token]);
// //Add to cart
//   const addtocart = async (itemid, size) => {
//   if (!token) {
//     toast.error("Please Login First");
//     navigate('/login');
//     return;
//   }

//   // Find the product to check if it has sizes
//   const product = products.find(p => p._id === itemid);
//   const hasSizes = product?.sizes && product.sizes.length > 0;

//   // Only require size if product actually has sizes
//   if (hasSizes && !size) {
//     toast.error("Please Select Size First");
//     return;
//   }

//   let cartdata = structuredClone(cartitems);
//   // Use 'default' as key for products with no sizes
//   const sizeKey = size || 'default';

//   if (cartdata[itemid]) {
//     if (cartdata[itemid][sizeKey]) {
//       cartdata[itemid][sizeKey] += 1;
//     } else {
//       cartdata[itemid][sizeKey] = 1;
//     }
//   } else {
//     cartdata[itemid] = {};
//     cartdata[itemid][sizeKey] = 1;
//   }

//   setcartitems(cartdata);

//   if (token) {
//     try {
//       await axios.post(backendurl + '/api/cart/add',
//         { itemid, size: sizeKey },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }
// }
//   const getcartcount = ()=> {
//     let totalcount=0;
//     for(const items in cartitems){
//       for(const item in cartitems[items]){
//        try{
//         if(cartitems[items][item]>0){
// totalcount+= cartitems[items][item];
//         }
//        } catch(error){}
//       }
//     }return totalcount;
//   }
//   const updatequantity= async(itemid,size,quantity)=>{
//     let cartdata =structuredClone(cartitems);
//     cartdata[itemid][size]=quantity;
// setcartitems(cartdata);
//  if(token){
//       try{
//       await axios.post(backendurl + '/api/cart/update',{itemid,size,quantity},{ headers: {
//     Authorization: `Bearer ${token}`
//   }})
      
      
//     }
    
   
//     catch(error){
//       console.log(error)
//      toast.error(error.message)
//     }
//      }
//   }
//   const getusercart= async (token)=>{
    
// try{
//      const response=  await axios.post(backendurl + '/api/cart/get',{},{ headers: {
//     Authorization: `Bearer ${token}`
//   }})
//       if(response.data.success){
//         setcartitems(response.data.cartdata)
//       }
//     }
   
//     catch(error){
//       console.log(error)
//      toast.error(error.message)
//     }
//   }
//   const getcartamount=  ()=>{
//     let totalamount=0;
//     for(const items in cartitems){
//       let iteminfo=products.find((product)=>product._id === items)
//       for(const item in cartitems[items]){
//         try{
//           if(cartitems[items][item]> 0)
//           {
//             totalamount+=iteminfo.price * cartitems[items][item];
//           }
//         }
//         catch(error){
//           console.log(error)
//         }
//       }
//     }
//     return totalamount;
//   }
//   const getproductdata= async ()=>{
//     try{
//          const response=await axios.get(backendurl + '/api/product/list')
//          if(response.data.success){
//           setproducts(response.data.products)
//          }
//          else{
//      toast.error(response.data.message)
       
//          }
//     }
//     catch(error){
//       console.log(error)
//       toast.error(error.message)
//     }

//   }
//    useEffect(()=>{
//    getproductdata()
//   },[])

//   useEffect(()=>{
//   if(!token && localStorage.getItem('token'))
//     {settoken(localStorage.getItem('token'))
//    getusercart(localStorage.getItem('token'))}
//   },[])

// useEffect(() => {
//   if (token) {
//     getusercart(token);
//   }
// }, [token]);

  

// // 2. Fetch profile function
// const fetchUserProfile = async () => {
//   try {
//     const response =  await axios.post(
//           backendurl + "/api/user/profile",
//           {},
//            {headers: {
//     Authorization: `Bearer ${token}`,
//   }}
//         )
//     if (response.data.success) {
//       setUserProfile(response.data.user);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// // 3. Update profile function
// const updateUserProfile = async (formData) => {
//   try {
//     const response = await axios.post(
//           backendurl +"/api/user/update-profile", formData, {
//       headers: { 
//         token,
//         "Content-Type": "multipart/form-data"   // important for image upload
//       }
//     });
//     if (response.data.success) {
//       setUserProfile(response.data.user);       // auto-updates navbar image instantly
//       toast.success("Profile updated successfully");
//       return response.data.user;
//     }
//   } catch (error) {
//     toast.error(error.message);
//     console.log(error);
//   }
// };

// // 4. Fetch profile whenever token changes (login/logout)
// useEffect(() => {
//   if (token) {
//     fetchUserProfile();
//   } else {
//     setUserProfile(null);                       // clear on logout
//   }
// }, [token]);




//   const value = {
//     products, currency, delievery_fee, search, setsearch, showsearch, setshowsearch,cartitems,addtocart,getcartcount,
//     updatequantity,getcartamount,getproductdata,navigate,settoken,token,backendurl,setcartitems,wishlist,setWishlist,userProfile,
//   setUserProfile,fetchUserProfile,updateUserProfile,
//   }
//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}

//     </ShopContext.Provider>
//   )
// }
// export default ShopContextProvider;


import React, { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = "RS: ";
  const delievery_fee = 10;
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  /* ================= STATES ================= */

  const [token, settoken] = useState(
    localStorage.getItem("token") || ""
  );

  const [products, setproducts] = useState([]);
  const [cartitems, setcartitems] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);
// Add state
const [siteSettings, setSiteSettings] = useState({
  storeName: 'LuxeHome',
  tagline:   'Premium Home Textiles',
  logo:      ''
})
  // Fetch settings on mount
useEffect(() => {
  const fetchSiteSettings = async () => {
    try {
      const { data } = await axios.post(backendurl + '/api/settings/get')
      if (data.success) {
        setSiteSettings({
          storeName: data.settings.storeName || 'Diamond Collection',
          tagline:   data.settings.tagline   || 'Premium Home Textiles',
          logo:      data.settings.logo      || ''
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  fetchSiteSettings()
}, [])

// Add to context value

  /* ================= LOGOUT ================= */

  const logoutUser = () => {
    localStorage.removeItem("token");
    settoken("");
    setcartitems({});
    setWishlist([]);
    setUserProfile(null);
  };

  /* ================= TOKEN VERIFY ================= */

  const verifyToken = async () => {
    try {
      const res = await axios.post(
        backendurl + "/api/user/profile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setUserProfile(res.data.user);
      } else {
        logoutUser();
      }
    } catch (error) {
      logoutUser();
    }
  };

  /* ================= PRODUCTS ================= */

  const getproductdata = async () => {
    try {
      const response = await axios.get(
        backendurl + "/api/product/list"
      );

      if (response.data.success) {
        setproducts(response.data.products);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getproductdata();
  }, []);

  /* ================= CART ================= */

  const getusercart = async () => {
    try {
      const response = await axios.post(
        backendurl + "/api/cart/get",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setcartitems(response.data.cartdata);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addtocart = async (itemid, size) => {
    if (!token) {
      toast.error("Please Login First");
      navigate("/login");
      return;
    }

    const product = products.find(p => p._id === itemid);
    const hasSizes = product?.sizes?.length > 0;

    if (hasSizes && !size) {
      toast.error("Please Select Size First");
      return;
    }

    const sizeKey = size || "default";
    let cartdata = structuredClone(cartitems);

    if (!cartdata[itemid]) cartdata[itemid] = {};
    cartdata[itemid][sizeKey] =
      (cartdata[itemid][sizeKey] || 0) + 1;

    setcartitems(cartdata);

    try {
      await axios.post(
        backendurl + "/api/cart/add",
        { itemid, size: sizeKey },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updatequantity = async (itemid, size, quantity) => {
    let cartdata = structuredClone(cartitems);
    cartdata[itemid][size] = quantity;
    setcartitems(cartdata);

    try {
      await axios.post(
        backendurl + "/api/cart/update",
        { itemid, size, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getcartcount = () => {
    let total = 0;
    for (const item in cartitems) {
      for (const size in cartitems[item]) {
        total += cartitems[item][size];
      }
    }
    return total;
  };

  const getcartamount = () => {
    let total = 0;

    for (const item in cartitems) {
      const product = products.find(p => p._id === item);

      for (const size in cartitems[item]) {
        total += product.price * cartitems[item][size];
      }
    }

    return total;
  };

  /* ================= WISHLIST ================= */

  const fetchWishlist = async () => {
    try {
      const res = await axios.post(
        backendurl + "/api/wishlist/toggle",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setWishlist(res.data.wishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= PROFILE UPDATE ================= */

  const updateUserProfile = async (formData) => {
    try {
      const response = await axios.post(
        backendurl + "/api/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setUserProfile(response.data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ================= AUTH EFFECT ================= */

  useEffect(() => {
    if (token) {
      verifyToken();
      getusercart();
      fetchWishlist();
    }
  }, [token]);

  /* ================= CONTEXT VALUE ================= */

  const value = {
    products,
    currency,
    delievery_fee,

    search,
    setsearch,
    showsearch,
    setshowsearch,

    cartitems,
    addtocart,
    updatequantity,
    getcartcount,
    getcartamount,
    setcartitems,

    wishlist,
    setWishlist,

    token,
    settoken,
    logoutUser,

    userProfile,
    setUserProfile,
    updateUserProfile,

    backendurl,
    navigate,
    siteSettings,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;