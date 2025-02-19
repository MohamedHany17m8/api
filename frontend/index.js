// Function to fetch all courses
async function fetchCourses() {
  try {
    const response = await fetch("http://localhost:3000/courses");
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

// Function to fetch a specific course by ID
async function fetchCourseById(id) {
  try {
    const response = await fetch(`http://localhost:3000/courses/${id}`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
  }
}

// Function to add a new course
async function addCourse(course) {
  try {
    const response = await fetch("http://localhost:3000/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error adding course:", error);
  }
}

// Function to update a course by ID
async function updateCourse(id, course) {
  try {
    const response = await fetch(`http://localhost:3000/courses/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(`Error updating course with ID ${id}:`, error);
  }
}

// Function to delete a course by ID
async function deleteCourse(id) {
  try {
    const response = await fetch(`http://localhost:3000/courses/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(`Error deleting course with ID ${id}:`, error);
  }
}

// Example usage
fetchCourses();
// fetchCourseById("60d21b4667d0d8992e610c85");
// addCourse({ title: "New Course", price: 100 });
// updateCourse("60d21b4667d0d8992e610c85", {
//   title: "Updated Course",
//   price: 150,
// });
// deleteCourse("60d21b4667d0d8992e610c85");
