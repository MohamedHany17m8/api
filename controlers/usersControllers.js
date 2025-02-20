import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import AppSuccess from "../utils/appSuccess.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import generateJwt from "../utils/generateJwt.js";

// Get all users
export const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({}, "-password -__v");
  res.json(new AppSuccess({ users }));
});

// Get a specific user by ID
export const getUserById = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()));
  }
  const user = await User.findById(req.params.id, "-password -__v");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.json(new AppSuccess({ user }));
});

// Create a new user
export const createUser = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()));
  }

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new AppError("User already exists", 400));
  }

  const newUser = new User(req.body);
  await newUser.save();

  // Generate JWT token
  const token = generateJwt({ id: newUser._id, role: newUser.role });

  res.status(201).json(new AppSuccess({ user: newUser, token }));
});

// Update a user by ID
export const updateUser = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()));
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    projection: "-password -__v",
  });
  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }
  res.json(new AppSuccess({ user: updatedUser }));
});

// Delete a user by ID
export const deleteUser = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()));
  }
  const deletedUser = await User.findByIdAndDelete(req.params.id, {
    projection: "-password -__v",
  });
  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }
  res.json(new AppSuccess({ user: deletedUser }));
});

// Login a user
export const loginUser = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()));
  }

  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Generate JWT token
  const token = generateJwt({ id: user._id, role: user.role });
  console.log(user.role);
  // Remove the password from the response
  user.password = undefined;

  res.json(new AppSuccess({ user, token }));
});
