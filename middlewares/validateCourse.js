import { body } from "express-validator";

export const validateCourse = [
  body("title").notEmpty().withMessage("Title is required"),
  body("price").notEmpty().withMessage("Price is required"),
];
