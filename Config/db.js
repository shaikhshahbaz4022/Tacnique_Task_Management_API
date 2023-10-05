// Import the Mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Load environment variables from a .env file
require("dotenv").config();

// Get the MongoDB connection URL from the environment variables
const MongoURL = process.env.MongoURL;

// Connect to the MongoDB database
const connection = mongoose.connect(MongoURL);

// Export the database connection for use in other modules
module.exports = { connection };
