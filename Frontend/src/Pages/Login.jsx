import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ShopContext } from '../../Context/Shopcontext';
import axios from 'axios'


const Login = () => {
  const [currentstate,setcurrentstate]=useState("Login")
 const {token,settoken,backendurl,navigate}=useContext(ShopContext)
  const [name,setname]=useState('')
  const [password,setpassword]=useState('')
  const [email,setemail]=useState('')


 
  const onsubmithandler= async (e)=>{
e.preventDefault();
  try{
       if(currentstate === 'Signup'){
      const response= await axios.post(backendurl + '/api/user/register', {name,email,password})
    //  console.log(response)
      if(response.data.success){
        settoken(response.data.token)
        localStorage.setItem('token',response.data.token)
      }
      else{
        toast.error(response.data.message)
      }
       }
       else{
         const response= await axios.post(backendurl + '/api/user/login', {email,password})
    //  console.log(response)
      if(response.data.success){
        settoken(response.data.token)
        localStorage.setItem('token',response.data.token)
      }
       else{
        toast.error(response.data.message)
      }

       }
     

        }catch(error){
     console.log(error)
          toast.error(error.message);

        }

  }
  useEffect(()=>{
if(token){
  navigate('/')
}
  },[token])
  
  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      settoken(localStorage.getItem('token'))
    }
   
  },[])
  return (
    <div className="h-screen w-full  bg-[linear-gradient(102deg,#dad4ec_0%,#f3e7e9_80.43%)]      flex justify-center items-center  ">
      <div className='  w-full'>
    <form  onSubmit={onsubmithandler} className='backdrop-blur-xl bg-[#fcf7f7] flex flex-col mt-34 w-[90%] sm:max-w-[30%] m-auto   p-4 rounded-2xl  hover:shadow-[0_0_25px_6px_rgba(56,55,56,0.8)] transition-all duration-300 text-gray-600'>
      <div className='inline-flex items-center justify-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl text-black font-bold'>{currentstate}</p>
        <hr  className='border-none h-[4.5px] w-8 bg-gray-800'/>
      </div>
    {currentstate === "Login" ? '' : <input onChange={(e)=>setname(e.target.value)} value={name} required type="text" className='w-full text-black border rounded-lg  border-gray-400 px-3 py-3 mt-4 outline-none' placeholder='Username' />}  
      <input onChange={(e)=>setemail(e.target.value)} value={email}  required type="email" className='w-full text-black border border-gray-400 rounded-lg  px-3 py-3 mt-4 outline-none' placeholder='Email' />
      <input onChange={(e)=>setpassword(e.target.value)} value={password} required type="Password" className='w-full text-black border rounded-lg border-gray-400 px-3 py-3 mt-4 outline-none' placeholder='Password' />
   <div className='flex justify-between text-md mt-[8px]'>
    <p className='cursor-pointer text-black'>Forget Password?</p>
    { currentstate === "Login" ? 
     <p onClick={()=>setcurrentstate('Signup')} className='cursor-pointer text-black'>Don't have Account</p>
    
  :
  <p onClick={()=>setcurrentstate('Login')} className='cursor-pointer text-black  '>Login</p>
  }
   </div>
   <button className=' cursor-pointer shadow-[ 5px_5px_10px_ #b8bcc2, -5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_ #011f4b,inset_-5px_-5px_10px_#3f6aa9] 
   border border-gray-400 mt-10 text-black  font-bold w-full px-8 py-4 rounded-md transition-colors ease-in-out duration-700  bg-gradient-to-b from-violet-00 to-gray-300   '>{currentstate === "Login" ? 'Sign In' : 'Sign Up'}</button>
    </form>
    </div>
    </div>
  )
}

export default Login
