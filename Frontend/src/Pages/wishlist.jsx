// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../../Context/Shopcontext";
// import axios from "axios";
// import Productitems from "../Components/Productitems";

// const Wishlist = () => {
//   const { wishlist, token, backendurl } = useContext(ShopContext);
//   const [wishlistProducts, setWishlistProducts] = useState([]);

//   useEffect(() => {
//     const fetchWishlistProducts = async () => {
//       if (!token || wishlist.length === 0) {
//         setWishlistProducts([]);
//         return;
//       }

//       try {
//         const res = await axios.post(
//           backendurl + "/api/product/batch",
//           { productIds: wishlist }, // send array of wishlist product IDs
//           { headers: { Authorization: `Bearer ${token}` } } // if your batch route is protected
//         );

//         if (res.data.success) {
//           setWishlistProducts(res.data.products);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchWishlistProducts();
//   }, [wishlist, token]);

//   return (
//     <div className="px-6 py-10 pt-20">
//       <h1 className="text-2xl text-center font-semibold   mb-6   z-1">My Wishlist ❤️</h1>

//       {wishlistProducts.length === 0 ? (
//         <p className="text-gray-500">Your wishlist is empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {wishlistProducts.map((item) => (
//             <Productitems
//               key={item._id}
//               id={item._id}
//               image={item.image}
//               name={item.name}
//               price={item.price}
//               rating={item.rating}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/Shopcontext";
import axios from "axios";
import Title from "../Components/Title";
import Productitems from "../Components/Productitems";

const Wishlist = () => {
  const { wishlist, token, backendurl, navigate } = useContext(ShopContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!token || wishlist.length === 0) {
        setWishlistProducts([]);
        return;
      }

      try {
        const res = await axios.post(
          backendurl + "/api/product/batch",
          { productIds: wishlist },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setWishlistProducts(res.data.products);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishlistProducts();
  }, [wishlist, token]);

  const isEmpty = wishlistProducts.length === 0;

  return (
    <div className="px-6 py-10 pt-20 min-h-screen">
      {/* <h1 className="text-2xl text-center font-semibold mb-6">My Wishlist ❤️</h1> */}
       <div className=' border-t pt-14 text-2xl mb-3'>
          <Title text1={'Your'} text2={'Wishlist'} />
        </div>
      {/* ── Empty wishlist ── */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <svg
            className="w-16 h-16 text-slate-200 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <p className="text-slate-500 font-medium mb-1">Your wishlist is empty</p>
          <p className="text-slate-400 text-sm mb-6">
            Save items you love and find them here anytime
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            Browse Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((item) => (
            <Productitems
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;