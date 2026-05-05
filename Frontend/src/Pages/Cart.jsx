import React, { useEffect, useState } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import { useContext } from 'react';
import Title from '../Components/Title';
import { FaTrash } from 'react-icons/fa';
import Carttotal from '../Components/Carttotal';

const Cart = () => {
  const { products, currency, cartitems, updatequantity, navigate } = useContext(ShopContext);
  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempdata = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cartitems[items][item]
            })
          }
        }
      }
      setcartdata(tempdata)
    }
  }, [cartitems, products])

  const isCartEmpty = cartdata.length === 0

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>
      <div className='border-t pt-14'>
        <div className='text-2xl mb-3'>
          <Title text1={'Your'} text2={"Cart"} />
        </div>

        {/* ── Empty cart message ── */}
        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg className="w-16 h-16 text-slate-200 mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <p className="text-slate-500 font-medium mb-1">Your cart is empty</p>
            <p className="text-slate-400 text-sm mb-6">Add some products to continue shopping</p>
            <button
              onClick={() => navigate('/collection')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <>
            <div>
              {cartdata.map((item, index) => {
                const productdata = products.find((product) => product._id === item._id);
                if (!productdata) return null;
                return (
                  <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                    <div className='flex items-start gap-6'>
                      <img className='w-16 sm:w-20' src={productdata.image[0]} alt="" />
                      <div>
                        <p className='text-xs sm:text-lg font-medium'>{productdata.name}</p>
                        <div className='flex items-center gap-5 mt-2'>
                          <p>{currency}{productdata.price}</p>
                          {/* Only show size if it's not 'default' */}
                          {item.size !== 'default' && (
                            <p className='px-2 sm:px-3 sm:py-1 bg-slate-100'>{item.size}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <input
                      onChange={(e) =>
                        e.target.value === "" || e.target.value === "0"
                          ? null
                          : updatequantity(item._id, item.size, Number(e.target.value))
                      }
                      className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                    />
                    <FaTrash
                      onClick={() => updatequantity(item._id, item.size, 0)}
                      className='w-4 sm:w-5 mr-4 cursor-pointer text-red-400 hover:text-red-600 transition-colors'
                    />
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end my-20">
              <div className='w-full sm:w-[450px]'>
                <Carttotal />
                <div className='w-full text-end'>
                  <button
                    onClick={() => !isCartEmpty && navigate('/placeorder')}
                    disabled={isCartEmpty}
                    className={`text-sm text-white my-8 px-8 py-3 rounded-xl font-medium transition-colors
                      ${isCartEmpty
                        ? 'bg-slate-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                      }`}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart