require("dotenv").config();
const { PORT, MONGO_URI } = require("./config/env");
const express = require("express");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", todoRoutes);
app.use("/api/v1", userRoutes);

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
