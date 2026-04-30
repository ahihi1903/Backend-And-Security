import createError from "../middlewares/createError.js";

export default function role(...allowedRoles) {
  return function (req, res, next) {
    
    if (!req.user) {
      throw createError(401, "Unauthorized");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw createError(403, "Forbidden");
    }

    next();
  };
}
