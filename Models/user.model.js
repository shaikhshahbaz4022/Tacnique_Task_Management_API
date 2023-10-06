const mongoose = require("mongoose");

// Defining the user schema
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating a User model from the user schema
const UserModel = mongoose.model("user", userSchema);

// Exporting the User model for use in other modules
module.exports = { UserModel };
