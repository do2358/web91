import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';
import { validate, validateUser, validateUserUpdate, validateObjectId } from '../middleware/validate.js';

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(validate(validateUser), createUser);

router.route('/:id')
    .get(validateObjectId, getUserById)
    .put(validateObjectId, validate(validateUserUpdate), updateUser)
    .delete(validateObjectId, deleteUser);

export default router;

