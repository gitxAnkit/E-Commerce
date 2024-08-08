const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register User 
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "sample id",
            url: "profile url",
        },
    });
    sendToken(user, 201, res);
});
// Login User
exports.logingUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking if user has given both email and password
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password"), 400);
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});
// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    // Get Reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // http://localhost/api/v1/password/reset/${resetToken}
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n${resetPasswordUrl} \n\nIf you have not requested this email, please ignore this message.`;

    try {

        await sendEmail({
            email: user.email,
            subject: `E-commerce password recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })
        // Log successful request
        console.log(`Password reset email sent to ${user.email}`);
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        // Log failed attempt
        console.error(`Failed to send password reset email to ${user.email}:`, error);

        return next(new ErrorHandler(error.message, 500));

    }
});
// Reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or expried", 404));

    }
    if (req.body.password != req.body.confirmPassword) {

        return next(new ErrorHandler("Confirm password does not match password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})