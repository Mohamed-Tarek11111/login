// dbConnect.js

const mongoose = require("mongoose");
const dot_env = require("dotenv");
const path = require("path");

dot_env.config({ path: path.join(__dirname, ".env") });
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database is connected"))
  .catch((err) => console.error("Database connection failed:", err));

const courseSchema = new mongoose.Schema({
  imageId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
