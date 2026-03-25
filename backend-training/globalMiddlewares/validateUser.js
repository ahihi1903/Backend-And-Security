import createError from "../middlewares/createError.js";

export default function validateUser(req, res, next) {
  const data = req.body;

  if (!data.name) {
    //return res.status(400).json({ message: "Name is required" });
    throw createError(400, "Name is required");
  }
  if (typeof data.name !== "string") {
    //return res.status(400).json({ message: "Name must be string" });
    throw createError(400, "Name must be string");
  }
  if (data.name.length < 2) {
    //return res.status(400).json({ message: "Name too short" });
    throw createError(400, "Name too short");
  }

  next();
}
