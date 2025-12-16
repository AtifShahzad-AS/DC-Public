import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { backendurl } from '../App'
const Add = ({token}) => {
  const [image1,setimage1]= useState(false);
  const [image2,setimage2]= useState(false);
  const [image3,setimage3]= useState(false);
  const [image4,setimage4]= useState(false);

  const [name,setname]=useState('');
  const [desc,setdesc]=useState('');
  const [price,setprice]=useState('');
  const [category,setcategory]=useState('bedsheets');
  const [subcategory,setsubcategory]=useState('winter');
  const [bestseller,setbestseller]=useState(false);
  const [size,setsize]=useState([])


  const onsubmithandler= async (e)=>{
   e.preventDefault();
   try{
    const formdata= new FormData();
    formdata.append("name",name)
    formdata.append("description",desc)
    formdata.append("price",price)
    formdata.append("category",category)
    formdata.append("subcategory",subcategory)
    formdata.append("sizes",JSON.stringify(size))
    formdata.append("bestseller",bestseller)


    image1 && formdata.append("image1",image1)
    image2 && formdata.append("image2",image2)
    image3 && formdata.append("image3",image3)
    image4 && formdata.append("image4",image4)

    const response= await axios.post(backendurl +'/api/product/add',formdata,{headers:{token}})
    console.log(response.data)
    if(response.data.success){
      toast.success(response.data.message)
      setname('')
      setdesc('')
      setimage1(false)
      setimage2(false)
      setimage3(false)
      setimage4(false)
      setprice('')
    }
    else{
      toast.error(response.data.message)
    }
   
   }
   catch(error){
    console.log(error)
   }
  }

  return (
    <form onSubmit={onsubmithandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img className='w-20' src={!image1 ? assets.uploadarea : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setimage1(e.target.files[0])} type="file" id='image1' hidden  />
          </label>
           <label htmlFor='image2'>
            <img className='w-20' src={!image2 ? assets.uploadarea : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setimage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
           <label htmlFor='image3'>
            <img className='w-20' src={!image3 ? assets.uploadarea : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setimage3(e.target.files[0])} type="file" id='image3' hidden />
          </label> 
          <label  htmlFor='image4'>
            <img  className='w-20' src={!image4 ? assets.uploadarea : URL.createObjectURL(image4)} alt="" />
            <input  onChange={(e)=>setimage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2' >Product Data</p>
        <input onChange={(e)=>setname(e.target.value)} value={name} type="text " placeholder='Type Here' required  className='w-full border max-w-[500px] px-3 py-2'/>
      </div>
      <div className='w-full'>
        <p className='mb-2' >Product Description</p>
        <textarea onChange={(e)=>setdesc(e.target.value)} value={desc} type="text " placeholder='Write Content Here....' required  className='w-full border max-w-[500px] px-3 py-2'/>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
      <div>
        <p className='mb-2'>Product Catagery</p>
        <select onChange={(e)=>setcategory(e.target.value)} value={category} className='w-full px-3 py-2'>
          <option value="Bedsheets">BedSheet</option>
          <option  value="Pillows">Pillow</option>
          <option value="Curtains">Curtain</option>
          <option value="Quilts">Quilt</option>
          <option value="Blankets">Blanket</option>
        </select>
      </div>
      {/* <div>
        <p  className='mb-2'>Sub Catagery</p>
        <select onChange={(e)=>setsubcategory(e.target.value)} value={subcategory} className='w-full px-3 py-2'>
          <option value="Winter">Winter</option>
          <option value="Blankets">Blankets</option>
          <option  value="Pillows">Pillows</option>
        </select>
      </div> */}
      <div>
        <p className='mb-2'>Product Price</p>
        <input onChange={(e)=>setprice(e.target.value)} value={price} className='px-3 py-2 w-full' type="number" placeholder='25' />
      </div>
    </div>
   
   <div>
  <p className="mb-2">Product Sizes</p>
  <div className="flex gap-3">
    {["Single", "Double", "King Size"].map((sz) => (
      <div
        key={sz}
        onClick={() =>
          setsize((prev) =>
            prev.includes(sz)
              ? prev.filter((item) => item !== sz)
              : [...prev, sz]
          )
        }
      >
        <p
          className={`${
            size.includes(sz) ? "bg-blue-300 text-white" : "bg-slate-200"
          } px-3 py-1 rounded cursor-pointer transition-colors duration-300`}
        >
          {sz}
        </p>
      </div>
    ))}
  </div>
</div>

{/* <div className='flex gap-2 mt-2'>
  <input
    type="checkbox"
    id="bestseller"
    checked={bestseller}
    onChange={(e) => setbestseller(e.target.checked)}
  />
  <label className='cursor-pointer' htmlFor="bestseller">
    Add to bestseller
  </label>
</div> */}

    <div className='flex gap-2 mt-2'>
      <input onChange={()=> setbestseller(prev=> !prev)} checked={bestseller} type="checkbox" id='bestseller'/> 
      <label className='cursor-pointer' htmlFor="bestseller" > Add to bestseller</label>
    </div>
    <button type='submit' className='px-5 py-2 mt-5 bg-black text-white text-2xl rounded-lg cursor-pointer '>Add</button>
    </form>
  )
}

export default Add
