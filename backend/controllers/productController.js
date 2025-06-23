import connectCloudinary from "../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary"; // this gives you access after config
import productModel from "../models/productModel.js";


const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];
    const images = [image1, image2, image3, image4].filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
// ✅ Correctly parses the array

  const productData = {
    name: (name || title),
    description,
    price: Number(price),
    category,
    subCategory,
    bestseller: bestseller === "true",
    size: sizes ? JSON.parse(sizes) : [],
    image: imagesUrl,
    date: Date.now(),
  };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Placeholder functions
const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({});
        res.json({ success: true, products });
    }catch(error){
        console.log("Error fetching products:", error);
        res.json({ success: false, message: error.message });
    }
    // TODO: Implement product listing
};
const removeProduct = async (req, res) => {
        try{
            await productModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Product removed successfully" });

        }catch(error){
            console.log("Error removing product:", error);
            res.json({ success: false, message: error.message });
        }


};
const singleProduct = async (req, res) => {
  try{
    const { productId } = req.params;
    const product = await productModel.findById(productId);
   res.json({ success: true, product });

  }catch(error){
    console.log("Error fetching single product:", error);
    res.json({ success: false, message: error.message });
  }
};

// Export controller functions
export { listProducts, addProduct, removeProduct, singleProduct };
