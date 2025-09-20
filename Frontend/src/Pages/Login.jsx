import React, { useState } from 'react'

const Login = () => {
  const [currentstate,setcurrentstate]=useState("login")
  const onsubmithandler= async (event)=>{
event.preventDefault();
  }
  return (
    <form onSubmit={onsubmithandler} className='flex flex-col mt-34 w-[90%] sm:max-w-96 m-auto border p-4 rounded-2xl bg-gradient-to-r from-violet-400 to-cyan-200 text-gray-600'>
      <div className='inline-flex items-center justify-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentstate}</p>
        <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
    {currentstate === "login" ? '' : <input required type="text" className='w-full border border-gray-800 px-3 py-2 mt-2' placeholder='Name' />}  
      <input required type="text" className='w-full border border-gray-800 px-3 py-2 mt-2' placeholder='Email' />
      <input required type="Password" className='w-full border border-gray-800 px-3 py-2 mt-2' placeholder='Password' />
   <div className='flex justify-between text-sm mt-[8px]'>
    <p className='cursor-pointer'>Forget Password?</p>
    { currentstate === "login" ? 
     <p onClick={()=>setcurrentstate('signup')} className='cursor-pointer'>Create Account</p>

  :
  <p onClick={()=>setcurrentstate('login')} className='cursor-pointer'>Login</p>
    }
   </div>
   <button className='border border-gray-500 text-white bg-blue-600 w-full px-8 py-4 rounded-md mt-2'>{currentstate === "login" ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
