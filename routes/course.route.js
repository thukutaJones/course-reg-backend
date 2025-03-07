const express = require("express");
const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getCoursesByLevel,
} = require("../controllers/course.controller");
const authenticateToken = require("../middleware/authanticateToken");

const router = express.Router();

router.post("/", authenticateToken, createCourse);
router.get("/", authenticateToken, getCourses);
router.get("/get-course-by-level/:level", authenticateToken, getCoursesByLevel);
router.put("/:id", authenticateToken, updateCourse);
router.delete("/:id", authenticateToken, deleteCourse);

module.exports = router;
