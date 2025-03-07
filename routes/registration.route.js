const express = require("express");

const {
  createRegistration,
  getAllRegistrations,
  updateRegistration,
  deleteRegistration,
} = require("../controllers/registration.controller");
const authenticateToken = require('../middleware/authanticateToken')

const router = express.Router();

router.post("/", authenticateToken, createRegistration);
router.get("/", authenticateToken,getAllRegistrations);
router.put("/:id", authenticateToken, updateRegistration);
router.delete("/:id", authenticateToken, deleteRegistration);

module.exports = router;
