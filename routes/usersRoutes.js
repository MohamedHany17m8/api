import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controlers/usersControllers.js";
import {
  validateUserId,
  validateCreateUser,
  validateUpdateUser,
  validateLoginUser,
} from "../middlewares/validateUser.js";
import verifyToken from "../utils/verifyToken.js";
import allowedTo from "../utils/allowedTo.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Routes for /users
router
  .route("/")
  .get(getAllUsers)
  .post(upload.single("avatar"), validateCreateUser, createUser);

// Routes for /users/:id
router
  .route("/:id")
  .get(validateUserId, getUserById)
  .patch(validateUpdateUser, updateUser)
  .delete(validateUserId, verifyToken, allowedTo("manager"), deleteUser);

// Route for /users/login
router.post("/login", validateLoginUser, loginUser);

export default router;
