import {
  getId,
  postId,
  deleId,
  getAllUsers,
} from "../controllers/userController.js";

import validateUser from "../globalMiddlewares/validateUser.js";
import checkIdUser from "../globalMiddlewares/checkID.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import auth from "../middlewares/auth.js";
import role from "../globalMiddlewares/role.js";
import express from "express";

const router = express.Router();

router.get("/", auth, role("admin"), asyncHandler(getAllUsers));

router.get(
  "/:id",
  auth,
  role("admin", "user", "staff"),
  checkIdUser,
  asyncHandler(getId),
);

// validateUser is route middleware applied only to POST /users
router.post("/", validateUser, asyncHandler(postId));

router.delete("/:id", auth, role("admin"), checkIdUser, asyncHandler(deleId));

export default router;
