import createError from "../middlewares/createError.js";

export default function checkIdUser(req, res, next) {
  const id = Number(req.params.id.trim());

  if (Number.isNaN(id) || id <= 0) {
    throw createError(400, "Invalid user id");
  }

  next();
}
