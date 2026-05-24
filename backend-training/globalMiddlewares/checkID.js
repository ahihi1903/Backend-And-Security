import createError from "../middlewares/createError.js";
import mongoose from "mongoose";
export default function checkIdUser(req, res, next) {
  const { id } = req.params;

  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    throw createError(400, "Invalid user id");
  }

  next();
}
