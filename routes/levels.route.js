const express = require("express");
const {
  createLevel,
  getLevels,
  updateLevel,
  deleteLevel,
} = require("../controllers/level.controller");

const router = express.Router();

router.get("/", getLevels);
router.post("/", createLevel);
router.put("/:id", updateLevel);
router.delete("/:id", deleteLevel);

module.exports = router;
