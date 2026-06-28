import express from "express";
import {
  login,
  refresh,
  logout,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import {
  registerSchema,
  loginSchema,
} from "../src/validations/authValidation.js";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../src/validations/authValidation.js";
//router login
const router = express.Router();

router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", validate(forgotPasswordSchema),asyncHandler(forgotPassword));
router.post("/reset-password/:token", validate(resetPasswordSchema),asyncHandler(resetPassword));

// router.post("/login", asyncHandler(login));
router.post("/login", validate(loginSchema), asyncHandler(login));

router.post("/refresh", asyncHandler(refresh));

router.post("/logout", asyncHandler(logout));

// router.post("/register", asyncHandler(register));
router.post("/register", validate(registerSchema), asyncHandler(register));

export default router;
