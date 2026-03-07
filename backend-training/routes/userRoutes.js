import { getId, postId, deleId } from "../controllers/userController.js";
import { addRoute } from "../middlewares/router.js";
import { users } from "../model/users.js";
const router = {
  get: (path, handler) => addRoute("GET", path, handler),
  post: (path, handler) => addRoute("POST", path, handler),
  delete: (path, handler) => addRoute("DELETE", path, handler),
};

router.get("/users", (req, res) => {
  res.end(JSON.stringify(users));
});

router.get("/users/:id", getId);

router.post("/users", postId);

router.delete("/users/:id", deleId);
