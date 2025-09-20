import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/Shopcontext'
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
  const { search, setsearch, showsearch, setshowsearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setvisible] = useState(true);
  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setvisible(true);
    }
    else {
      setvisible(false)
    }
  }, [location])
  return visible && showsearch ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 my-3 mx-3 px-5 py-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e) => setsearch(e.target.value)} type="text" placeholder='Search..' className='flex-1 bg-inherit outline-none text-sm' />
        <FaSearch className="text-black cursor-pointer text-2xl" /></div>
      <FaTimes onClick={() => setshowsearch(false)} className='inline text-2xl cursor-pointer' />
    </div>
  ) : ""
}

export default Searchbar
