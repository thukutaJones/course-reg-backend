const Registration = require("../models/registration.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");

exports.createRegistration = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (!course || !student) {
      return res.status(404).json({ message: "Course or Student not found" });
    }

    const existingRegistration = await Registration.findOne({
      course: courseId,
      student: studentId,
    });

    if (existingRegistration) {
      return res
        .status(400)
        .json({ status: "failed", message: "Course already registered!!" });
    }

    await Registration.create({
      course: courseId,
      student: studentId,
    });

    res
      .status(201)
      .json({ status: "success", message: "Registration successfull!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate({
        path: "course",
        populate: {
          path: "level",
        },
      })
      .populate({
        path: "student",
      });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (!course || !student) {
      return res.status(404).json({ message: "Course or Student not found" });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      { course: courseId, student: studentId },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json({
      status: "sucess",
      message: "Registartion updated successfully!!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Registration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
