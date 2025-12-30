require("dotenv").config();
const { PORT, MONGO_URI } = require("./config/env");
const express = require("express");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todoRoutes");
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", todoRoutes);

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
