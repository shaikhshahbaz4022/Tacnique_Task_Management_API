const express = require("express");
const {
  getTasks,
  addTasks,
  allTasks,
  getTaskByID,
  updateTask,
  deleteTask,
} = require("../Controllers/tasks.controller");

// Creating an instance of an Express Router
const taskRouter = express.Router();

// Handling the HTTP POST request for Creating New Task
taskRouter.post("/", addTasks);

// Handling the HTTP GET request for Getting User Task who is login
taskRouter.get("/", getTasks);

// Handling the HTTP GET request for Getting All Tasks (with RateLimiter)
taskRouter.get("/all", allTasks);

// Handling the HTTP GET request By Task ID in Params
taskRouter.get("/:id", getTaskByID);

// Handling the HTTP PUT (Update) request By Task ID in Params
taskRouter.put("/:id", updateTask);

// Handling the HTTP Delete (Delete) request By Task ID in Params
taskRouter.delete("/:id", deleteTask);

// Exporting the taskRouter
module.exports = { taskRouter };
