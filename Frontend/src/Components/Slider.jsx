// import React, { useEffect } from "react";
// import Swiper from "swiper/bundle";
// import "swiper/css/bundle";

// const Slider = () => {
//   useEffect(() => {
//     const swiper = new Swiper(".swiper", {
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },
//       pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//         dynamicBullets: true,
//       },
//       loop: true,
//       grabCursor: true,
//       autoplay: {
//         delay: 3500,
//         disableOnInteraction: false,
//       },
//     });

//     return () => {
//       swiper.destroy(); // cleanup on unmount
//     };
//   }, []);

//   return (
//     <div
//       className="swiper w-full 
//         h-[200px] 
//         sm:h-[350px] 
//         md:h-[450px] 
//         lg:h-[520px] 
//         xl:h-[600px] 
//         mt-12 sm:mt-20  px-2 sm:px-6"
//     >
//        <div className="swiper-wrapper h-[300px] sm:[h-500px]">

//         <div className="swiper-slide  overflow-hidden rounded-lg">
//           <img
//             src="/s1.png"
//             alt=""
//             className="w-full   object-cover"
//           />
//         </div>

//         <div className="swiper-slide overflow-hidden rounded-lg">
//           <img
//             src="/s2.png"
//             alt=""
//             className="w-full   object-cover"
//           />
//         </div>

//         <div className="swiper-slide overflow-hidden rounded-lg">
//           <img
//             src="/s3.png"
//             alt=""
//             className="w-full  object-cover"
//           />
//         </div>

//         <div className="swiper-slide overflow-hidden rounded-lg">
//           <img
//             src="/s4.png"
//             alt=""
//             className="w-full  object-cover"
//           />
//         </div>

//         <div className="swiper-slide overflow-hidden rounded-lg">
//           <img
//             src="/s5.png"
//             alt=""
//             className="w-full  object-cover"
//           />
//         </div>

//       </div> 

//       {/* Pagination + Arrows */}
//       <div className="swiper-pagination  bottom-[10px]"  ></div>

//       <div className="swiper-button-next hidden sm:flex"></div>
//       <div className="swiper-button-prev hidden sm:flex"></div>
//     </div>
//   );
// };

// export default Slider;
import React, { useEffect, useState, useRef } from "react"
import Swiper from "swiper/bundle"
import "swiper/css/bundle"
import axios from "axios"
import BannerStrip from "./BannerStrip"
const backendurl = import.meta.env.VITE_BACKEND_URL

const Slider = () => {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const swiperRef = useRef(null)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await axios.post(backendurl + "/api/slide/list")
        if (data.success) {
          setSlides(data.slides)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSlides()
  }, [])

  useEffect(() => {
    if (slides.length === 0) return

    const timer = setTimeout(() => {
      swiperRef.current = new Swiper(".swiper", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        loop:       slides.length > 1,
        grabCursor: true,
        autoplay: {
          delay:                3500,
          disableOnInteraction: false,
        },
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true)
        swiperRef.current = null
      }
    }
  }, [slides])

  if (loading) {
    return (
      <div className="  w-full mt-12 sm:mt-20 px-2 sm:px-6
        h-[200px] sm:h-[350px] md:h-[450px] lg:h-[520px] xl:h-[600px]
        bg-slate-100 rounded-lg animate-pulse flex items-center justify-center">
          
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (slides.length === 0) return null

  return (
    <>
      {/* ── Critical fix: contain swiper slides to their parent height ── */}
      <style>{`
        .swiper,
        .swiper-wrapper,
        .swiper-slide {
          height: 100% !important;
        }
        .swiper-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .swiper-slide a {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div
        className="swiper w-full
          h-[200px]
          sm:h-[350px]
          md:h-[450px]
          lg:h-[520px]
          xl:h-[600px]
          mt-12 sm:mt-20 px-2 sm:px-6"
      >
        <div className="swiper-wrapper">
          {slides.map((slide) => (
            <div
              key={slide._id}
              className="swiper-slide overflow-hidden rounded-lg"
            >
              {slide.link && slide.link !== "/" ? (
                <a href={slide.link}>
                  <img
                    src={slide.image}
                    alt={slide.title || "Slide"}
                  />
                </a>
              ) : (
                <img
                  src={slide.image}
                  alt={slide.title || "Slide"}
                />
              )}
            </div>
          ))}
        </div>

        <div className="swiper-pagination bottom-[10px]" />
        <div className="swiper-button-next hidden sm:flex" />
        <div className="swiper-button-prev hidden sm:flex" />
      </div>
    </>
  )
}

export default Slider