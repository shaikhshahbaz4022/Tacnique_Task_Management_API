// Import required modules and configurations
const express = require("express");

// CORS middleware for handling cross-origin requests
const cors = require("cors");

// Database connection configuration
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/user.routes");
const { authenticate } = require("./Middlewares/authentication");
const { taskRouter } = require("./Routes/tasks.routes");
const { loggerMiddleware } = require("./Middlewares/logger");

// Load environment variables from a .env file
require("dotenv").config();

// Create an Express application
const app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Requiring environment Variables
const PORT = process.env.PORT;

// Define API routes and apply middleware
app.use(loggerMiddleware);

app.use("/api/user", userRouter);

// Authentication Middleware
app.use(authenticate);

app.use("/api/tasks", taskRouter);

// Starting the Server
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Server is Connected to Database Succesfully");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server is Connected to PORT: ${PORT}`);
});
