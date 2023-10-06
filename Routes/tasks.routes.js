const express = require("express");
const { getTasks, addTasks } = require("../Controllers/tasks.controller");

// Creating an instance of an Express Router
const taskRouter = express.Router();

// Handling the HTTP POST request for Creating New Task
taskRouter.post("/", addTasks);

// Handling the HTTP GET request for Getting User Task who is login
taskRouter.get("/", getTasks);

// Exporting the taskRouter
module.exports = { taskRouter };
