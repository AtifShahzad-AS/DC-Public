import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../../Context/Shopcontext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verifypf = () => {

  const { navigate, token, setcartitems, backendurl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  // Stripe sends session_id after payment
  const session_id = searchParams.get("session_id");
  const success = searchParams.get("success");  // optional if you send
  const orderId = searchParams.get("orderId");  // optional

  const verifyPayment = async () => {
    try {
      if (!token) return null;

      // Hit backend verify route
      const response = await axios.post(
        backendurl + "/api/payment/verifypf",
        { session_id, success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setcartitems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }

    } catch (error) {
      console.log(error);
      toast.error("Payment Failed: " + error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verifypf;
