import express from "express";
import {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  deleteAllCourses,
} from "../controlers/coursesControllers.js";
import { validateCourse } from "../middlewares/validateCourse.js";
import { validateCourseId } from "../middlewares/validateCourseId.js";
import verifyToken from "../utils/verifyToken.js";
import allowedTo from "../utils/allowedTo.js";
const router = express.Router();

// Group routes for /courses
router
  .route("/")
  .get(getAllCourses)
  .post(validateCourse, addCourse)
  .delete(verifyToken, allowedTo("admin", "manager"), deleteAllCourses); // Add the deleteAllCourses route here;

// Group routes for /courses/:id
router
  .route("/:id")
  .get(validateCourseId, getCourseById)
  .patch(validateCourseId, validateCourse, updateCourse)
  .delete(
    validateCourseId,
    verifyToken,
    allowedTo("admin", "manager"),
    deleteCourse
  );

export default router;
