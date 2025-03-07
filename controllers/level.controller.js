const Level = require("../models/levels.model");
const Registration = require("../models/registration.model");
const User = require("../models/user.model");
const Course = require("../models/course.model");

exports.createLevel = async (req, res) => {
  try {
    const { name } = req.body;
    const existingLevel = await Level.findOne({ name });
    if (existingLevel) {
      return res.status(400).json({ message: "Level already created" });
    }

    await Level.create({ name });

    res.status(201).json({
      status: "success",
      message: `Level ${name} created succussfully!!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLevel = async (req, res) => {
  try {
    const { name } = req.body;

    const existingLevel = await Level.findOne({ name });
    if (existingLevel && existingLevel._id.toString() !== req.params.id) {
      return res.status(400).json({ message: "Level already exists" });
    }

    const updatedLevel = await Level.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedLevel) {
      return res.status(404).json({ message: "Level not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Level updated successfully!!!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteLevel = async (req, res) => {
  try {
    const deletedLevel = await Level.findByIdAndDelete(req.params.id);
    if (!deletedLevel) {
      return res.status(404).json({ message: "Level not found" });
    }
    const courses = await Course.find({ level: req.params.id }).select("_id");
    const courseIds = courses.map((c) => c._id);
    await Registration.deleteMany({
      course: { $in: courseIds },
    });
    // await Registration.deleteMany({
    //   course: {
    //     $in: await Course.find({ level: req.params.id }).distinct("_id"),
    //   },
    // });
    await User.deleteMany({ level: req.params.id });
    await Course.deleteMany({ level: req.params.id });
    res
      .status(200)
      .json({ status: "success", message: "Level deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
