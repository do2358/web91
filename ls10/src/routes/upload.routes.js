import express from "express";
import { uploadImage, uploadImages } from "../controllers/upload.controller.js";
import { upload } from "../middleware/upload.js";

/**
 * @swagger
 * tags:
 *   - name: Upload
 *     description: File upload endpoints
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a single image
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     public_id:
 *                       type: string
 *       400:
 *         description: Bad request
 *       413:
 *         description: File too large
 */

/**
 * @swagger
 * /api/upload/multiple:
 *   post:
 *     summary: Upload multiple images
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Multiple image files to upload
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       public_id:
 *                         type: string
 *       400:
 *         description: Bad request
 *       413:
 *         description: File too large
 */

const uploadRouter = express.Router();

uploadRouter.route("/").post(upload.single("file"), uploadImage);

uploadRouter.route("/multiple").post(upload.array("files"), uploadImages);

export default uploadRouter;