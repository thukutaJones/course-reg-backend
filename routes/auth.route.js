const express = require("express");
const { signUp, signIn } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);

module.exports = router;
