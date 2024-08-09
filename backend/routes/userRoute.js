const express = require("express");
const { registerUser, logingUser,
    logout, forgotPassword,
    resetPassword, getUserDetails,
    updatePassword } = require("../controllers/userController");
const { authorizedRoles, isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(logingUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

module.exports = router;
