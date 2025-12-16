import React from "react";
import { assets } from "../assets/assets";

const CategoryCard = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 px-2 lg:px-10 py-6 lg:py-10">

      {/* ---- Card 1 ---- */}
      <div className="w-full lg:w-1/2 rounded-3xl shadow-xl bg-[#f0e7d5] overflow-hidden relative 
                      flex flex-row max-[450px]:flex-col p-4 md:p-6">

        {/* Text Section */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
            Bedsheets
          </h2>

          <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
            Elevate your sleep experience with our soft, and premium-quality
            <strong> bedsheets</strong>. Keep your bed fresh and cozy — all at
            <strong> affordable prices</strong>.
          </p>

          <button className="bg-gray-400 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-500 transition text-sm md:text-base">
            Shop now
          </button>
        </div>

        {/* Image Section */}
        <img
          src={assets.bedd}
          alt="Bedsheet"
          className="w-1/2 max-[450px]:w-full object-cover rounded-2xl mt-0 max-[450px]:mt-4 ml-4 max-[450px]:ml-0"
        />
      </div>

      {/* ---- Card 2 ---- */}
      <div className="w-full lg:w-1/2 rounded-3xl shadow-xl bg-blue-200 overflow-hidden relative 
                      flex flex-row max-[450px]:flex-col p-4 md:p-6">

        {/* Text Section */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
            Sofa Covers
          </h2>

          <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
            Give your furniture a fresh new look with our stylish and breathable
            <strong> sofa covers</strong> — all while enjoying 
            <strong> affordable prices</strong>.
          </p>

          <button className="bg-gray-400 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-500 transition text-sm md:text-base">
            Shop now
          </button>
        </div>

        {/* Image Section */}
        <img
          src={assets.scover}
          alt="Sofa Cover"
          className="w-1/2 max-[450px]:w-full object-cover rounded-2xl mt-0 max-[450px]:mt-4 ml-4 max-[450px]:ml-0"
        />
      </div>

    </div>
  );
};

export default CategoryCard;
