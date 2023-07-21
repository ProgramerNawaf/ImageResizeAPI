import express from "express";
import imageFunction from "../controller/imageController";
const router = express.Router();

router.use("/image", imageFunction);

export default router;
