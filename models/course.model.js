const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "course name can not be empty"],
      unique: [true, "course name already taken"],
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: [true, "Course level can not be empty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
