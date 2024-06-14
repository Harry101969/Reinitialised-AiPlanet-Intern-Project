const dotenv = require('dotenv');
dotenv.config(); // This will load environment variables from the .env file

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw",  // Use raw for files like PDFs
            format: "pdf"
        });

        // If file has been uploaded successfully
        // console.log("Cloudinary Response:", response);
        console.log("File is uploaded on Cloudinary", response.url);

        // Delete the local file after uploading
        //fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Remove the locally saved temporary file if upload operation failed
        fs.unlinkSync(localFilePath);
        console.error('Error uploading file to Cloudinary:', error);
        return null;
    }
};

module.exports = { uploadOnCloudinary };
