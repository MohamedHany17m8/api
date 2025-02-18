import express from "express";
import path from "path";

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
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
