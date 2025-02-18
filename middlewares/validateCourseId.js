import { param } from "express-validator";

export const validateCourseId = [
  param("id").isInt().withMessage("Course ID must be an integer"),
];
