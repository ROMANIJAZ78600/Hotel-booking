import { v2 as cloudinary } from "cloudinary";

const connectcloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    cloud_apikey: process.env.CLOUD_API_KEY,
    cloud_secret: process.env.CLOUD_API_SECRET,
  });
};

export default connectcloudinary;
