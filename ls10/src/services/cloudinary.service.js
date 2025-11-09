import { uploadSingleToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

export const uploadImageToCloudinary = async (file) => {
  console.log(`service: start upload image to cloudinary`);
  console.log(`service: file: ${JSON.stringify(file)}`);
  if (!file) return null;
  
  const result = await uploadSingleToCloudinary(file);
  return {
    url: result.secure_url,
    publicId: result.public_id
  };
};

export const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) return false;
  return await deleteFromCloudinary(publicId);
};

export const uploadPostImages = async (files) => {
  const result = {};
  
  if (files?.coverImage?.[0]) {
    result.coverImage = await uploadImageToCloudinary(files.coverImage[0]);
  }
  
  if (files?.thumbnail?.[0]) {
    result.thumbnail = await uploadImageToCloudinary(files.thumbnail[0]);
  }
  
  return result;
};

export const deletePostImages = async (post) => {
  const deletePromises = [];
  
  if (post.coverImage?.publicId) {
    deletePromises.push(deleteImageFromCloudinary(post.coverImage.publicId));
  }
  
  if (post.thumbnail?.publicId) {
    deletePromises.push(deleteImageFromCloudinary(post.thumbnail.publicId));
  }
  
  if (deletePromises.length > 0) {
    await Promise.all(deletePromises);
  }
};

