import express from 'express';
import userRoutes from './user.routes.js';
import postRoutes from './post.routes.js';
import authRoutes from './auth.routes.js';

const router = express.Router();

// router.use('/auths', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;

// authN - la di
// authZ - ai co quyen lam gi

// api public
// api co authen