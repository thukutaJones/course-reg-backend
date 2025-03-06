const express = require("express");
const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const router = express.Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
