import { addRoute } from "../middlewares/router.js";
import {
  login,
  refresh,
  logout,
  register,
} from "../controllers/authController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
//router login
const router = {
  post: (path, ...handlers) => addRoute("POST", path, ...handlers),
};

router.post("/login", asyncHandler(login));

router.post("/refresh", asyncHandler(refresh));

router.post("/logout", asyncHandler(logout));

router.post("/register", asyncHandler(register));
