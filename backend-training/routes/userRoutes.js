import {
  getId,
  postId,
  deleId,
  getAllUsers,
} from "../controllers/userController.js";
import { addRoute } from "../middlewares/router.js";

const router = {
  get: (path, ...handlers) => addRoute("GET", path, ...handlers),
  post: (path, ...handlers) => addRoute("POST", path, ...handlers),
  delete: (path, ...handlers) => addRoute("DELETE", path, ...handlers),
};

router.get("/users", getAllUsers);

router.get("/users/:id", getId);

router.post("/users", postId);

router.delete("/users/:id", deleId);
