import React from 'react'
import Header from '../Components/Header'
import Latestcollection from '../Components/Latestcollection'
import Footer from '../Components/Footer'
import Bestseller from '../Components/Bestseller'
import Ourpolicy from '../Components/Ourpolicy'
import Slider from '../Components/Slider'



const Home = () => {
  return (
    <>
{/* <div className="w-full h-screen  bg-[url('/bg1.jpg')] bg-cover bg-center"> */}
   {/* <Slider/> */}
   <Header/>
        <div className='px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw] h-full'>
  
      
     
      <Latestcollection/>
      <Bestseller/>
      <Ourpolicy/>
    </div>
     {/* </div> */}
    </>
  )
}

export default Home



// const Home = () => {
//   return (
//     <>
//       {/* Hero section with background */}
//       <div className="w-full h-screen bg-[url('/bg1.jpg')] bg-cover bg-center">
//         <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] h-full'>
//           <Header/>
//         </div>
//       </div>

//       {/* Normal sections below */}
//       <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
//         <Latestcollection/>
//         <Bestseller/>
//         <Ourpolicy/>
//       </div>
//     </>
//   )
// }

// export default Home