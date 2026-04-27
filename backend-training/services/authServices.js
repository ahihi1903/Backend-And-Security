import { hashPassword } from "../utils/hash.js";
import { accounts } from "../model/auth.js";
///
import { comparePassword } from "../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import createError from "../middlewares/createError.js";
import { refreshTokens } from "../controllers/authController.js";

export async function loginService(username, password) {
  const user = accounts.find((u) => u.username === username);

  if (!user) {
    throw createError(401, "User not found");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw createError(401, "Wrong password");
  }

  //return await generateAccessToken(user);
  return user; //chỉ trả user
}

export async function refreshService(refreshToken) {
  if (!refreshTokens.includes(refreshToken)) {
    res.statusCode = 401;
    return res.end(
      JSON.stringify({
        message: "Invalid refresh token",
      }),
    );
  }

  const user = verifyRefreshToken(refreshToken);

  if (!user) {
    res.statusCode = 401;
    return res.end(
      JSON.stringify({
        message: "Expired refresh token",
      }),
    );
  }

  const accessToken = await generateAccessToken(user);

  return accessToken;

}

export async function logoutService(refreshToken) {
  const index = refreshTokens.indexOf(refreshToken);

  if(index!==-1){
    refreshTokens.splice(index, 1);
  }
  
}

export async function registerService(username, password) {
  const hashed = await hashPassword(password); //cho vào hàm băm tạo hash

  const newUser = {
    id: accounts.length + 1,
    username,
    password: hashed,
  };

  accounts.push(newUser);

  return newUser;
}
