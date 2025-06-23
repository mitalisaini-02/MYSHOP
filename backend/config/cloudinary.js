import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config(); // Load .env

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // ✅ correct key
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
};

export default connectCloudinary;
