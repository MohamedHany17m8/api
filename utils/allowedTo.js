import AppError from "./appError.js";

const allowedTo = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return next(new AppError("Unauthorized", 401));
    }
    if (!roles.includes(user.role)) {
      return next(new AppError("Forbidden", 403));
    }
    next();
  };
};

export default allowedTo;
