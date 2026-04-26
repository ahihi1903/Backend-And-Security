import { hashPassword } from "../utils/hash.js";
import { accounts } from "../model/auth.js";
///
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import createError from "../middlewares/createError.js";
import { loginService } from "../services/authServices.js";
import { registerService } from "../services/authServices.js";

//login + register

export async function register(req, res) {
  //hàm đăng ký
  const { username, password } = req.body;

  await registerService(username, password);

  res.statusCode = 201;
  res.end(JSON.stringify({ message: "User created" }));
}

export async function login(req, res) {
  //hàm đăng nhập
  const { username, password } = req.body;
  const token = await loginService(username, password);

  res.end(JSON.stringify({ token }));
}
