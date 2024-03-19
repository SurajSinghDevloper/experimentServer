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
  mobile: String,
  latitude: String,
  longitude: String,
  area: String,
  address: String,
  photo: String,
  consumerNo: String,
  option: String,
  age: Number,
  billOrReading: String,
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

// GET API to retrieve form data
app.get("/api/form-data", async (req, res) => {
  try {
    // Assuming FormData is a model representing your form data
    const formDataList = await FormData.find(); // Retrieve all form data
    res.status(200).json(formDataList);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
