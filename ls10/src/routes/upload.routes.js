import express from "express";
import { uploadImage, uploadImages } from "../controllers/upload.controller.js";
import { upload } from "../middleware/upload.js";

const uploadRouter = express.Router();

uploadRouter.route("/").post(upload.single("file"), uploadImage);

uploadRouter.route("/multiple").post(upload.array("files"), uploadImages);

export default uploadRouter;
