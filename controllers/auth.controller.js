const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const signinToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

const createSendToken = (user, statusCode, res) => {
  const token = signinToken(user._id);
  // res.cookie("token", token, {
  //   httpOnly: true,
  // });

  res.status(statusCode).json({
    status: "success",
    token: token,
    role: user?.role,
  });
};

exports.signUp = async (req, res) => {
  try {
    const { userName } = req.body;
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "falied", message: "User Name already taken" });
    }
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `${field} already registered.`,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res
      .status(500)
      .json({ message: "Something went wrong!! Please try again" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        status: "failed",
        message: "please give us your userName  password to login",
      });
    }

    const checkUser = await User.findOne({ userName }).select("+password");

    if (
      !checkUser ||
      !(await checkUser.correctPassword(password, checkUser.password))
    ) {
      return res.status(401).json({
        status: "failed",
        message: "incorrect credentials",
      });
    }

    const user = await User.findById(checkUser?._id);

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
