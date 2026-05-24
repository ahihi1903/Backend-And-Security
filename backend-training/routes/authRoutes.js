import express from "express";
import {
  login,
  refresh,
  logout,
  register,
} from "../controllers/authController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import validate from "../middlewares/validate.js";
import {
  registerSchema,
  loginSchema,
} from "../src/validations/authValidation.js";

//router login
const router = express.Router();

// router.post("/login", asyncHandler(login));
router.post("/login", validate(loginSchema), asyncHandler(login));

router.post("/refresh", asyncHandler(refresh));

router.post("/logout", asyncHandler(logout));

// router.post("/register", asyncHandler(register));
router.post("/register", validate(registerSchema), asyncHandler(register));

export default router;
