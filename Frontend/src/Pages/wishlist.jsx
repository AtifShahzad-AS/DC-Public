import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/Shopcontext";
import axios from "axios";
import Productitems from "../Components/Productitems";

const Wishlist = () => {
  const { wishlist, token, backendurl } = useContext(ShopContext);
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
          { productIds: wishlist }, // send array of wishlist product IDs
          { headers: { Authorization: `Bearer ${token}` } } // if your batch route is protected
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

  return (
    <div className="px-6 py-10 pt-20">
      <h1 className="text-2xl text-center font-semibold   mb-6 sticky top-20 z-1">My Wishlist ❤️</h1>

      {wishlistProducts.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
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