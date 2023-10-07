//  Options for Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tacnique Task Management API",
      version: "1.0.0",
      description:
        "Welcome to our Tasks API, built with Node.js, Express, and MongoDB, designed to make task management a breeze, featuring user authentication with JWT tokens, allowing you to securely create, view, edit, and remove tasks while enforcing data security, rate limiting, and comprehensive logging for an efficient and protected experience.",
    },
    servers: [
      {
        url: "https://task-management-api-cjuu.onrender.com/api",
      },
    ],
  },
  apis: ["./docs/*.js"],
};
module.exports = { options };
