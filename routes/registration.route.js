const express = require("express");

const {
  createRegistration,
  getAllRegistrations,
  updateRegistration,
  deleteRegistration,
} = require("../controllers/registration.controller");

const router = express.Router();

router.post("/", createRegistration);
router.get("/", getAllRegistrations);
router.put("/:id", updateRegistration);
router.delete("/:id", deleteRegistration);

module.exports = router;
