const User = require("../models/loginModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const record = await User.findOne({ email: email });
  if (record) {
    res.status(400);
    throw new Error("Email already in use");
    return;
  }
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  const { _id } = await savedUser.toJSON();
  const token = jwt.sign({ _id: _id }, process.env.SECRET_KEY);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ message: "User registered" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user){
    res.status(404);
    throw new Error("User not found");
    return;
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) throw err;
    if (result === true) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({ message: "User logged in" });
      
    } else {
      res.status(403);
      throw new Error("Invalid Credentials");
    }
  });
});

module.exports = { registerUser, loginUser };
