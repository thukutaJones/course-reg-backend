const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema(
  {
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Student field cannot be empty"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course can not be empty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", RegistrationSchema);
