

import React, { useEffect } from "react";
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";
import Header from "./Header";

const Slider = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
      loop: true,
      autoplay: {
        delay: 3000, // autoplay every 3s
        disableOnInteraction: false,
      },
    });

    return () => {
      swiper.destroy(); // cleanup to prevent duplicate sliders
    };
  }, []);

  return (
    <div className="swiper w-full  h-[400px] sm:h-[700px] p-[30px] mt-12 sm:mt-20 mb-10">
      <div className="swiper-wrapper">
        <div className="swiper-slide  bg-[url('/i1.jpg')] bg-cover bg-center  text-[50px] text-Black">
         <h1 className="relative text-center mt-70 overflow-hidden">Shop Now</h1> 
        </div>
        <div className="swiper-slide bg-[url('/i5.jpeg')] bg-cover bg-center flex justify-center items-center   text-[70px] text-Black">
          <Header/>
        </div>
        <div className="swiper-slide bg-[url('/i1.jpg')] bg-cover bg-center flex items-center justify-center text-[70px] text-Black">
          Slide 3
        </div>
        <div className="swiper-slide bg-[url('/i1.jpg')] bg-cover bg-center flex items-center justify-center text-[70px] text-Black">
          Slide 4
        </div>
        <div className="swiper-slide  bg-[url('/i2.jpg')] bg-cover bg-center flex items-center justify-center text-[70px] text-Black">
          Slide 5
        </div>
      </div>

      {/* Pagination + Arrows */}
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default Slider;
