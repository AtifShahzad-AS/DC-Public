import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
const CategoryCard = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-12 py-6">

      {/* ---------- Card 1 ---------- */}
      <div className="group
        w-full lg:w-1/2
        bg-[#f0e7d5]
        rounded-2xl
        shadow-md
        overflow-hidden
        flex flex-col sm:flex-row
        items-center
        p-4 sm:p-6
      ">

        {/* Text */}
        <div className="  flex-1 text-center sm:text-left">
          
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
            Bedsheets
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4">
            Soft premium bedsheets for comfortable and cozy sleep at affordable prices.
          </p>
        </div>

        {/* Image + Corner Button */}
        <div className=" relative w-full sm:w-44 md:w-52 h-44 sm:h-40 md:h-44">

          <img
            src={assets.bedd}
            alt="Bedsheet"
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Corner Button */}
          
          <button onClick={() => navigate('/collection')}  className="group
            absolute top-1 right-2 font-medium sm:font-bold
            flex items-center gap-1
            bg-gray-200   backdrop-blur-sm group-hover:bg-blue-600 group-hover:text-white
            text-black
            text-xs
            px-3 py-2.5
            rounded-md
            transition
          ">
            Shop Now
            <span className="text-sm">
              <FaArrowRight className="text-gray-600 group-hover:text-white"/>
              </span>
          </button>
          
          {/* <div className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
              <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors duration-200"
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div> */}

        </div>
      </div>

      {/* ---------- Card 2 ---------- */}
      <div className="group
        w-full lg:w-1/2
        bg-blue-200
        rounded-2xl
        shadow-md
        overflow-hidden
        flex flex-col sm:flex-row
        items-center
        p-4 sm:p-6
      ">

        {/* Text */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
            Sofa Covers
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4">
            Stylish breathable sofa covers to refresh your furniture easily.
          </p>
        </div>

        {/* Image + Corner Button */}
        <div className="relative  w-full sm:w-44 md:w-52 h-44 sm:h-40 md:h-44">

          <img
            src={assets.scover}
            alt="Sofa Cover"
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Corner Button */}
         <button onClick={() => navigate('/collection')} className="
            absolute top-1 right-2 font-medium sm:font-bold
            flex items-center gap-1
           bg-gray-200   backdrop-blur-sm group-hover:bg-blue-600 group-hover:text-white
            text-black
            text-xs
            px-3 py-2.5
            rounded-md
            transition
          ">
            Shop Now
           <span className="text-sm">
              <FaArrowRight className="text-gray-600 group-hover:text-white"/>
              </span>
          </button>

        </div>

      </div>

    </div>
  );
};

export default CategoryCard;