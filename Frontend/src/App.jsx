import React from 'react'
import {Routes,Route, useLocation} from "react-router-dom"
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Place_order from './Pages/Place_order'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'
import Header from './Components/Header'
import Footer from './Components/Footer'
import WhatsApp from './Components/Whatsapp'
import Searchbar from './Components/Searchbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from './Pages/Contact'
import Verify from './Pages/Verify'
import Profile from './Pages/Profile'
import Verifypf from './Pages/Verifypf'
import Wishlist from './Pages/wishlist'
import ScrollToTop from './Components/ScrollToTop'
import Promo from './Components/Promo'

const App = () => {

  const location = useLocation();

  // Routes where Navbar/Searchbar/Footer should be hidden
  const hideLayoutRoutes = ["/login"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className='bg-slate-100'>

      <ToastContainer position="top-right" autoClose={2000} />

      {/* Show Navbar + Searchbar only when NOT on login page */}
       {!hideLayout && <Navbar />}
      {!hideLayout && <Searchbar />}
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productid" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/placeorder" element={<Place_order />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verifypf" element={<Verifypf />} />
        <Route path="/promo" element={<Promo />} />
<Route path="/wishlist" element={<Wishlist/>}/>
      </Routes>

      {/* Show Footer only when NOT on login page */}
      {!hideLayout && <Footer />}

      {/* <WhatsApp/> */}
    </div>
  )
}

export default App;
