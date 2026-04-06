import React from 'react'
import 'react-inner-image-zoom/lib/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { assets } from '../assets/assets';

const Productzoom = () => {
  return (
    <>
      <InnerImageZoom zoomType='hover' zoomScale={1} src={assets.b10}/>
    </>
  )
}

export default Productzoom
