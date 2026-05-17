import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import {
  loginService,
  refreshService,
  logoutService,
  registerService,
} from "../services/authServices.js";

//export const refreshTokens = [];
import { refreshTokens } from "../store/tokenStore.js";

export async function login(req, res) {
  //hàm đăng nhập
  const { username, password } = req.body;

  const user = await loginService(username, password);

  const accessToken = await generateAccessToken(user); //time ngắn hạn
  const refreshToken = await generateRefreshToken(user); //time dài hạn

  refreshTokens.push(refreshToken);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  return res.json({ accessToken });
}

export async function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken;

  const accessToken = await refreshService(refreshToken);

  return res.json({
    accessToken,
  });
}

export async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;

  await logoutService(refreshToken);

  res.clearCookie("refreshToken");

  return res.json({ message: "Logged out" });
}

export async function register(req, res) {
  //hàm đăng ký
  const { username, password, role } = req.body;

  await registerService(username, password, role);

  return res.status(201).json({
    message: "User created",
  });
}
