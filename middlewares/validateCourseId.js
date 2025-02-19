import { param } from "express-validator";

export const validateCourseId = [
  param("id").isMongoId().withMessage("Invalid course ID"),
];
