import { addRoute } from "../middlewares/router.js";
import { register, login } from "../controllers/authController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
//router login
const router = {
  post: (path, ...handlers) => addRoute("POST", path, ...handlers),
};

router.post("/register", asyncHandler(register));

router.post("/login", asyncHandler(login));
