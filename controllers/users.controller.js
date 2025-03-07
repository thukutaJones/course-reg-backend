const Student = require("../models/user.model");
const Registration = require("../models/registration.model");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ role: "student" }).populate("level");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await Student.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }
    await Registration.deleteMany({ student: req.params.id });
    res
      .status(200)
      .json({ status: "succcess", message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
