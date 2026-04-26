import { hashPassword } from "../utils/hash.js";
import { accounts } from "../model/auth.js";
///
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import createError from "../middlewares/createError.js";

export async function loginService(username, password) {
  const user = accounts.find((u) => u.username === username);

  if (!user) {
    throw createError(401, "User not found");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw createError(401, "Wrong password");
  }

  return await generateToken(user);
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
