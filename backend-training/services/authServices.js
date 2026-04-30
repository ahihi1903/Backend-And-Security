import { hashPassword } from "../utils/hash.js";
import { accounts } from "../model/auth.js";
import { comparePassword } from "../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
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

export async function refreshService(cookie) {
  if (!cookie) {
    
    throw createError(401,"No cookie")
  }

  const token = cookie.split("=")[1];

  const user = verifyRefreshToken(token);

  if (!user) {
    
    throw createError(401, "Invalid token")
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

export async function registerService(username, password, role) {
  const hashed = await hashPassword(password); //cho vào hàm băm tạo hash

  const newUser = {
    id: accounts.length + 1,
    username,
    password: hashed,
    role: role,
  };

  accounts.push(newUser);

  return newUser;
}
