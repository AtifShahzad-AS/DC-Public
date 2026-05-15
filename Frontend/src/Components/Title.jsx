import React from 'react'
 
const Title = ({text1,text2}) => {
  return (
    <div>
      {/* <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-gray-500 '>{text1}<span className='text-gray-700 font-medium'>{text2}</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
   
      </div> */}
 <div className='inline-flex gap-2 items-center mb-3'>
      <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-snug text-center sm:text-left">
  {text1}
  <span className="text-blue-600 font-semibold ml-1 font-serif">
    {text2}
  </span>
</p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
   
      </div>
    </div>
  )
}

export default Title
