// TestCases For Tasks Routes

const { app } = require("../app");
const request = require("supertest");

let userToken;

beforeAll(async () => {
  const loginData = {
    email: "Tacnique01@gmail.com",
    password: "Tacnique",
  };
  const res = await request(app).post("/api/user/login").send(loginData);
  userToken = res.body.token;
});

describe("Task Creation", () => {
  it("should create a new task", async () => {
    const taskData = {
      title: "New Task",
      description: "This is a test task",
    };
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${userToken}`)
      .send(taskData);

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
