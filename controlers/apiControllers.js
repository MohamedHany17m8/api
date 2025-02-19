import { validationResult } from "express-validator";
import Course from "../models/course.model.js";

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get a specific course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).send("Course not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add a new course
export const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newCourse = new Course(req.body);
  try {
    await newCourse.save();
    const courses = await Course.find();
    res.status(201).json(courses);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update a course by ID
export const updateCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).send("Course not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a course by ID
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (deletedCourse) {
      res.json(deletedCourse);
    } else {
      res.status(404).send("Course not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
// Delete all courses
export const deleteAllCourses = async (req, res) => {
  try {
    await Course.deleteMany({});
    res.status(200).send("All courses have been deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
