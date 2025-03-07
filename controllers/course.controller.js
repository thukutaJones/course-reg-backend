const Course = require("../models/course.model");
const Level = require("../models/levels.model");
const Registration = require("../models/registration.model");
exports.createCourse = async (req, res) => {
  try {
    const { name, level } = req.body;

    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      return res.status(400).json({ message: "Course name already created" });
    }

    const levelExists = await Level.findById(level);
    if (!levelExists) {
      return res.status(400).json({ message: "Invalid level ID" });
    }

    const course = await Course.create({ name, level });
    res.status(201).json({
      status: "success",
      message: `Course ${name} created succussfully!!`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("level");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCoursesByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    console.log(level);
    const courses = await Course.find({ level });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { name, level } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (name && name !== course.name) {
      const existingCourse = await Course.findOne({ where: { name } });
      if (existingCourse) {
        return res.status(400).json({ message: "Course name already in use" });
      }
      await Course.findByIdAndUpdate(req.params.id, { name, level });
    }

    if (level) {
      const levelExists = await Level.findById(level);
      if (!levelExists) {
        return res.status(400).json({ message: "Invalid level ID" });
      }
      await Course.findByIdAndUpdate(req.params.id, { level });
    }

    res
      .status(200)
      .json({ status: "sucess", message: "Course updated succussfully " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await Registration.deleteMany({ course: req.params.id });
    res.status(200).json({
      status: "success",
      message: "Course deleted successfully!!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
