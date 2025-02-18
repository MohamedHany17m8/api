import express from "express";
import { body, validationResult } from "express-validator";
const app = express();
const port = 3000;
const courses = [
  {
    id: 1,
    title: "js course",
    price: 1000,
  },
  {
    id: 2,
    title: "react course",
    price: 800,
  },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json(courses);
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/contact", (req, res) => {
  res.send("Contact");
});

// Route to get a specific course by ID
app.get("/courses/:id", (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find((c) => c.id === courseId);
  if (course) {
    res.json(course);
  } else {
    res.status(404).send("Course not found");
  }
});

// POST route to add a new course
// POST route to add a new course with validation
app.post(
  "/courses",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("price").notEmpty().withMessage("Price is required"),
  ],
  (req, res) => {
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
  }
);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
