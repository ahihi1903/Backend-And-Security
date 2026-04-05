import { addRoute } from "../middlewares/router.js";
import { login } from "../controllers/authController.js";
//router login
const router = {
  post: (path, ...handlers) => addRoute("POST", path, ...handlers),
};

router.post("/login", login);
