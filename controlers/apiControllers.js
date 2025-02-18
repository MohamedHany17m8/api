import { validationResult } from "express-validator";
import courses from "../data/data.js";

// Get all courses
export const getAllCourses = (req, res) => {
  res.json(courses);
};

// Get a specific course by ID
export const getCourseById = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find((c) => c.id === courseId);
  if (course) {
    res.json(course);
  } else {
    res.status(404).send("Course not found");
  }
};

// Add a new course
export const addCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newCourse = {
    id: courses.length ? courses[courses.length - 1].id + 1 : 1,
    ...req.body,
  };
  courses.push(newCourse);
  res.status(201).json(courses);
};

// Update a course by ID
export const updateCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const courseId = +req.params.id;
  const course = courses.find((c) => c.id === courseId);
  if (course) {
    course.title = req.body.title;
    course.price = req.body.price;
    res.json(courses);
  } else {
    res.status(404).send("Course not found");
  }
};

// Delete a course by ID
export const deleteCourse = (req, res) => {
  const courseId = +req.params.id;
  const courseIndex = courses.findIndex((c) => c.id === courseId);
  if (courseIndex !== -1) {
    courses.splice(courseIndex, 1);
    res.json(courses);
  } else {
    res.status(404).send("Course not found");
  }
};
