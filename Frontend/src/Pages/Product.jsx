import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../Context/Shopcontext';
import { assets } from '../assets/assets';
import Relatedproduct from '../Components/Relatedproduct';
import { backendurl } from '../../../Admin/src/App';
import axios from "axios"
const Product = () => {
  const { productid } = useParams();
  const { products,currency,addtocart } = useContext(ShopContext);
  const [productdata, setproductdata] = useState(false);
  const [image, setimage] = useState("");
  const [size,setsize]=useState('');

  const fetchproductdata = async () => {
  try {
    const response = await axios.post(backendurl + "/api/product/single", {
      productid
    });

    if (response.data.success) {
      setproductdata(response.data.product);
      setimage(response.data.product.image[0]);
      //  console.log("PRODUCT DATA:", response.data.product);  // 
    }
  } catch (error) {
    console.log(error);
  }
};



  

  useEffect(() => {
    fetchproductdata();
  }, [productid])
  return productdata ? (
    <div className='px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw] pt-20'>
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* productdata */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* productimages */}
     <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
         <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">

  {productdata.image.map((item, index) => (
          <img onClick={()=>setimage(item)}
            src={item}
            key={index}
            className="w-[24%] sm:w-full sm:mb-3  shrink-0 cursor-pointer"
            alt=""
          />
        ))}
</div >
<div className='w-full sm:w-[80%]'>
<img className='w-full h-auto' src={image} alt="" />
</div>

        </div>
        {/* product info */}
       <div className="flex-1 ">
        <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <img src={assets.star_icon} alt="" className="w3 5" />
          <img src={assets.star_icon} alt="" className="w3 5" />
          <img src={assets.star_icon} alt="" className="w3 5" />
          <img src={assets.star_icon} alt="" className="w3 5" />
          <img src={assets.star_dull_icon} alt="" className="w3 5" />
          <p className='pl-2'>{122}</p>
        </div>
<p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
<p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
<div className='flex flex-col gap-4 my-8'>
  <p className='font-bold'>Select size</p>
  <div className='flex gap-2'>
    {productdata?.sizes?.map((item,index)=>{
return   <button onClick={()=>(setsize(item))} className={`border py-2 px-4   bg-gray-100 ${item===size ? 'border-orange-500' : ''} `} key={index}> {item}</button>
  })}</div>
</div>
<button onClick={()=>addtocart(productdata._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
<hr className='mt-8 sm:w-4/5'/>
<div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
  <p>100% rignal product</p>
  <p>Cash on delievery is available in this product </p>
  <p>Easy return and exchange policy</p>
</div>
       </div>
    </div>
    {/* description review */}
    <div className='mt-20'>
      <div className="flex">
        <b className='border px-5 py-3 text-sm'>Description</b>
        <b className='border px-5 py-3 text-sm'>Reviews(122)</b>

      </div>
      <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
        <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur, possimus..</p>
        <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit enim in itaque placeat quos nostrum ipsa necessitatibus assumenda tempora illo. adiploeisicing.</p>
      </div>
    </div>
    {/* display related product */}
    <Relatedproduct catagery={productdata.catagery } subcatagery={productdata.subcatagery}/>
    </div>
    </div>
  ) : <div className='opacity-0'></div>

}


export default Product

 