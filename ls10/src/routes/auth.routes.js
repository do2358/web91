import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';
import { validate, validateUser, validateUserUpdate, validateObjectId } from '../middleware/validate.js';

const authenRouter = express.Router();

authenRouter.route('/')
    // .post('/register', register)
    // .post('/login', login);

export default authenRouter;
