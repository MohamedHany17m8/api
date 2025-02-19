import { validationResult } from "express-validator";
import Course from "../models/course.model.js";
import { SUCCESS, FAIL, ERROR } from "../utils/httpStatusText.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import AppError from "../utils/appError.js";
import AppSuccess from "../utils/appSuccess.js";

// Get all courses with pagination
export const getAllCourses = asyncWrapper(async (req, res, next) => {
  const { limit = 2, page = 1 } = req.query;
  const limitValue = parseInt(limit, 10);
  const pageValue = parseInt(page, 10);
  const skipValue = (pageValue - 1) * limitValue;

  const courses = await Course.find({}, "-__v")
    .skip(skipValue)
    .limit(limitValue);

  res.json(new AppSuccess({ courses }));
});

// Get a specific course by ID
export const getCourseById = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.id, "-__v");
  if (!course) {
    return next(new AppError("Course not found", 404));
  }
  res.json(new AppSuccess({ course }));
});

// Add a new course
export const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()));
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  const courses = await Course.find({}, "-__v");
  res.status(201).json(new AppSuccess({ courses }));
});

// Update a course by ID
export const updateCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()));
  }
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, projection: "-__v" }
  );
  if (!updatedCourse) {
    return next(new AppError("Course not found", 404));
  }
  res.json(new AppSuccess({ updatedCourse }));
});

// Delete a course by ID
export const deleteCourse = asyncWrapper(async (req, res, next) => {
  const deletedCourse = await Course.findByIdAndDelete(req.params.id, {
    projection: "-__v",
  });
  if (!deletedCourse) {
    return next(new AppError("Course not found", 404));
  }
  res.json(new AppSuccess({ deletedCourse }));
});

// Delete all courses
export const deleteAllCourses = asyncWrapper(async (req, res, next) => {
  await Course.deleteMany({});
  res.status(200).json(new AppSuccess(null));
});
