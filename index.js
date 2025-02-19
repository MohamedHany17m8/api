import express from "express";
import mongoose from "mongoose";
import courseRoutes from "./routes/courseRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
