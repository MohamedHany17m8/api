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

const router = express.Router();

// Routes for /users
router.route("/").get(getAllUsers).post(validateCreateUser, createUser);

// Routes for /users/:id
router
  .route("/:id")
  .get(validateUserId, getUserById)
  .patch(validateUpdateUser, updateUser)
  .delete(validateUserId, deleteUser);

// Route for /users/login
router.post("/login", validateLoginUser, loginUser);

export default router;
