import { hashPassword } from "../utils/hash.js";
//import { accounts } from "../model/auths.js";
import { comparePassword } from "../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import createError from "../middlewares/createError.js";
import { refreshTokens } from "../store/tokenStore.js";
import Auth from "../model/Auth.js";

import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import logger from "../utils/logger.js";
import RefreshToken from "../model/RefreshToken.js";
import { hashToken } from "../utils/hashToken.js";

export async function loginService(username, password) {
  //const user = accounts.find((u) => u.username === username);
  const user = await Auth.findOne({ username });

  if (!user) {
    throw createError(401, "User not found");
  }

  if (!user.isVerified) {
    throw createError(403, "Please verify email");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    logger.warn("Failed login", { username, reason: "wrong_password" });
    throw createError(401, "Wrong password");
  }

  //return await generateAccessToken(user);
  return user; //chỉ trả user
}

export async function refreshService(refreshToken) {
  if (!refreshToken) {
    throw createError(401, "No token");
  }

  //const token = cookie.split("=")[1];
  // 👉 CHECK TOKEN CÓ TRONG STORE
  // if (!refreshTokens.includes(refreshToken)) {
  //   throw createError(403, "Token revoked");
  // }

  // const user = verifyRefreshToken(refreshToken);

  // if (!user || user.error) {
  //   throw createError(401, "Invalid token");
  // }
  const payload = verifyRefreshToken(refreshToken);

  if (!payload) {
    throw createError(401, "Invalid refresh token");
  }

  const storedToken = await RefreshToken.findOne({
    tokenHash: hashToken(refreshToken),
    userId: payload.id,
    expiresAt: { $gt: new Date() },
  });

  if (!storedToken) {
    throw createError(401, "Refresh token expired or revoked");
  }

  const user = await Auth.findById(payload.id);

  if (!user) {
    throw createError(401, "User no longer exists");
  }

  const accessToken = await generateAccessToken(user);

  return accessToken;
}

export async function logoutService(refreshToken) {
  // const index = refreshTokens.indexOf(refreshToken);

  // if (index !== -1) {
  //   refreshTokens.splice(index, 1);
  // }
  await RefreshToken.deleteOne({
    tokenHash: hashToken(refreshToken),
  });
}

//username, password, role, email, isVerified,
export async function registerService(username, password, email) {
  const existing = await Auth.findOne({
    $or: [{ username }, { email }],
  });

  if (existing) {
    throw createError(400, "User already exists");
  }

  const hashed = await hashPassword(password);

  const verifyToken = crypto.randomBytes(32).toString("hex");

  const user = await Auth.create({
    username,
    password: hashed,
    role: "user",
    email,
    isVerified: false,
    verifyToken,
  });

  const verifyUrl = `http://localhost:3000/auth/verify-email/${verifyToken}`;

  await sendEmail(
    email,

    "Verify Email",

    `
    <h2>Verify Account</h2>

    <p>
    Click link below:
    </p>

    <a href="${verifyUrl}">
    Verify Email
    </a>
    `,
  );

  return user;
}

export async function verifyEmailServices(token) {
  const user = await Auth.findOne({
    verifyToken: token,
  });

  if (!user) {
    // return res.status(400).json({
    //   message: "Invalid token",
    // });
    throw createError(400, "Invalid token");
  }

  user.isVerified = true;

  user.verifyToken = undefined;

  await user.save();

  return user;
}

export async function forgotPasswordServices(email) {
  const user = await Auth.findOne({
    email,
  });

  if (!user) {
    throw createError(404, "User not found");
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;

  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  const resetLink = `http://localhost:3000/auth/reset-password/${token}`;

  await sendEmail(
    email,

    "Reset Password",

    `
      <a href="${resetLink}">
      Reset Password
      </a>
      `,
  );

  return user;
}

export async function resetPasswordServices(token, newPassword) {
  const user = await Auth.findOne({
    resetPasswordToken: token,

    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw createError(400, "Token expired");
  }

  user.password = await hashPassword(newPassword);

  user.resetPasswordToken = undefined;

  user.resetPasswordExpire = undefined;

  await user.save();

  return user;
}
