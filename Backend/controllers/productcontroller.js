import {v2 as cloudinary} from "cloudinary"
import productmodel from "../models/productmodel.js";


const addproduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, bestseller, stock } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter(item => item !== undefined)

    let imageurl = await Promise.all(
      images.map(async (item) => {
        let result = cloudinary.uploader.upload(item.path, { resource_type: "image" })
        return (await result).secure_url
      })
    )

   // In addproduct controller
const productdata = {
  name,
  description,
  price:      Number(price),
  // Normalize category on save
  category:   category.trim().charAt(0).toUpperCase() +
              category.trim().slice(1).toLowerCase(),
  sizes:      JSON.parse(sizes),
  bestseller: bestseller === "true",
  image:      imageurl,
  date:       Date.now(),
  stock:      parseInt(stock) || 0,
  lowStockAlert: 10,
  alertSent:  false,
}

    console.log(productdata)

    const product = new productmodel(productdata)
    await product.save()

    res.json({ success: true, message: "Product added" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// listproduct
const listproduct = async (req, res) => {
try{
   const products= await productmodel.find({});
   res.json({success:true,products})
}catch(error){
 console.log(error)
   res.json({success:false,message:error.message})
}
}
// remove
const removeproduct = async (req, res) => {
try{
     await productmodel.findByIdAndDelete(req.body.id)
     res.json({success:true,message:"Product removed"})
}catch(error){
  console.log(error)
   res.json({success:false,message:error.message})
  
}
}
// singlinfo
const singleproduct = async (req, res) => {
try{
    const {productid}= req.body;
    const product=await productmodel.findById(productid)
    res.json({success:true,product})
}catch(error){
  console.log(error)
   res.json({success:false,message:error.message})
  
}
}

//batch

// Batch products controller
 const batchProducts = async (req, res) => {
  try {
    const { productIds } = req.body; // expect array of IDs
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.json({ success: true, products: [] });
    }

    // Fetch products that match the IDs
    const products = await productmodel.find({ _id: { $in: productIds } });

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addproduct, listproduct, removeproduct, singleproduct,batchProducts }