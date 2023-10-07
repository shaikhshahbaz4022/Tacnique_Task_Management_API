const request = require("supertest");
const { app } = require("../app");

describe("Server Tests", () => {
  it("should return a welcome message at the root endpoint", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Welcome to tacnique Task Management API");
  });
});
