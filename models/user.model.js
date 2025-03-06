const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name can not be empty"],
      unique: [true, "User name already taken"],
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: () => {
        return this.role === "student";
      },
    },
    role: {
      type: String,
      required: true,
      default: "student",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirm = undefined;
  next();
});
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
