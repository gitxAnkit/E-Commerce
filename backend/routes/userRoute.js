const express = require("express");
const { registerUser, logingUser } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(logingUser);

module.exports = router;
