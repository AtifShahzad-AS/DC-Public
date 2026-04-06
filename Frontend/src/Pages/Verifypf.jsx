// import React, { useEffect, useState, useContext } from 'react';
// import { ShopContext } from '../../Context/Shopcontext';
// import { useSearchParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Verifypf = () => {

//   const { navigate, token, setcartitems, backendurl } = useContext(ShopContext);
//   const [searchParams] = useSearchParams();

//   // Stripe sends session_id after payment
//   const session_id = searchParams.get("session_id");
//   const success = searchParams.get("success");  // optional if you send
//   const orderId = searchParams.get("orderId");  // optional

//   const verifyPayment = async () => {
//     try {
//       if (!token) return null;

//       // Hit backend verify route
//       const response = await axios.post(
//         backendurl + "/api/payment/verifypf",
//         { session_id, success, orderId },
//         { headers: {
//     Authorization: `Bearer ${token}`
//   } }
//       );

//       if (response.data.success) {
//         setcartitems({});
//         navigate("/orders");
//       } else {
//         navigate("/cart");
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error("Payment Failed: " + error.message);
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//   }, [token]);

//   return <div></div>;
// };

// export default Verifypf;

import React, { useEffect, useContext } from 'react';
import { ShopContext } from '../../Context/Shopcontext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verifypf = () => {

  const { navigate, token, setcartitems, backendurl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const pf_payment_id = searchParams.get("pf_payment_id");
  const payment_status = searchParams.get("payment_status");
  const custom_str1 = searchParams.get("custom_str1");

  const verifyPayment = async () => {
    try {

      const response = await axios.post(
        backendurl + "/api/payment/verifypf",
        {
          pf_payment_id,
          payment_status,
          custom_str1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setcartitems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }

    } catch (error) {
      console.log(error);
      toast.error("Payment Failed");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <div>Verifying Payment...</div>;
};

export default Verifypf;