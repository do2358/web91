import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';
import { validate, validateUser, validateUserUpdate, validateObjectId } from '../middleware/validate.js';

const userRouter = express.Router();

userRouter.route('/')
    .get(getAllUsers)
    .post(validate(validateUser), createUser);

userRouter.route('/:id')
    .get(validateObjectId, getUserById)
    .put(validateObjectId, validate(validateUserUpdate), updateUser)
    .delete(validateObjectId, deleteUser);

export default userRouter;

