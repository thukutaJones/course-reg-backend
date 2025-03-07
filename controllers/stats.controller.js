const User = require("../models/user.model");
const Level = require("../models/levels.model");
const Course = require("../models/course.model");
const Registartion = require("../models/registration.model");

exports.getStats = async (req, res) => {
  try {
    const users = await User.countDocuments({ role: "student" });
    const levels = await Level.countDocuments();
    const courses = await Course.countDocuments();
    const registrations = await Registartion.countDocuments();
    res.status(200).json({ users, courses, levels, registrations });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
