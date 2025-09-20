import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import {motion}  from "motion/react"

const WhatsApp = () => {
  return (
    <a  
      href="https://wa.me/923249590143" // 👈 replace with your number (92 = Pakistan country code)
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
    >
      <FaWhatsapp whilehover={{scale:"0.9"}} size={32} />
    </a>
  );
};

export default WhatsApp;
