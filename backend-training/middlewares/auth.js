//xác thực
import { verifyToken } from "../utils/token.js";
import createError from "./createError.js";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createError(401, "No token");
  }

  const token = authHeader.split(" ")[1];

  const user = verifyToken(token);

  if (!user) {
    throw createError(401, "Invalid token");
  }

  req.user = user;
  next();
}
