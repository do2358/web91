import express from 'express';
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/post.controller.js';
import { validate, validatePost, validatePostUpdate, validateObjectId } from '../middleware/validate.js';

const postRouter = express.Router();

postRouter.route('/')
    .get(getAllPosts)
    .post(validate(validatePost), createPost);

postRouter.route('/:id')
    .get(validateObjectId, getPostById)
    .put(validateObjectId, validate(validatePostUpdate), updatePost)
    .delete(validateObjectId, deletePost);

export default postRouter;

