const bcrypt = require("bcrypt");
const User = require("../Models/userSchema");
const { validateEmail, validatePassword } = require("../Utils/authValidations");

// This controller handles user authentication, including signup, login, checking authentication status, and logout.
exports.signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // validate email and password
    validateEmail(email, res);
    validatePassword(password, res);
    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    // create a new user
    const user = await User.create({ username, email, password: hashPassword });
    // generate a token for the user
    const token = await user.generateAuthToken();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjust based on your requirements
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User logged in successfully",
        success: true,
        user: { id: user._id, email: user.email, username: user.username },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
};

// This controller checks if the user is authenticated by verifying the token.
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate email and password
    validateEmail(email, res);
    validatePassword(password, res);
    // find the user
    const user = await User.findOne({ email });
    // check if user exists
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    // comparing password
    const isComparePassword = await user.comparePassword(password);
    if (!isComparePassword) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const token = await user.generateAuthToken();
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjust based on your requirements
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User logged in successfully",
        success: true,
        user: { id: user._id, email: user.email, username: user.username },
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};

// This controller checks if the user is authenticated by verifying the token.
exports.isAuthenticatedController = async (req, res) => {
  try {
    res.json({ message: "User authentication is successfull", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// This controller handles user logout by clearing the authentication token.
exports.logoutController = async (req, res) => {
  try {
    res
      .cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({ message: "Logout successful", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
