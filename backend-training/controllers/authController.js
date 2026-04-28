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

export const refreshTokens = [];

export async function login(req, res) {
  //hàm đăng nhập
  const { username, password } = req.body;

  const user = await loginService(username, password);

  const accessToken = await generateAccessToken(user); //time ngắn hạn
  const refreshToken = await generateRefreshToken(user); //time dài hạn

  //refreshTokens.push(refreshToken);
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800`,
  );

  return res.end(JSON.stringify({ accessToken })); //, refreshToken
}

export async function refresh(req, res) {
  const cookie = req.headers.cookie;

  const accessToken = await refreshService(cookie);

  return res.end(
    JSON.stringify({
      accessToken,
    }),
  );
}

export async function logout(req, res) {
  // const { refreshToken } = req.body;
  // await logoutService(refreshToken);
  res.setHeader("Set-Cookie", "refreshToken=; HttpOnly; Path=/; Max-Age=0");
  return res.end(
    JSON.stringify({
      message: "Logged Out",
    }),
  );
}

export async function register(req, res) {
  //hàm đăng ký
  const { username, password } = req.body;

  await registerService(username, password);

  res.statusCode = 201;
  res.end(JSON.stringify({ message: "User created" }));
}
