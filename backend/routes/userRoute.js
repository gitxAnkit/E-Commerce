const express = require("express");
const { registerUser, logingUser, logout } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(logingUser);
router.route("/logout").get(logout);

module.exports = router;
