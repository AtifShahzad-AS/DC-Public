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




// import React from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

// const promoCards = [
//   {
//     title: "Bedsheets",
//     subtitle: "Premium Sleep Collection",
//     description:
//       "Elevate your sleep experience with our soft, premium-quality bedsheets. Keep your bed fresh and cozy — crafted for every season.",
//     highlight: "Starting from Rs 1,200",
//     image: assets.bedd,
//     imageAlt: "Bedsheet",
//     bg: "bg-slate-900",
//     titleColor: "text-white",
//     descColor: "text-slate-400",
//     highlightColor: "text-blue-400",
//     subtitleColor: "text-blue-400",
//     btnBg: "bg-blue-600 hover:bg-blue-700 text-white",
//     outlineBtnColor: "border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400",
//     tag: "Best Seller",
//     tagBg: "bg-blue-600",
//     category: "Bedsheets",
//   },
//   {
//     title: "Sofa Covers",
//     subtitle: "Home Decor Essentials",
//     description:
//       "Give your furniture a fresh new look with our stylish and breathable sofa covers — designed to fit perfectly and last longer.",
//     highlight: "Starting from Rs 800",
//     image: assets.scover,
//     imageAlt: "Sofa Cover",
//     bg: "bg-blue-50",
//     titleColor: "text-slate-900",
//     descColor: "text-slate-500",
//     highlightColor: "text-blue-600",
//     subtitleColor: "text-blue-600",
//     btnBg: "bg-slate-900 hover:bg-slate-800 text-white",
//     outlineBtnColor: "border-slate-300 text-slate-500 hover:border-slate-900 hover:text-slate-900",
//     tag: "Trending",
//     tagBg: "bg-slate-900",
//     category: "Sofa Covers",
//   },
// ]

// const CategoryCard = () => {
//   const navigate = useNavigate()

//   return (
//     <section className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">

//       <div className="flex flex-col lg:flex-row gap-5">
//         {promoCards.map((card, i) => (
//           <div
//             key={i}
//             className={`w-full lg:w-1/2 rounded-2xl overflow-hidden ${card.bg} relative`}
//           >
//             {/* Top accent line */}
//             <div className="h-1 w-full bg-blue-600" />

//             <div className="flex flex-col sm:flex-row items-stretch p-6 sm:p-8 gap-6">

//               {/* ── Text Side ── */}
//               <div className="flex-1 flex flex-col justify-between">
//                 <div>
//                   {/* Tag */}
//                   <span className={`inline-block ${card.tagBg} text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4`}>
//                     {card.tag}
//                   </span>

//                   {/* Subtitle */}
//                   <p className={`text-xs font-semibold uppercase tracking-widest ${card.subtitleColor} mb-1`}>
//                     {card.subtitle}
//                   </p>

//                   {/* Title */}
//                   <h2 className={`text-3xl sm:text-4xl font-extrabold ${card.titleColor} leading-tight mb-3`}>
//                     {card.title}
//                   </h2>

//                   {/* Description */}
//                   <p className={`text-sm leading-relaxed ${card.descColor} mb-4`}>
//                     {card.description}
//                   </p>

//                   {/* Starting price */}
//                   <p className={`text-xs font-semibold ${card.highlightColor} mb-6`}>
//                     {card.highlight}
//                   </p>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex flex-wrap gap-3">
//                   <button
//                     onClick={() => navigate('/collection', { state: { category: card.category } })}
//                     className={`${card.btnBg} text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer`}
//                   >
//                     Shop Now
//                   </button>
//                   <button
//                     onClick={() => navigate('/collection', { state: { category: card.category } })}
//                     className={`border ${card.outlineBtnColor} text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer bg-transparent`}
//                   >
//                     View All
//                   </button>
//                 </div>
//               </div>

//               {/* ── Image Side ── */}
//               <div className="w-full sm:w-[45%] flex-shrink-0 relative">
//                 {/* Decorative background circle */}
//                 <div className={`absolute inset-0 rounded-2xl ${i === 0 ? 'bg-blue-900/30' : 'bg-blue-100'}`} />
//                 <img
//                   src={card.image}
//                   alt={card.imageAlt}
//                   className="relative z-10 w-full h-48 sm:h-full object-cover rounded-2xl"
//                 />

//                 {/* Corner label */}
//                 <div className={`absolute bottom-3 left-3 z-20 ${i === 0 ? 'bg-white/10 text-white' : 'bg-white text-slate-700'} backdrop-blur-sm text-[10px] font-semibold px-2.5 py-1 rounded-full border ${i === 0 ? 'border-white/20' : 'border-slate-100'}`}>
//                   {card.highlight}
//                 </div>
//               </div>

//             </div>

//             {/* Bottom stats bar */}
//             <div className={`px-6 sm:px-8 py-3 border-t ${i === 0 ? 'border-slate-700 bg-slate-800/50' : 'border-blue-100 bg-white/60'} flex items-center gap-6`}>
//               {[
//                 { label: 'Products', value: i === 0 ? '42+' : '18+' },
//                 { label: 'Sizes',    value: i === 0 ? '3 Sizes' : '4 Sizes' },
//                 { label: 'Rating',   value: '4.8 ★' },
//               ].map((stat, j) => (
//                 <div key={j} className="flex items-center gap-2">
//                   <span className={`text-sm font-bold ${i === 0 ? 'text-white' : 'text-slate-900'}`}>
//                     {stat.value}
//                   </span>
//                   <span className={`text-[11px] ${i === 0 ? 'text-slate-400' : 'text-slate-400'}`}>
//                     {stat.label}
//                   </span>
//                   {j < 2 && (
//                     <span className={`ml-2 ${i === 0 ? 'text-slate-600' : 'text-slate-200'}`}>·</span>
//                   )}
//                 </div>
//               ))}
//             </div>

//           </div>
//         ))}
//       </div>

//     </section>
//   )
// }

// export default CategoryCard