import {
  getId,
  postId,
  deleId,
  getAllUsers,
} from "../controllers/userController.js";
import { addRoute, addRouteMiddleware } from "../middlewares/router.js";
import auth from "../globalMiddlewares/auth.js";
import validateUser from "../globalMiddlewares/validateUser.js";
import checkIdUser from "../globalMiddlewares/checkID.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = {
  get: (path, ...handlers) => addRoute("GET", path, ...handlers),
  post: (path, ...handlers) => addRoute("POST", path, ...handlers),
  delete: (path, ...handlers) => addRoute("DELETE", path, ...handlers),
  //use: (path, ...handlers) => addRouteMiddleware(path, ...handlers),
};

// apply auth middleware to all /users routes
//router.use("/users", auth);

router.get("/users", asyncHandler(getAllUsers));

router.get("/users/:id", checkIdUser, asyncHandler(getId));

// validateUser is route middleware applied only to POST /users
router.post("/users", validateUser, asyncHandler(postId));

router.delete("/users/:id", checkIdUser, asyncHandler(deleId));
