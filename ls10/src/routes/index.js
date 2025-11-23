import express from "express";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import authRoutes from "./auth.routes.js";
import uploadRouter from "./upload.routes.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/upload", uploadRouter);

export default router;

// authN - la di
// authZ - ai co quyen lam gi

// api public
// api co authen
