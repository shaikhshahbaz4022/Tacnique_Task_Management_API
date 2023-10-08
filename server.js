const { app } = require("./app");
// Load environment variables from a .env file
require("dotenv").config();

// Database connection configuration
const { connection } = require("./Config/db");

// Requiring environment Variables
const PORT = process.env.PORT;

// Starting the Server
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Server is Connected to Database Succesfully");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server is Connected to PORT: ${PORT}`);
});
