import { uploadImageToCloudinary } from "../services/cloudinary.service.js";

const uploadImage = async (req, res) => {
  try {
    console.log(`controller: start upload image`);
    const image = await uploadImageToCloudinary(req.file);
    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const uploadImages = async (req, res) => {
  try {
    console.log(`controller: start upload images`, req.files.length);
    const uploadedImages = [];
    for (const file of req.files) {
      const image = await uploadImageToCloudinary(file);
      uploadedImages.push(image);
    }
    res.status(200).json({
      success: true,
      data: uploadedImages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { uploadImage, uploadImages };
