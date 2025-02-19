import express from "express";
import {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  deleteAllCourses,
} from "../controlers/apiControllers.js";
import { validateCourse } from "../middlewares/validateCourse.js";
import { validateCourseId } from "../middlewares/validateCourseId.js";

const router = express.Router();

// Group routes for /courses
router
  .route("/")
  .get(getAllCourses)
  .post(validateCourse, addCourse)
  .delete(deleteAllCourses); // Add the deleteAllCourses route here;

// Group routes for /courses/:id
router
  .route("/:id")
  .get(validateCourseId, getCourseById)
  .patch(validateCourseId, validateCourse, updateCourse)
  .delete(validateCourseId, deleteCourse);

export default router;
