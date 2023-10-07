const request = require("supertest");
const { app } = require("../app");
const { uniqueEmail } = require("../Helpers/uniqueEmail");
const email = uniqueEmail();
describe("User Registration", () => {
  it("should register a new user", async () => {
    const userData = {
      username: "testuser",
      email: email,
      password: "testpassword",
    };
    const res = await request(app).post("/api/user/register").send(userData);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.msg).toBe("Registration Succesfully");
  });

  it("should handle missing fields", async () => {
    const userData = {
      // Here fields are missing
    };
    const res = await request(app).post("/api/user/register").send(userData);

    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Fields Are Missing");
  });

  it("should handle duplicate email", async () => {
    const userData = {
      username: "existinguser",
      email: email,
      password: "testpassword",
    };
    const res = await request(app).post("/api/user/register").send(userData);

    expect(res.status).toBe(409);
    expect(res.body.msg).toBe("User Already Present");
  });
});
