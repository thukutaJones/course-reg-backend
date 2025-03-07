const express = require("express");
const {
  createLevel,
  getLevels,
  updateLevel,
  deleteLevel,
} = require("../controllers/level.controller");
const authenticateToken = require('../middleware/authanticateToken')

const router = express.Router();

router.get("/",  getLevels);
router.post("/", authenticateToken, createLevel);
router.put("/:id", authenticateToken, updateLevel);
router.delete("/:id", authenticateToken, deleteLevel);

module.exports = router;
