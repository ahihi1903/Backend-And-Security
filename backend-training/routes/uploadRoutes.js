import express from "express";
import upload from "../middlewares/upload.js";
import { uploadAvatar } from "../controllers/uploadController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);

export default router;

// single("avatar")
// Nghĩa là:
// field name = avatar
// Postman phải đúng tên này.
