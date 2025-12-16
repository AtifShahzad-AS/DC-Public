import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import { assets } from '../assets/assets';
import Title from '../Components/Title';
import Productitems from '../Components/Productitems';
import { dimensionValueTypes } from 'framer-motion';
// import toast from "react-toastify"

const Collection = () => {
//     useEffect(() => {
//     toast.info("Welcome to Collection Page 📦");
//   }, []); 
    const {products,search,showsearch,setshowsearch} =useContext(ShopContext);
    const [Showfilter,setshowfilter]=useState(false)
    const [filterproducts,setfilterproducts]=useState([]);
    const[category,setcategory]=useState([]);
    const[subcategory,setsubcategory]=useState([]);
const [sorttype,setsorttype]=useState("relevent");

    const togglecategory=(e)=>{
    if(category.includes(e.target.value)){
        setcategory(prev=> prev.filter(item=> item !== e.target.value))
    }
    else{
        setcategory(prev=> [...prev ,e.target.value])
    }
    }

    const togglesubcategory=(e)=>{
    if(subcategory.includes(e.target.value)){
        setsubcategory(prev=> prev.filter(item=> item !== e.target.value))
    }
    else{
        setsubcategory(prev=> [...prev ,e.target.value])
    }
    }


    const applyfilter=()=>{
        let productcopy=products.slice();

if(search && showsearch ){
    productcopy=productcopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
}

        if(category.length >0){
            productcopy=productcopy.filter(item=> category.includes(item.category))
        }
        if(subcategory.length >0){
            productcopy=productcopy.filter(item=> subcategory.includes(item.subcategory))
        }
        setfilterproducts(productcopy);
    }

     useEffect(()=>{
        applyfilter();
    },[category,subcategory,search,showsearch,products])
    
    const sortproduct=()=>{
        let fpcopy=filterproducts.slice();
        switch(sorttype){
            case "low-high":
              setfilterproducts(fpcopy.sort((a,b)=>(a.price - b.price)));
              break;  
              case "high-low":
              setfilterproducts(fpcopy.sort((a,b)=>(b.price - a.price)));
              break;  
              default: 
              applyfilter();
              break;  
        }
    }
    useEffect(()=>{
    sortproduct();
    },[sorttype])
    // return(
    //   <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] sm:pt-20  '>

    //     </div>
    // )
  return (
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] sm:pt-20 sm '>
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 '>
{/* filter option */}
   <div className='min-w-60'>
    <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
    <img className={`h-3 sm:hidden ${Showfilter ? 'rotate-90' : ''} `} src={assets.dropdown} alt="" />

    </p>
    {/* catagetory filter */}
    <div className={`border border-gray-300 pl-5 py-3 my-5 ${Showfilter ?'' :'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>Catageries</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'bedsheets'} onChange={togglecategory} />Bedsheets
            </p>
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Pillows'} onChange={togglecategory}/>Pillows
            </p>
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Curtains'} onChange={togglecategory}/>Curtains
            </p>
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Quilt'} onChange={togglecategory}/>Quilt
            </p>
        </div>
    </div>
    {/* sub category */}
    {/* <div className={`border border-gray-300 pl-5 py-3 mt-6 ${Showfilter ?'' :'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>Type</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'kid'} onChange={togglesubcategory}/>kid
            </p>
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'bottomwear'} onChange={togglesubcategory}/>Fancy
            </p >
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'charmy'} onChange={togglesubcategory}/>Charmy
            </p>
             <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'awesom'} onChange={togglesubcategory}/>Awesom
            </p>
        </div>
    </div> */}
    </div> 
    <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
           <Title text1={"All"} text2={"Collection"}/> 
           {/* product sort */}
                   <select onChange={(e)=>setsorttype(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                    <option value="relevent">Sort by relevent</option>
                    <option value="low-high">Sort by low tp high</option>
                    <option value="high-low">Sort by high to low</option>
                   </select>
            </div>
            {/* map product */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 gap-y-6'>
                {
                    filterproducts.map((item,index)=>(
                       <Productitems key={index} name={item.name} id={item._id} price={item.price}         image={Array.isArray(item.image) ? item.image[0] : item.image }
/>
                    ))
                }
            </div>

            </div>  
    </div>
    </div>
  )

}

export default Collection
