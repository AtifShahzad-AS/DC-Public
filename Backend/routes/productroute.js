import express from 'express'
import {addproduct,listproduct,removeproduct,singleproduct} from "../controllers/productcontroller.js"
import upload from '../middleware/multer.js';
const productrouter=express.Router();

productrouter.post('/add',upload.fields([{name:'image1',maxCount:"1"},{name:'image2',maxCount:"1"},{name:'image3',maxCount:"1"},{name:'image4',maxCount:"1"}]),addproduct);
productrouter.get('/list',listproduct);
productrouter.post('/remove',removeproduct);
productrouter.post('/single',singleproduct);
export default productrouter