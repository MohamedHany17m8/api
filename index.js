import express from "express";
import mongoose from "mongoose";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { SUCCESS, FAIL, ERROR } from "./utils/httpStatusText.js";
import asyncWrapper from "./middlewares/asyncWrapper.js";
import AppError from "./utils/appError.js";
dotenv.config();

const app = express();
const url = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/contact", (req, res) => {
  res.send("Contact");
});

// Use course routes
app.use("/courses", courseRoutes);

// Use user routes
app.use("/users", userRoutes);

// Handler for unavailable routes
app.all("*", (req, res, next) => {
  next(new AppError("Resource not found", 404));
});

// Middleware to handle invalid ObjectId errors
app.use((err, req, res, next) => {
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return next(new AppError("Invalid ID format", 400));
  }
  next(err);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const status = err.status || ERROR;
  const message = err.message || "Internal Server Error";
  const data = err.data || null;

  res.status(statusCode).json({
    status,
    message,
    data,
  });
});

export default app; // Export the Express app
