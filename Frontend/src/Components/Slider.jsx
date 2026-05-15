import React, { useEffect, useState, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import axios from "axios";

// import BannerStrip from "./BannerStrip"; // Keep this if you need it outside

const backendurl = import.meta.env.VITE_BACKEND_URL;

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // Typically list operations are GET, but using POST as in your original
        const { data } = await axios.post(backendurl + "/api/slide/list");
        if (data.success) {
          setSlides(data.slides);
        }
      } catch (err) {
        console.error("Error fetching slides:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    // ── Swiper Initialization ──
    if (slides.length === 0 || loading) return;

    // Use a small timeout to ensure DOM is rendered before initializing Swiper
    const timer = setTimeout(() => {
      // If an instance already exists, destroy it before creating a new one
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }

      swiperRef.current = new Swiper(".swiper-container-unique", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        loop: slides.length > 1,
        grabCursor: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        // IMPORTANT: Let Swiper know the dimensions might change
        observer: true, 
        observeParents: true,
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [slides, loading]);

  if (loading) {
    return (
      // ── Loading Skeleton with aspect ratio ──
      <div
        className="w-full mt-12 sm:mt-20 px-2 sm:px-6 
        aspect-[16/9] md:aspect-[3/1] /* Matches main container */
        bg-slate-100 rounded-lg animate-pulse flex items-center justify-center"
      >
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <>
      {/* ── Structure Fix: Ensure images fill slide and maintain ratio ── */}
      <style>{`
        .swiper-slide img {
          width: 100%;
          height: 100%;
          /* 
            'object-fit: cover' is usually best, but it crops.
            If you need the ENTIRE image visible without cropping, use 'contain'.
            Note: 'contain' might leave letterboxing if ratios don't match.
            We will stick with 'cover' but fix the container ratio.
          */
          object-fit: cover; 
          display: block;
        }
        .swiper-slide a {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>

      {/* ── Main Swiper Container: Added Unique Class and Aspect Ratio (CRITICAL) ── */}
      <div
        className="swiper swiper-container-unique w-full mt-12 sm:mt-20 px-2 sm:px-6 
          /* 
            Define the Aspect Ratio (CRITICAL FIX) 
            We use a taller ratio on mobile so images are legible,
            and a wider ratio on desktop.
          */
          aspect-[16/9]    /* Mobile/Default ratio (taller) */
          md:aspect-[3/1] /* Medium screen and up ratio (wider) */
          lg:aspect-[3/1]  /* Large screen and up ratio (very wide) */

          /* Remove all fixed 'h-[...px]' classes! */
          overflow-hidden " /* Contain slides */
      >
        <div className="swiper-wrapper">
          {slides.map((slide) => (
            <div
              key={slide._id}
              className="swiper-slide overflow-hidden "
            >
              {slide.link && slide.link !== "/" ? (
                <a href={slide.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={slide.image}
                    alt={slide.title || "Slide"}
                    loading="lazy" // Performance optimization
                  />
                </a>
              ) : (
                <img
                  src={slide.image}
                  alt={slide.title || "Slide"}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Pagination + Arrows ── */}
        <div className="swiper-pagination bottom-[10px]" />
        <div className="swiper-button-next hidden sm:flex text-white" />
        <div className="swiper-button-prev hidden sm:flex text-white" />
      </div>
    </>
  );
};

export default Slider;
