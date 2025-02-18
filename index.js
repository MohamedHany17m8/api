import express from "express";
import router from "./routes/courseRoutes.js";

const app = express();
const port = 3000;

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
app.use("/courses", router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
