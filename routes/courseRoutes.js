import express from "express";
import {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controlers/apiControllers.js";

const router = express.Router();

// Group routes for /courses
router.route("/").get(getAllCourses).post(addCourse);

// Group routes for /courses/:id
router
  .route("/:id")
  .get(getCourseById)
  .patch(updateCourse)
  .delete(deleteCourse);

export default router;
