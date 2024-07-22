const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

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
    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token,
    });
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
    const token = user.getJWTToken();

    res.status(200).json({
        success: true,
        token,
    });
});


