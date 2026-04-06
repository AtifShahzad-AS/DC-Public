import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function Homecatslider() {
  return (
    <div className="home w-full px-4 py-6">

      <Swiper
        navigation
        loop={false}
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="mySwiper w-full"
      >
        {[1,2,3,4,5,6,7].map((item) => (
          <SwiperSlide key={item}>
            <Link to="/">
              <div className="py-8 px-4 bg-amber-500 rounded-bl-xl rounded-tr-xl text-center flex flex-col items-center justify-center">
                <img src="/pilow.png" alt="Quilt" className="w-16" />
                <h1 className="text-white font-medium mt-3">Quilt</h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}