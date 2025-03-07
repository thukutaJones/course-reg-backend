const express = require("express");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth.route");
const courseRoutes = require("./routes/course.route");
const levelsRoutes = require("./routes/levels.route");
const registrationRoutes = require("./routes/registration.route");
const statsRoutes = require("./routes/stats.route");
const userRoutes = require("./routes/user.route");

const app = express();

app.use(
  cors({
    origin: ["http://192.168.1.183:3000", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(helmet());

app.use(cookieParser());
app.use(mongosanitize());
app.use(xss());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/level", levelsRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/registration", registrationRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/me", userRoutes);

module.exports = app;
