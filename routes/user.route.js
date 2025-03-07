const express = require("express");
const {
  getAllStudents,
  deleteUser,
} = require("../controllers/users.controller");
const authenticateToken = require("../middleware/authanticateToken");

const router = express.Router();

router.get("/", authenticateToken, getAllStudents);
router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;
