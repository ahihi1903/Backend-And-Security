import express from "express";
import {
  login,
  refresh,
  logout,
  register,
} from "../controllers/authController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
//router login
const router = express.Router();

router.post("/login", asyncHandler(login));

router.post("/refresh", asyncHandler(refresh));

router.post("/logout", asyncHandler(logout));

router.post("/register", asyncHandler(register));

export default router;