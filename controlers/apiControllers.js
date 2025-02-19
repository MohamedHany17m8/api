import { validationResult } from "express-validator";
import Course from "../models/course.model.js";
import { SUCCESS, FAIL, ERROR } from "../utils/httpStatusText.js";

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      status: SUCCESS,
      data: { courses },
    });
  } catch (err) {
    res.status(500).json({
      status: ERROR,
      message: err.message,
    });
  }
};

// Get a specific course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json({
        status: SUCCESS,
        data: { course },
      });
    } else {
      res.status(404).json({
        status: FAIL,
        data: { message: "Course not found" },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: ERROR,
      message: err.message,
    });
  }
};

// Add a new course
export const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: FAIL,
      data: errors.array(),
    });
  }
  const newCourse = new Course(req.body);
  try {
    await newCourse.save();
    const courses = await Course.find();
    res.status(201).json({
      status: SUCCESS,
      data: { courses },
    });
  } catch (err) {
    res.status(500).json({
      status: ERROR,
      message: err.message,
    });
  }
};

// Update a course by ID
export const updateCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: FAIL,
      data: errors.array(),
    });
  }
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedCourse) {
      res.json({
        status: SUCCESS,
        data: { updatedCourse },
      });
    } else {
      res.status(404).json({
        status: FAIL,
        data: { message: "Course not found" },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: ERROR,
      message: err.message,
    });
  }
};

// Delete a course by ID
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (deletedCourse) {
      res.json({
        status: SUCCESS,
        data: { deletedCourse },
      });
    } else {
      res.status(404).json({
        status: FAIL,
        data: { message: "Course not found" },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: ERROR,
      message: err.message,
    });
  }
};

// Delete all courses
export const deleteAllCourses = async (req, res) => {
  try {
    await Course.deleteMany({});
    res.status(200).json({
      status: SUCCESS,
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: ERROR,
      message: err.message,
    });
  }
};
