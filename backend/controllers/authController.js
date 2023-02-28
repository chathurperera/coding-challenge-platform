const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateTokens = require('../utils/generateTokens');
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //Verifying the account existence
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(400).json({ message: "User doesn't exists" });
    }

    //Verifying the password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken } = await generateTokens(foundUser._id);

    res.status(200).json({ email: foundUser.email, token: accessToken });
});

const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //Input validations
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    //Looking for duplicate accounts
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    //Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creating the user
    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    //Generating the token
    const { accessToken } = await generateTokens(newUser._id);

    res.status(201).json({
        email,
        token: accessToken
    });
});


module.exports = {
    register,
    login
};
