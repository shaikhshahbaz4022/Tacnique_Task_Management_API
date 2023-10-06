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

// Controller to Get All Tasks

const allTasks = async (req, res) => {
  try {
    // Finding All Tasks
    const getAlltasks = await TaskModel.find().populate("userID");

    // Checking if tasks were found
    if (!getAlltasks || getAlltasks.length == 0) {
      return res.status(404).json({ msg: "No Tasks Found", success: false });
    }
    return res.status(200).json({ data: getAlltasks, success: true });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getTaskByID = async (req, res) => {
  try {
    const { id } = req.params;
    // Finding All Tasks
    const task = await TaskModel.findById(id);

    // Checking if tasks were found
    if (!task || task.length == 0) {
      return res.status(404).json({ msg: "No Tasks Found", success: false });
    }
    return res.status(200).json({ data: task, success: true });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Get the task ID from the request parameters
    const { id } = req.params;

    // Find the task by its ID
    const task = await TaskModel.findById(id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ msg: "Task Not Found", success: false });
    }

    const updateObj = {
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
    };

    // update the task by its ID
    const updatedTask = await TaskModel.findByIdAndUpdate(
      { _id: id },
      updateObj,
      { new: true }
    );

    // Return a success response
    return res.status(200).json({
      msg: "Task Updated Succesfully",
      data: updatedTask,
      success: true,
    });
  } catch (error) {
    // Handle any errors that occur during the Updation process
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    // Get the task ID from the request parameters
    const { id } = req.params;

    // delete the task by its ID
    const deletedTask = await TaskModel.findByIdAndDelete({ _id: id });

    // Return a success response
    return res
      .status(200)
      .json({ msg: "Task Deleted Succesfully", success: true });
  } catch (error) {
    // Handle any errors that occur during the Delete process
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};
module.exports = {
  addTasks,
  getTasks,
  allTasks,
  getTaskByID,
  updateTask,
  deleteTask,
};
