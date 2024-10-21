const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // Ensure COOKIE_EXPIRE is set
        ),
        httpOnly: true, // Ensure the cookie cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Required for cross-site cookies in production
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};
