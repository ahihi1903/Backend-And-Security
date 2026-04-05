import { accounts } from "../model/auth.js";
import { generateToken } from "../utils/token.js";
import createError from "../middlewares/createError.js";
//hàm đăng nhập
export function login(req, res) {
  const { username, password } = req.body;

  const user = accounts.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    throw createError(401, "Invalid credentials");
  }

  const token = generateToken({ id: user.id, username: user.username });

  res.end(JSON.stringify({ token }));
}
