const { TaskModel } = require("../Models/task.model");

//Controller for adding new Task
const addTasks = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const userID = req.userID;

    // Check if either title or description is missing
    if (!title || !description) {
      return res
        .status(404)
        .json({ msg: "Fields are Required", success: false });
    }

    // Create a new task document
    const newTask = new TaskModel({ title, description, status, userID });

    // Save the new task to the database
    await newTask.save();

    // Return a success response
    return res
      .status(201)
      .json({ msg: "Task Created Succesfully", data: newTask, success: true });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

//Controller for Getting User's Tasks
const getTasks = async (req, res) => {
  try {
    const userID = req.userID;

    // Finding tasks of user's
    const tasksOfUser = await TaskModel.find({ userID });

    // Checking if tasks were found
    if (!tasksOfUser || tasksOfUser.length == 0) {
      return res.status(404).json({ msg: "No Tasks Found", success: false });
    }
    return res.status(200).json({ data: tasksOfUser, success: true });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

module.exports = { addTasks, getTasks };
