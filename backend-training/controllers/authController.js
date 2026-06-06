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
  verifyEmailServices,
  forgotPasswordServices,
  resetPasswordServices,
} from "../services/authServices.js";

// import Auth from "../model/Auth.js";
// import { hashPassword } from "../utils/hash.js";
// import crypto from "crypto";

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
  //console.log(req.body);
  const { username, password, role, email, isVerified } = req.body;

  //console.log(username, password, role, email, isVerified);

  await registerService(username, password, role, email, isVerified);

  return res.status(201).json({
    message: "User created",
  });
}
//
export async function verifyEmail(req, res) {
  const { token } = req.params;

  await verifyEmailServices(token);

  res.json({
    message: "Email verified",
  });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;

  await forgotPasswordServices(email);

  res.json({
    message: "Email sent",
  });
}

export async function resetPassword(req, res) {
  const { token } = req.params;
  const newPassword = req.body.password;

  await resetPasswordServices(token, newPassword);

  res.json({
    message: "Password reset success",
  });
}
