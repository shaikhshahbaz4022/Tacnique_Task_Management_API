const mongoose = require("mongoose");

// Defining the Task schema
const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

// Creating a Task model Constructor function
const TaskModel = mongoose.model("task", taskSchema);
module.exports = { TaskModel };
