import Post from "../models/post.model.js";
import { uploadSingleToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    console.log(`start create post`);
    const postData = { ...req.body };

    
    const post = await Post.create(postData);
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const updateData = { ...req.body };
    
    if (req.files) {
      if (req.files.coverImage && req.files.coverImage[0]) {
        if (existingPost.coverImage?.publicId) {
          await deleteFromCloudinary(existingPost.coverImage.publicId);
        }
        const coverImageResult = await uploadSingleToCloudinary(req.files.coverImage[0]);
        updateData.coverImage = {
          url: coverImageResult.secure_url,
          publicId: coverImageResult.public_id
        };
      }
      
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        if (existingPost.thumbnail?.publicId) {
          await deleteFromCloudinary(existingPost.thumbnail.publicId);
        }
        const thumbnailResult = await uploadSingleToCloudinary(req.files.thumbnail[0]);
        updateData.thumbnail = {
          url: thumbnailResult.secure_url,
          publicId: thumbnailResult.public_id
        };
      }
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    if (post.coverImage?.publicId) {
      await deleteFromCloudinary(post.coverImage.publicId);
    }
    
    if (post.thumbnail?.publicId) {
      await deleteFromCloudinary(post.thumbnail.publicId);
    }

    await Post.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
