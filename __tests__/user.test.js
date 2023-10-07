const request = require("supertest");
const { app } = require("../app");

const { uniqueEmail } = require("../Helpers/uniqueEmail");
const email = uniqueEmail();
const emailforExisting = uniqueEmail();

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

describe("User Login", () => {
  it("should login a user with valid credentials", async () => {
    const loginData = {
      email: email,
      password: "testpassword",
    };
    const res = await request(app).post("/api/user/login").send(loginData);

    // expect a succesful login response
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.msg).toBe("Login Succesfully");
    expect(res.body.token).toBeDefined();
    expect(res.body.User).toBeDefined();
  });

  it("should handle invalid credentials", async () => {
    const userData = {
      email: email,
      password: "InvalidPassword",
    };
    const res = await request(app).post("/api/user/login").send(userData);

    //Expect a response of Invalid Credeantials
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Authentication failed");
    expect(res.body.success).toBe(false);
  });
  it("should handle missing fields during login", async () => {
    const userData = {
      // Missing Fields
    };
    const res = await request(app).post("/api/user/login").send(userData);

    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Fields Are Missing");
  });
  it("should handle a user not found during login", async () => {
    const loginData = {
      email: emailforExisting,
      password: "testpassword",
    };
    const res = await request(app).post("/api/user/login").send(loginData);

    expect(res.body.msg).toBe("User Not Found");
    expect(res.status).toBe(404);
  });
});
