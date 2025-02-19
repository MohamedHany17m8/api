import { body, param } from "express-validator";

export const validateUserId = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];

export const validateCreateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const validateUpdateUser = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const validateLoginUser = [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];
