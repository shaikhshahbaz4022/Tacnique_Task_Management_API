// TestCases For Tasks Routes

const { TaskModel } = require("../Models/task.model");
const { app } = require("../app");
const request = require("supertest");

let userToken; // for saving token
let createdTask; // for saving Task Object
let userID;

beforeAll(async () => {
  const loginData = {
    email: "Tacnique01@gmail.com",
    password: "Tacnique",
  };
  const res = await request(app).post("/api/user/login").send(loginData);
  userToken = res.body.token;
  userID = res.body.User._id;
});

describe("Task Creation", () => {
  it("should create a new task", async () => {
    const taskData = {
      title: "New Task",
      description: "This is a test task",
      userID: userID,
    };
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${userToken}`)
      .send(taskData);

    createdTask = res.body.data; // for Further use

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.msg).toBe("Task Created Succesfully");
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data.title).toBe(taskData.title);
    expect(res.body.data.description).toBe(taskData.description);
  });
  it("should handle missing fields", async () => {
    const taskData = {
      // Missing fields
    };

    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${userToken}`)
      .send(taskData);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe("Fields are Required");
  });
});

//Get user's Tasks Only Who is Logged In
describe("Get User's Tasks", () => {
  it("should retrieve user's tasks when tasks are found", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });
});

// Get All The Tasks
describe("Get All Tasks", () => {
  it("should retrieve all tasks when tasks were found", async () => {
    const res = await request(app)
      .get("/api/tasks/all")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.status).toBe(200);
  });
});

//Get Task By ID
describe("Get Task By ID", () => {
  it("should retrieve a task by ID when task is exist", async () => {
    const res = await request(app)
      .get(`/api/tasks/${createdTask._id}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject(createdTask);
  });

  // task not found by ID
  it("should handle task not found by ID", async () => {
    const nonExistID = "615e8e5b48bf1f33a4e4d7d1";
    const res = await request(app)
      .get(`/api/tasks/${nonExistID}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe("No Tasks Found");
  });
});

// for Updation of task by task ID
describe("Update Task by ID", () => {
  it("should update a task by ID when the task exists", async () => {
    const task = new TaskModel({
      title: "task created",
      description: "Description for Sample updation Task",
      status: "pending",
      userID: userID,
    });

    await task.save();
    const updatedData = {
      title: "New Task updated",
      description: "This is a test task Updated",
      status: "completed",
    };
    const res = await request(app)
      .put(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Task Updated Succesfully");
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject(updatedData);
  });

  // for task not found
  it("should handle a task not found by ID", async () => {
    const nonExistentID = "615e8e5b48bf1f33a4e5d7d9"; // wrong ID

    const updatedData = {
      title: "Updated Task",
      description: "Updated Description",
      status: "completed",
    };

    const response = await request(app)
      .put(`/api/tasks/${nonExistentID}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send(updatedData);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe("Task Not Found");
  });
});

// Delete Task By task ID
describe("Delete Task By ID", () => {
  it("should delete a task by ID when the task exists", async () => {
    const task = new TaskModel({
      title: "task For Delete",
      description: "Description for detetion of Task",
      status: "completed",
      userID: userID,
    });
    await task.save();

    const res = await request(app)
      .delete(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.msg).toBe("Task Deleted Succesfully");
  });
});
