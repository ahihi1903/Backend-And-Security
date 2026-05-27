import express from "express";
import upload from "../middlewares/upload.js";
import { uploadAvatar } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/avatar", upload.single("avatar"), uploadAvatar);

export default router;

// single("avatar")
// Nghĩa là:
// field name = avatar
// Postman phải đúng tên này.
