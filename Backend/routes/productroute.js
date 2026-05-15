import express from 'express'
import {addproduct,listproduct,removeproduct,singleproduct,batchProducts} from "../controllers/productcontroller.js"
import upload from '../middleware/multer.js';
import adminauth from '../middleware/adminauth.js';
import auth from '../middleware/auth.js';
const productrouter=express.Router();

productrouter.post('/add',adminauth,upload.fields([{name:'image1',maxCount:"1"},{name:'image2',maxCount:"1"},{name:'image3',maxCount:"1"},{name:'image4',maxCount:"1"}]),addproduct);
productrouter.post('/list',listproduct);
productrouter.post('/remove',adminauth,removeproduct);
productrouter.post('/single',singleproduct);
productrouter.post('/batch', batchProducts);
// POST /api/product/check-cart-stock
productrouter.post("/check-cart-stock", auth, async (req, res) => {
  try {
    const { items } = req.body   // [{ productId, quantity }]
    const outOfStock = []

    for (const item of items) {
      const product = await productmodel
        .findById(item.productId)
        .select("name stock")
      
      if (!product || product.stock < item.quantity) {
        outOfStock.push({
          productId: item.productId,
          name: product?.name || "Unknown",
          available: product?.stock || 0,
          requested: item.quantity
        })
      }
    }

    res.json({ success: true, outOfStock })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
})
export default productrouter