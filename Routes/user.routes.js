const express = require("express");
const { registerUser, loginUser } = require("../Controllers/user.controller");

// Creating an instance of an Express Router
const userRouter = express.Router();

// Handling the HTTP POST request for user registration
userRouter.post("/register", registerUser);

// Handling the HTTP POST request for user login
userRouter.post("/login", loginUser);

// Exporting the userRouter
module.exports = { userRouter };
