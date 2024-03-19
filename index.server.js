const express = require("express");
const env = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Load environment variables
env.config();

// MongoDB connection
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo DB connection successfully established 👌👌👌👌");
  });

// Enable CORS
app.use(cors());

// Using body parser to parse JSON data
app.use(express.json());

// Define Schema
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  holdingNumber: String,
  age: Number,
  password: String,
});

const FormData = mongoose.model("FormData", formDataSchema);

// Routes
app.post("/api/submit-form", async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
