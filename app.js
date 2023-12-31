// Import required modules and configurations
const express = require("express");

// CORS middleware for handling cross-origin requests
const cors = require("cors");

// Importing File System Module
const fs = require("fs");

// Database connection configuration
const { connection } = require("./Config/db");

const { userRouter } = require("./Routes/user.routes");
const { authenticate } = require("./Middlewares/authentication");
const { taskRouter } = require("./Routes/tasks.routes");
const { loggerMiddleware } = require("./Middlewares/logger");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { rateLimit } = require("./Middlewares/rateLimiter");
const { options } = require("./docs/swaggerOption");

// Create an Express application
const app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// swagger Configuration
const specs = swaggerJsDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

/* ----->>>>>> Home Route <<<<<<------*/

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to tacnique Task Management API</h1>`);
});

// Define API routes and apply middleware
app.use(loggerMiddleware);
app.use(rateLimit);
app.use("/api/user", userRouter);

// Authentication Middleware
app.use(authenticate);

app.use("/api/tasks", taskRouter);

/* ----->>>>>> Logging Details Routes <<<<<<------*/

app.get("/api/logs", async (req, res) => {
  try {
    // Reading File And Sending
    fs.readFile("./Helpers/logsinfo.log", "utf-8", (err, data) => {
      if (err) {
        return res.status(404).json({ msg: err.message, success: false });
      }
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = { app };
