import {v2 as cloudinary} from "cloudinary"
import productmodel from "../models/productmodel.js";
//function for add product
const addproduct = async (req, res) => {
    try {
        const { name, description, price, category, subcategory, sizes, bestseller } = req.body;
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]  
        const image4=req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=>item !== undefined)
        
        let imageurl=await Promise.all(
            images.map(async (item)=>{
 let result= cloudinary.uploader.upload(item.path,{resource_type:"image"})
            return (await result).secure_url;
            })
           
        )
        const productdata={
            name,
             description,
              price: Number(price),
               category,
                subcategory,
                 sizes:JSON.parse(sizes),
                  bestseller:bestseller=== "true" ? true : false,
                  image:imageurl,
                  daate:Date.now()
        }
        console.log(productdata);
        const product=new productmodel(productdata);
        await product.save();


        // console.log(name, description, price, category, subcategory, sizes, bestseller)
        // console.log(imageurl)
        res.json({success:true,message:"product added"})
    }catch(error){
   console.log(error)
   res.json({success:false,message:error.message})
    }
}
// listproduct
const listproduct = async (req, res) => {
try{

}catch(error){
    
}
}
// remove
const removeproduct = async (req, res) => {

}
// singlinfo
const singleproduct = async (req, res) => {

}

export { addproduct, listproduct, removeproduct, singleproduct }