import createError from "../middlewares/createError.js";

export default function role(...allowedRoles) {
  return function (req, res, next) {
    if (!req.user) {
      //throw createError(401, "Unauthorized");
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      //throw createError(403, "Forbidden");
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}
