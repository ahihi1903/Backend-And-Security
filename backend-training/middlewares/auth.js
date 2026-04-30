//xác thực
import { verifyToken } from "../utils/jwt.js";
import createError from "./createError.js";

export default function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    throw createError(401, "No token");
  }

  const token = header.split(" ")[1];
  if (!token) {
    throw createError(402, "No token");
  }
  
  const user = verifyToken(token);

  
  if (!user || user.error) {
    throw createError(401, "Invalid token");
  }

  req.user = user;
  next();
}
